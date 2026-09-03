import json,sys,time
sys.path.append(r"R:\inventory_management_system\Indixpert-FSD-April-Python-Pr01\rahul")
import uuid
import re # Import the re module for regular expressions 
import merging_all_codes

user_login_data = r"user_data.json"

def save_user_data(data):
    try:
        with open(user_login_data, 'r') as file:
            users = json.load(file)
    except FileNotFoundError:
        users = []

    users.append(data)
    
    with open(user_login_data, 'w') as file:
        json.dump(users, file, indent=4)
        
def load_user_data(data):
    try:
        with open(user_login_data, 'r') as file:
            users = json.load(file)
    except FileNotFoundError:
        return []
    

def generate_user_id():
    return "INVEN" + str(uuid.uuid4())[:5]

def validata_email(email):
    email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    return re.match(email_regex, email) is not None
    
def is_email_resistered(user_email):
    users = load_user_data()
    for user in users:
        if user["email"]==user_email:
            return True
        else:
            return False
        
def valid_password(new_password):
    if len(new_password)>=8:
        return True
    
def user_authenticated(user_name, user_id):
    merging_all_codes.main_menu(user_name, user_id)
    
    
def opening_dashboard():
    print("\n\nLoading your dashboard...",end="")
    for i in range (10):
        time.sleep(.4)
        print(".", end="")
        
        
def user_sign_up_data():
    users = load_user_data()
    
    if len(users) >=3:
        print("registration limit reached. only 3 users can sign up.")
        return
    
    user_id = generate_user_id()
    first_name = input("Your First name: ").strip()
    last_name = input("Your Last name: ").strip()
    user_email = input("Your Email Id : ").strip()
    
    if not validata_email(user_email):
        print("Error: Invalid email format. please enter a valid email address.")
        return 
    
    if is_email_resistered(user_email):
        print(f"user already registered with this email: {user_email}")
        return
    
    while True:
        new_password = input("create  password: ").strip()
        
        if valid_password(new_password):
            break
        else:
            print("password must be at least 8 characters long. Please try again") 
            
    confirm_password = input("Confirm password: ").strip()
    
    if new_password == confirm_password:
        user_data = {
            "user_id": user_id,
            "first_name": first_name,
            "last_name": last_name,
            "email": user_email,
            "password": new_password
        }
        
        save_user_data(user_data)
        print("\nRegistration successful.")
    else:
        print("Passwords do not match. Please try again.")
        

def user_login_data():
    user_email = input("Email ID: ").strip()
    
    if not validata_email(user_email):
        print("Invalid email format. please enter a valid email address.")
        return False 
    
    password = input("user password: ").strip()
    
    users = load_user_data()
    
    for user in users:
        if user["email"] == user_email and user["password"] == password:
            print("\nLogin Successful.")
            print(f"welcome bac, {user['first_name']}!")
            opening_dashboard()
            user_authenticated(user["first_name"], user["user_id"])
            return True
    print("Invalid email or password. please try again. ")
    return False


def dashboard():
    print("\n*************** welcome to Inventory management system **************\n\n")
    while True:
        print("1: Log in")
        print("2: Sign up")
        print("0: Exit")
        
        try:
            choice = int(input("Enter your choice: "))
            
            if choice == 1:
                if user_login_data():
                    break
            elif choice == 2:
                user_sign_up_data()
            elif choice == 0:
                print("\nExiting the system...")
                sys.exit(0)
            else:
                print("Invalid choice. Please try again.")
                
        except ValueError:
            print("only integer values are allowed")