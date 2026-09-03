from app.config import MENU_FILE , IMAGE_URL, MENU_CATEGORY_FILE
from app.utils.read_data import read_data
from app.utils.get_limited_data import get_limited_data

def get_menu_categories():
    categories = read_data(MENU_CATEGORY_FILE)
    return categories

def get_all_menu_items(queries):
    print(queries)
    menu = read_data(MENU_FILE)
    for item in menu:
        item['image'] = f"{IMAGE_URL}/{item['image']}"
        
    search = queries.get("search")
    if search:
        search_lower = search.lower()
        menu = [
            m for m in menu
            if search_lower in m["title"].lower() or search_lower in str(m["category"].lower())
        ]
            
    return get_limited_data(queries['limit'],queries['skip'],menu)

def get_menu_item_by_category(category:str, queries):
    print('get menu item by category called')
    menu = read_data(MENU_FILE)
    normalize_category = category.replace('-', ' ')
    filter_items = [item for item in menu if item['category'].lower() == normalize_category]
    
    for item in filter_items:
        item['image'] = f"{IMAGE_URL}/{item['image']}"
        
    return get_limited_data(queries['limit'], queries['skip'], filter_items)