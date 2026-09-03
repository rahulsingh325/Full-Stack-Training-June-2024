from app.config import OVERALL_FILE, TRENDING_FILE, REPORT_FILE, TRANSACTION_FILE, INCOME_FILE, IMAGE_URL
from app.utils.read_data import read_data
from app.utils.get_limited_data import get_limited_data


def get_reports(queries):
    reports = read_data(REPORT_FILE)
    return get_limited_data(queries['limit'], queries['skip'], reports)

def get_trending_menu(queries):
    trending_menu = read_data(TRENDING_FILE)
    
    for item in trending_menu:
        item['image'] = f"{IMAGE_URL}/{item['image']}"
        
    return get_limited_data(queries['limit'], queries['skip'], trending_menu)

def get_overall(queries):
    overall = read_data(OVERALL_FILE)

    for i in overall:
        i['icon'] = f"{IMAGE_URL}/{i['icon']}"
        
    return get_limited_data(queries['limit'], queries['skip'], overall)

def get_trasactions(queries):
    transactions = read_data(TRANSACTION_FILE)

    for t in transactions:
        t['image'] = f"{IMAGE_URL}/{t['image']}"

    return get_limited_data(queries['limit'], queries['skip'], transactions)

def get_income(queries):
    income = read_data(INCOME_FILE)
    return get_limited_data(queries['limit'], queries['skip'], income)


