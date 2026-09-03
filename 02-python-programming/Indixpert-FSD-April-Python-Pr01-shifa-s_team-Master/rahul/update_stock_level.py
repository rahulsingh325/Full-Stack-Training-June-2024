import json
import os

def update_product(JSON_data):
    if not os.path.exists(JSON_data):
        print("Sorry! Database file does not exist.")
        
        return

    with open(JSON_data, "r") as file:
        try:
            data = json.load(file)
        except json.JSONDecodeError:
            data = []

    if len(data) == 0:
        print("No data found in the stock database.")
        return
    else:

        print("To exit, enter '0' as the product ID.")
        product_id_input = input("Enter product id which you want to update: ")

        if product_id_input == '0':
            
            return

        try:
            product_id = int(product_id_input)
        except ValueError:
            print("Invalid input. Please enter a valid product ID.")
            return

        with open(JSON_data, "r") as file:
            data = json.loads(file.read())
            product_found = False
            for product in data:
                if product["product_id"] == product_id:
                    product_found = True
                    print(f"Current data for product {product_id}: {product['product']} \n")

                    try:
                        qty_to_update = int(input("Enter the quantity to update: "))
                        product["product"]["quantity"] += qty_to_update
                        # Removed lines for restore and sell functionality
                        print(f"{qty_to_update} units added to product ID {product_id}. New quantity: {product['product']['quantity']}")
                    except ValueError:
                        print("Invalid input. Quantity should be a number.")
                    break

            if not product_found:
                print("Product not found.")

    with open(JSON_data, "w") as file:
        json.dump(data, file, indent=2)
        # for push