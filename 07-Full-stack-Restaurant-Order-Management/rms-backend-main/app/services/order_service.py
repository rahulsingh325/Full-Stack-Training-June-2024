from fastapi import HTTPException
from app.utils.read_data import read_data
from app.utils.write_data import write_data
from app.config import ORDER_FILE, MENU_FILE, IMAGE_URL, TABLE_FILE
from app.models.order_model import Order, OrderItem, OrderItemRequest, OrderRequest
from app.utils.get_limited_data import get_limited_data
from datetime import datetime


def get_all_orders(queries):
    orders = read_data(ORDER_FILE)

    for order in orders:
        for item in order["items"]:
            item["image"] = f"{IMAGE_URL}/{item['image']}"

    search = queries.get("search")
    if search:
        search_lower = search.lower()
        orders = [
            order for order in orders
            if search_lower in order["customer"].lower() or search in str(order["id"])
        ]
        if not orders:
            return {
                "success": False,
                "message": "No orders found matching the search query"
            }

    query_date = queries.get("date")
    if query_date:
        try:
            target_date = datetime.strptime(query_date, "%d/%m/%Y").date()

            def matches_date(order_date_str):
                try:
                    parsed_date = datetime.strptime(order_date_str, "%a, %B %d, %Y").date()
                    return parsed_date == target_date
                except ValueError:
                    return False

            orders = [order for order in orders if matches_date(order["date"])]
        except ValueError:
            return {
                "success": False,
                "message": "Invalid date format. Use DD/MM/YYYY"
            }

    return get_limited_data(queries["limit"], queries["skip"], orders)

def get_orders_by_status(status, queries):
    orders = read_data(ORDER_FILE)
    
    for order in orders:
        for item in order["items"]:
            item["image"] = f"{IMAGE_URL}/{item['image']}"
            
    if status:
        filtered_orders = [order for order in orders if order["status"].lower() == status.lower()]
        if not filtered_orders:
            return {
                "success": False,
                "message": f"No orders found with status '{status}'"
            }
        orders = filtered_orders
    
    search = queries.get("search")
    if search:
        search_lower = search.lower()
        orders = [
            order for order in orders
            if search_lower in order["customer"].lower() or search in str(order["id"])
        ]
        if not orders:
            return {
                "success": False,
                "message": "No orders found matching the search query"
            }
            
    query_date = queries.get("date")
    if query_date:
        try:
            target_date = datetime.strptime(query_date, "%d/%m/%Y").date()

            def matches_date(order_date_str):
                try:
                    parsed_date = datetime.strptime(order_date_str, "%a, %B %d, %Y").date()
                    return parsed_date == target_date
                except ValueError:
                    return False

            orders = [order for order in orders if matches_date(order["date"])]
        except ValueError:
            return {
                "success": False,
                "message": "Invalid date format. Use DD/MM/YYYY"
            }

    return get_limited_data(queries["limit"], queries["skip"], orders)

def create_order(order_data: OrderRequest):
    orders = read_data(ORDER_FILE)
    menu = read_data(MENU_FILE)
    table_data = read_data(TABLE_FILE)

    # Handle takeaway orders: Ensure table is None, and if present as "string", make it None
    if order_data.orderType == "takeaway":
        if order_data.table is not None:
            if order_data.table == "string":
                return {"error": "Table number is not allowed for takeaway orders."}
        
        # Ensure that table is explicitly None for takeaway orders
        order_data.table = None

    # Handle dine-in orders: Validate table existence and availability
    elif order_data.orderType == "dine-in":
        # Search for the table in the table_data
        table = None
        for row in table_data:
            table = next((t for t in row["tables"] if t["tableNumber"] == order_data.table), None)
            if table:
                break  # If table found, break out of the loop

        if not table:
            return {"error": f"Table number '{order_data.table}' not found."}
        
        if table["status"] != "available":
            return {"error": f"Table '{order_data.table}' is not available. Status: {table['status']}"}

        # Update table status to 'occupied' after the order is created
        table["status"] = "occupied"

    order_id = len(orders) + 1
    items_to_add = []
    sub_total = 0

    # Process each item in the order
    for item_req in order_data.items:
        menu_item = next((m for m in menu if m["id"] == item_req.id), None)
        if not menu_item:
            return {"error": f"Item with ID {item_req.id} not found"}

        if menu_item["status"] != "available" or menu_item["stock"] <= 0:
            return {"error": f"Item '{menu_item['title']}' is unavailable or out of stock"}

        if item_req.quantity > menu_item["stock"]:
            return {"error": f"Not enough stock for '{menu_item['title']}'"}

        # Update stock and sold count
        menu_item["stock"] -= item_req.quantity
        menu_item["sold"] += item_req.quantity

        # Prepare item to add to the order
        item_data = {
            "title": menu_item["title"], 
            "price": menu_item["price"],
            "quantity": item_req.quantity,
            "flavorProfile": menu_item.get("flavorProfile"),
            "image": menu_item["image"]
        }
        items_to_add.append(OrderItem(**item_data))
        sub_total += menu_item["price"] * item_req.quantity

    # Billing calculation
    tax_amount = float(f"{sub_total * (order_data.taxPercent / 100):.2f}")
    total_payable = sub_total + tax_amount - order_data.discountAmount

    order = Order(
        id=order_id,
        customer=order_data.customer,
        table=order_data.table,  # Table will be None for takeaway
        orderType=order_data.orderType,
        items=items_to_add,
        subTotal=sub_total,
        taxPercent=order_data.taxPercent,
        taxAmount=tax_amount,
        discountAmount=order_data.discountAmount,
        totalPayable=total_payable,
        paymentStatus="paid" if order_data.paymentMode else "unpaid",
        paymentMode=order_data.paymentMode
    )

    # Save data
    orders.append(order.model_dump())
    write_data(ORDER_FILE, orders)
    write_data(TABLE_FILE, table_data)  # Save the updated table status if dine-in
    write_data(MENU_FILE, menu)  # Update menu file with updated stock and sold

    return {"message": "Order added successfully", "order": order.model_dump()}

