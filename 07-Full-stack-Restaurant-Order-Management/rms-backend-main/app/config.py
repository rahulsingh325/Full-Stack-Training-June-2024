import os

#URL
# BASE_URL = " http://127.0.0.1:8000"
BASE_URL = "https://rms-backend-1ilc.onrender.com"
IMAGE_URL = f"{BASE_URL}/images"

#Directories path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "database")
UPLOAD_DIR = os.path.join(BASE_DIR, "upload")
IMAGES_DIR = os.path.join(UPLOAD_DIR, "images")

#Files path
MENU_FILE = os.path.join(DATA_DIR, "menu.json")
MENU_CATEGORY_FILE = os.path.join(DATA_DIR, "menu_category.json")
TABLE_FILE = os.path.join(DATA_DIR, "tables.json")
ORDER_FILE = os.path.join(DATA_DIR, 'orders.json')
BILL_FILE = os.path.join(DATA_DIR, 'bills.json')
HISTORY_FILE = os.path.join(DATA_DIR, 'history.json')
INCOME_FILE = os.path.join(DATA_DIR, 'income.json')
REPORT_FILE = os.path.join(DATA_DIR, 'reports.json')
TRANSACTION_FILE = os.path.join(DATA_DIR, 'transactions.json')
TRENDING_FILE = os.path.join(DATA_DIR, 'trending.json')
OVERALL_FILE = os.path.join(DATA_DIR, 'overall.json')
USER_FILE = os.path.join(DATA_DIR, 'users.json')


