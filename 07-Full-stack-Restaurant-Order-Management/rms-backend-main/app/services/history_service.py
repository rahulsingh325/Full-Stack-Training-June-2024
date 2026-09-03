
from app.config import ORDER_FILE, IMAGE_URL
from app.utils.read_data import read_data
from app.utils.get_limited_data import get_limited_data


def get_all_history(queries):
    history = read_data(ORDER_FILE)
    
    for h in history:
        for item in h['items']:
            item['image'] = f"{IMAGE_URL}/{item['image']}"
            
    return get_limited_data(queries['limit'], queries['skip'], history)