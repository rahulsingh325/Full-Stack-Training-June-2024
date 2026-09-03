import json
import os

def add_product_in_stock(JSON_data):
    class Inventory:

        def add_product(self, id, name, price, quantity):
            dict_format_item = {
                "name": name,
                "price": price,
                "quantity": quantity
            }
            new_product = {"product_id": id, "product": dict_format_item}

            if os.path.exists(JSON_data):
                with open(JSON_data, "r") as file:
                    try:
                        list_data = json.loads(file.read())
                    except json.JSONDecodeError:
                        list_data = []
            else:
                list_data = []

            list_data.append(new_product)

            list_data = sorted(list_data, key=lambda x: x["product_id"])

            with open(JSON_data, "w") as file:
                json_data = json.dumps(list_data, indent=None, separators=(",", ":"))  
                compact_json_data = json.dumps(list_data, indent=4) 
                file.write(compact_json_data)
            print("Product added successfully to your stock.")
            

    stock = Inventory()

    while True:

        if os.path.exists(JSON_data):
            with open(JSON_data, "r") as file:
                try:
                    list_data = json.loads(file.read())
                except json.JSONDecodeError:
                    list_data = []
        else:
            print("You don't have database file, we are creating new json file (stock.json)")
            print("Creating",end="")            
            print("\n")

            list_data = []

        product_id = int(input("Enter Product ID: "))
        product_exists = any(product["product_id"] == product_id for product in list_data)

        if product_exists:
            print(f"Error: Product ID {product_id} already exists. Please enter a different product ID.")
        else:
            while True:
                product_name = input("Enter Product Name: ").strip()
                product_name_exists = any(product["product"]["name"].lower() == product_name.lower() for product in list_data)

                if product_name_exists:
                    print(f"Error: Product name '{product_name}' already exists. Please enter a different product name.")
                else:
                    break 
            stock.add_product(
                product_id,
                product_name,
                int(input("Enter total price: ")),
                int(input("Enter quantity: "))
            )
            break
        # for push