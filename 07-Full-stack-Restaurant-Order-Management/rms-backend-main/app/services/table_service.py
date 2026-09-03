
from app.utils.read_data import read_data
from app.config import TABLE_FILE




def get_all_tables():
    tables = read_data(TABLE_FILE)
    return tables