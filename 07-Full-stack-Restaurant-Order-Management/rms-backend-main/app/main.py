from fastapi import FastAPI
from app.routes import menu_route, table_route, order_route, bill_route, history_route, report_route, auth_route
from fastapi.staticfiles import StaticFiles
from app.config import IMAGES_DIR
from app.utils.read_data import read_data
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware



load_dotenv()

app = FastAPI()
app.mount("/images", StaticFiles(directory=IMAGES_DIR), name="images")
origins = [
    'http://localhost:5173',
    'https://restaurant-order-management.vercel.app',
    'http://127.0.0.1:8000',
    'https://dev-rms-team-3.firebaseapp.com',
    'https://uat-rms-team-3.firebaseapp.com',
    'https://rms-team-3.firebaseapp.com'
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    
    
)



app.include_router(menu_route.router, prefix="/menu", tags=["Menu"])
app.include_router(table_route.router, prefix="/tables", tags=["Tables"])
app.include_router(order_route.router, prefix="/orders", tags=["Orders"])
app.include_router(bill_route.router, prefix="/bills", tags=["Bills"])
app.include_router(history_route.router, prefix="/history", tags=["History"])
app.include_router(report_route.router, prefix="/reports", tags=["Reports"])
app.include_router(auth_route.router, prefix="/auth", tags=["Auth"])