from app.config import BILL_FILE
from app.utils.read_data import read_data
from app.utils.get_limited_data import get_limited_data
import json


def get_all_bills(queries: dict):
    bills = read_data(BILL_FILE)
    
    search = queries.get("search")
    if search:
        search_lower = search.lower()
        bills = [
            bill for bill in bills
            if search_lower in bill["customerName"].lower() or search in str(bill["id"])
        ]
    return get_limited_data(queries.get('limit'), queries.get('skip'), bills)


def get_bill_by_id(bill_id: int):
    bills = read_data(BILL_FILE)
    for bill in bills:
        if bill.get('id') == bill_id:
            return bill
    return {"error": "Bill not found"}


def add_new_bill(bill_data: dict):
    bills = read_data(BILL_FILE)
    bill_data['id'] = max([b['id'] for b in bills], default=0) + 1
    bills.append(bill_data)
    with open(BILL_FILE, "w") as f:
        json.dump(bills, f, indent=2)
    return bill_data

def delete_bill(bill_id: int):
    bills = read_data(BILL_FILE)
    new_bills = [b for b in bills if b.get('id') != bill_id]
    if len(new_bills) == len(bills):
        return {"error": "Bill not found"}
    with open(BILL_FILE, "w") as f:
        json.dump(new_bills, f, indent=2)
    return {"status": "success", "message": f"Bill {bill_id} deleted"}


