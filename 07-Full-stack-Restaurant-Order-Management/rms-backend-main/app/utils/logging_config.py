import logging
from logging.handlers import RotatingFileHandler
import os

# Create a logs directory if it doesn't exist
os.makedirs("logs", exist_ok=True)

# Define log file paths
info_log = "logs/info.log"
error_log = "logs/error.log"

# Formatter for all logs
formatter = logging.Formatter(
    "%(asctime)s | "
    "%(levelname)s | "
    "%(filename)s | "
    "%(module)s | "
    "%(lineno)d | "
    "%(pathname)s | "
    "%(message)s | "

)

# Info file handler
info_handler = RotatingFileHandler(info_log, maxBytes=5_000_000, backupCount=5)
info_handler.setLevel(logging.INFO)
info_handler.setFormatter(formatter)

# Error file handler
error_handler = RotatingFileHandler(error_log, maxBytes=5_000_000, backupCount=5)
error_handler.setLevel(logging.ERROR)
error_handler.setFormatter(formatter)


# Root logger configuration
logging.basicConfig(
    level=logging.DEBUG,
    handlers=[info_handler, error_handler],
)
