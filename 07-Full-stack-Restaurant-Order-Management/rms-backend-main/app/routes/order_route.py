from fastapi import APIRouter, HTTPException, Depends
from app.services.order_service import get_all_orders
from app.dependencies.query_dependency import get_common_query
from app.models.order_model import OrderRequest
from app.services.order_service import get_all_orders, create_order, update_single_order, delete_order,get_orders_by_status
from app.utils.read_data import read_data
from app.utils.write_data import write_data
from app.config import ORDER_FILE, MENU_FILE, TABLE_FILE


router = APIRouter()



@router.get('/')
def get_orders(queries:dict = Depends(get_common_query)):
    return get_all_orders(queries)

@router.get('/{status}')
def get_orders(status, queries:dict = Depends(get_common_query)):
    return get_orders_by_status(status, queries)

@router.post('/')
def add_order(order: OrderRequest):
    return create_order(order)

# @router.put("/{order_id}")
# def update_order(order_id: int, updated_data: OrderRequest):
#     # Read the current data from files
#     orders = read_data(ORDER_FILE)
#     menu = read_data(MENU_FILE)
#     table = read_data(TABLE_FILE)

#     # Update the order using the provided data
#     updated_order = update_single_order(order_id, updated_data, menu)

#     # Update the orders list with the updated order
#     for idx, order in enumerate(orders):
#         if order["id"] == order_id:
#             orders[idx] = updated_order.model_dump()

#     # Write the updated data back to the files
#     write_data(ORDER_FILE, orders)
#     write_data(MENU_FILE, menu)
#     write_data(TABLE_FILE, table)  # Ensure the table status changes are saved

#     return {
#         "message": "Order updated successfully",
#         "order": updated_order.model_dump()
#     }

@router.delete("/{order_id}")
def delete_order_route(order_id: int):
    return delete_order(order_id)