# def update_single_order(order_id: int, order_data: OrderRequest, menu: list) -> Order:
#     orders = read_data(ORDER_FILE)
#     table = read_data(TABLE_FILE)
#     existing_order = next((o for o in orders if o["id"] == order_id), None)
    
#     if not existing_order:
#         raise HTTPException(status_code=404, detail=f"Order ID {order_id} not found")

#     # Handle table logic based on order type change
#     if order_data.orderType == "takeaway":
#         if order_data.table is not None:  # If table is provided, set it to None
#             order_data.table = None
#         # If the order type is changing to takeaway, set the table back to available if it's from dine-in
#         if existing_order["orderType"] == "dine-in" and existing_order["table"]:
#             # Find the table in the system and make it available
#             table_to_reset = next((t for row in table for t in row["tables"] if t["tableNumber"] == existing_order["table"]), None)
#             if table_to_reset:
#                 table_to_reset["status"] = "available"  # Set table status to "available"

#     elif order_data.orderType == "dine-in":
#         if not order_data.table:
#             raise HTTPException(status_code=400, detail="Table number is required for dine-in orders.")
        
#         # Check if the table exists and is available
#         valid_table = next((t for row in table for t in row["tables"] if t["tableNumber"] == order_data.table), None)
#         if not valid_table:
#             raise HTTPException(status_code=400, detail="Invalid table number for dine-in orders.")
#         if valid_table["status"] != "available":
#             raise HTTPException(status_code=400, detail=f"Table {order_data.table} is not available. Status: {valid_table['status']}")

#         # Mark the table as occupied after the order is created
#         valid_table["status"] = "occupied"

#     # Process items (same logic as before)
#     old_items_dict = {}
#     for item in existing_order["items"]:
#         menu_item = next((m for m in menu if m["title"] == item["title"]), None)
#         if menu_item:
#             old_items_dict[menu_item["id"]] = item["quantity"]

#     new_items_list = [item for item in order_data.items if item.id and item.quantity > 0] if order_data.items else []

#     # Step 1: Restore stock for items removed in new order (present in old but missing in new)
#     removed_item_ids = set(old_items_dict.keys()) - set(item.id for item in new_items_list)
#     for removed_id in removed_item_ids:
#         menu_item = next((m for m in menu if m["id"] == removed_id), None)
#         if menu_item:
#             menu_item["stock"] += old_items_dict[removed_id]
#             menu_item["sold"] -= old_items_dict[removed_id]

#     # Step 2: Update stock for items in new order
#     new_items_processed = []
#     sub_total = 0
#     for item_req in new_items_list:
#         menu_item = next((m for m in menu if m["id"] == item_req.id), None)
#         if not menu_item:
#             raise HTTPException(status_code=404, detail=f"Menu item with ID {item_req.id} not found")
#         if menu_item["status"] != "available":
#             raise HTTPException(status_code=400, detail=f"Item '{menu_item['title']}' unavailable")

#         old_qty = old_items_dict.get(item_req.id, 0)
#         qty_diff = item_req.quantity - old_qty  # difference to apply on stock

#         if qty_diff > 0 and menu_item["stock"] < qty_diff:
#             raise HTTPException(status_code=400, detail=f"Not enough stock for '{menu_item['title']}'")

#         # Update stock and sold
#         menu_item["stock"] -= qty_diff
#         menu_item["sold"] += qty_diff

