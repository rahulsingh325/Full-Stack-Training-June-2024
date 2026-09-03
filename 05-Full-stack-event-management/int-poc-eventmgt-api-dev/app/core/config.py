from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    
    # Cloudinary Config
    CLOUDINARY_CLOUD_NAME: str
    CLOUDINARY_API_KEY: str
    CLOUDINARY_API_SECRET: str
    
    # Database settings
    DB_SERVER: str
    DB_NAME: str
    DB_USER: str
    DB_PASSWORD: str
    DB_DRIVER: str

    #  JWT CONFIG (ADDED ONLY)
    JWT_SECRET_KEY: str = "your_default_secret_key" 
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 120

    @property
    def DATABASE_URL(self):
        return (
            f"mssql+pyodbc://{self.DB_USER}:{self.DB_PASSWORD.replace('@', '%40')}"
            f"@{self.DB_SERVER}/{self.DB_NAME}?driver={self.DB_DRIVER.replace(' ', '+')}"
        )

    class Config:
        env_file = ".env"
        extra = "allow"   


settings = Settings()  # type: ignore
