<<<<<<< HEAD
import time,sys,os

=======
import time,sys

# sys.path.append(r"C:\invantary_management_system\Indixpert-FSD-April-Python-Pr01\rahul")

sys.path.append(r"R:\inventory_management_system\Indixpert-FSD-April-Python-Pr01\rahul")

JSON_data = r"stock.json"
>>>>>>> b862e1e779bfcb104cc75846df68cc9348a68072

import Adding_product_information
import update_stock_level
import checking_stock_level

def main_menu(user_name, user_id):  
    user_file = f"{user_name}'s_stock_{user_id}.json"
    json_data = r"inventory_data\ " + user_file
    while True:
        print("\n1. Add a new product")
        print("2. Update the stock level")
        print("3. Check the stock level")
        print("0. Exit")
        
        try:
            choice = int(input("Enter your choice: "))
            if choice == 1:
                Adding_product_information.add_product_in_stock(JSON_data)
            elif choice == 2:
                update_stock_level.update_product(JSON_data)
            elif choice == 3:
                checking_stock_level.checking_product_information(JSON_data)
            elif choice == 0:
                print("Exiting the program...")
                time.sleep(2)
                break
            else:
                print("Invalid choice. Please try again.")
        except ValueError:
            print("Invalid input. Please enter a number.")
            # for push