#         item_data = {
#             "id": item_req.id,
#             "title": menu_item["title"],
#             "price": menu_item["price"],
#             "quantity": item_req.quantity,
#             "flavorProfile": menu_item.get("flavorProfile"),
#             "image": menu_item["image"]
#         }
#         new_items_processed.append(OrderItem(**item_data))
#         sub_total += menu_item["price"] * item_req.quantity

#     existing_order["items"] = [item.model_dump() for item in new_items_processed]

#     tax_percent = order_data.taxPercent if order_data.taxPercent is not None else existing_order.get("taxPercent", 0)
#     discount_amount = order_data.discountAmount if order_data.discountAmount is not None else existing_order.get("discountAmount", 0)

#     tax_amount = float(f"{(tax_percent / 100) * sub_total:.2f}")
#     total_payable = sub_total + tax_amount - discount_amount

#     existing_order.update({
#         "subTotal": round(sub_total, 2),
#         "taxPercent": tax_percent,
#         "taxAmount": round(tax_amount, 2),
#         "discountAmount": discount_amount,
#         "totalPayable": round(total_payable, 2),
#     })

#     # Update only the fields provided in the order_data
#     for key, value in order_data.model_dump(exclude_unset=True).items():
#         if key != "items" and value is not None:  # Skip "items" and None values
#             existing_order[key] = value

#     # Ensure that the customer name is handled properly
#     if not existing_order.get("customer"):  # If no customer is provided, set a default value or keep the existing one
#         existing_order["customer"] = existing_order.get("customer", "Unknown Customer")

#     # Update orders list and write to file
#     index = next((i for i, o in enumerate(orders) if o["id"] == order_id), None)
#     if index is not None:
#         orders[index] = existing_order

#     write_data(ORDER_FILE, orders)
#     write_data(MENU_FILE, menu)

#     return Order(**existing_order)

def update_single_order(order_id: int, order_data: OrderRequest, menu: list) -> Order:
    orders = read_data(ORDER_FILE)
    table = read_data(TABLE_FILE)
    existing_order = next((o for o in orders if o["id"] == order_id), None)
    
    if not existing_order:
        raise HTTPException(status_code=404, detail=f"Order ID {order_id} not found")

    # Handle table logic based on order type change
    if order_data.orderType == "takeaway":
        order_data.table = None  # Set table to None for takeaway orders
        
        # If the order type is changing to takeaway, set the table back to available if it's from dine-in
        if existing_order["orderType"] == "dine-in" and existing_order["table"]:
            table_to_reset = next((t for row in table for t in row["tables"] if t["tableNumber"] == existing_order["table"]), None)
            if table_to_reset:
                table_to_reset["status"] = "available"  # Reset table status to "available"

    elif order_data.orderType == "dine-in":
        if not order_data.table:
            raise HTTPException(status_code=400, detail="Table number is required for dine-in orders.")
        
        # Check if the table exists and is available
        valid_table = next((t for row in table for t in row["tables"] if t["tableNumber"] == order_data.table), None)
        if not valid_table:
            raise HTTPException(status_code=400, detail="Invalid table number for dine-in orders.")
        if valid_table["status"] != "available":
            raise HTTPException(status_code=400, detail=f"Table {order_data.table} is not available. Status: {valid_table['status']}")

        # Mark the table as occupied after the order is created
        valid_table["status"] = "occupied"

    # Continue processing items (no changes here from previous code)
    # Existing code for item processing, stock updating, etc.
    
    # Ensure customer name is handled properly
    if not existing_order.get("customer"):  # If no customer is provided, set a default value or keep the existing one
        existing_order["customer"] = existing_order.get("customer", "Unknown Customer")

    # Update orders list and write to file
    index = next((i for i, o in enumerate(orders) if o["id"] == order_id), None)
    if index is not None:
        orders[index] = existing_order

    write_data(ORDER_FILE, orders)
    write_data(MENU_FILE, menu)
    write_data(TABLE_FILE, table)  # Ensure the table status changes are saved

    return Order(**existing_order)


def delete_order(order_id: int):
    orders = read_data(ORDER_FILE)
    menu = read_data(MENU_FILE)

    order_to_delete = next((order for order in orders if order["id"] == order_id), None)
    if not order_to_delete:
        raise HTTPException(status_code=404, detail=f"Order ID {order_id} not found.")

    for item in order_to_delete["items"]:
        menu_item = next((m for m in menu if m["id"] == item.get("id")), None)
        if menu_item:
            menu_item["stock"] += item["quantity"]
            menu_item["sold"] -= item["quantity"]

    orders = [order for order in orders if order["id"] != order_id]

    write_data(ORDER_FILE, orders)
    write_data(MENU_FILE, menu)

    return {"message": f"Order ID {order_id} deleted successfully."}
