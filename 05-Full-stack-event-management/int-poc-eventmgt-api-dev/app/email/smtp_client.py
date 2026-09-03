import smtplib
from email.mime.text import MIMEText


class SmtpClient:
    __slots__ = ("_host", "_port", "_user", "_password")

    def __init__(self, *, host, port, user, password):
        self._host = host
        self._port = port
        self._user = user
        self._password = password

    def send(self, *, to_email: str, subject: str, body_html: str) -> None:
        msg = MIMEText(body_html, "html")
        msg["Subject"] = subject
        msg["From"] = self._user
        msg["To"] = to_email

        with smtplib.SMTP(self._host, self._port, timeout=10) as server:
            server.starttls()
            server.login(self._user, self._password)
            server.send_message(msg)
