from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from fastapi import BackgroundTasks
from pydantic import EmailStr
import os
from dotenv import load_dotenv

load_dotenv()

conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
    MAIL_FROM=os.getenv("MAIL_FROM"),
    MAIL_SERVER=os.getenv("MAIL_SERVER", "smtp-relay.brevo.com"),
    MAIL_PORT=int(os.getenv("MAIL_PORT", 587)),
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
)

if not conf.MAIL_USERNAME or not conf.MAIL_PASSWORD:
    raise ValueError("Missing MAIL_USERNAME or MAIL_PASSWORD")

async def send_mail(background_tasks: BackgroundTasks, to_email: EmailStr, subject: str, body: str, subtype: str = "html"):
    message = MessageSchema(
        subject=subject,
        recipients=[to_email],
        body=body,
        subtype=subtype
    )

    fm = FastMail(conf)
    background_tasks.add_task(fm.send_message, message)
