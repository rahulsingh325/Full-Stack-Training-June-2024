import uuid
import cloudinary
import cloudinary.uploader
from fastapi import UploadFile, HTTPException
from app.core.config import settings

cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
    secure=True,
)

ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp"}
MAX_IMAGE_SIZE_MB = 50


def upload_image(image: UploadFile, folder: str) -> str:
    if not image:
        raise HTTPException(400, "Image file missing")

    if image.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(400, "Unsupported image type")

    image.file.seek(0, 2)
    size_mb = image.file.tell() / (1024 * 1024)
    image.file.seek(0)

    if size_mb > MAX_IMAGE_SIZE_MB:
        raise HTTPException(400, "Image size exceeds limit")

    try:
        return cloudinary.uploader.upload(
            image.file,
            folder=f"EMD/{folder}",
            public_id=str(uuid.uuid4()),
            resource_type="image",
            timeout=10,   
        )["secure_url"]

    except Exception as exc:
        raise HTTPException(502, f"Image upload failed: {exc}")

