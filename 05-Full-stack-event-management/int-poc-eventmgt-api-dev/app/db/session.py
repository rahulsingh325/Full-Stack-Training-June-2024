import pyodbc
from app.core.config import settings


def get_connection():
    conn_str = (
        "DRIVER={ODBC Driver 17 for SQL Server};"
        f"SERVER={settings.DB_SERVER};"
        f"DATABASE={settings.DB_NAME};"
        f"UID={settings.DB_USER};"
        f"PWD={settings.DB_PASSWORD};"
        "TrustServerCertificate=yes;"
    )

    conn = pyodbc.connect(conn_str, autocommit=True)
    return conn


def get_system_db():
    return get_connection()


