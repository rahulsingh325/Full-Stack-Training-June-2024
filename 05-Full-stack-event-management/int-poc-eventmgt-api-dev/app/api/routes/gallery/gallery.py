from uuid import UUID

from fastapi import (
    APIRouter,
    Depends,
    Query,
    HTTPException,
    UploadFile,
    File,
    Form,
)

from app.schemas.gallery.gallery_schema import GalleryCreate, GalleryImageAdd
from app.security.context import get_current_user
from app.security.jwt_guard import jwt_guard
from app.db.dependencies import get_db
from app.services.gallery.gallery_service import (
    create_gallery,
    delete_gallery_image,
    list_galleries,
    add_gallery_image,
    get_gallery_images,
    delete_gallery,
)
from app.utils.upload_image import upload_image

router = APIRouter()


@router.post("/create")
def create(
    payload: GalleryCreate,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    result = create_gallery(
        conn=conn,
        user_id=current_user["user_id"],
        payload=payload,
    )
    if not result:
        raise HTTPException(status_code=400, detail="Gallery creation failed")
    return result


@router.get("/list")
def list_(
    search: str | None = None,
    category_name: str | None = None,
    date_filter: str = Query("all", regex="^(all|week|month|custom)$"),
    from_date: str | None = None,
    to_date: str | None = None,
    limit: int = Query(12, ge=1, le=50),
    offset: int = Query(0, ge=0),
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    if date_filter == "custom" and (not from_date or not to_date):
        raise HTTPException(status_code=400, detail="from_date and to_date required")

    return list_galleries(
        conn=conn,
        user_id=current_user["user_id"],
        search=search,
        category_name=category_name,
        date_filter=date_filter,
        from_date=from_date,
        to_date=to_date,
        limit=limit,
        offset=offset,
    )


@router.post("/{gallery_id}/images/upload")
def upload_gallery_image(
    gallery_id: UUID,
    image: UploadFile = File(...),
    caption: str | None = Form(None),
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    image_url = upload_image(image, "gallery/images")

    payload = GalleryImageAdd(
        image_url=image_url,
        caption=caption,
    )

    result = add_gallery_image(
        conn=conn,
        user_id=current_user["user_id"],
        gallery_id=gallery_id,
        payload=payload,
    )
    if not result:
        raise HTTPException(status_code=400, detail="Image not added")

    return result


@router.delete("/{gallery_id}/images/{image_id}")
def delete_image(
    gallery_id: UUID,
    image_id: UUID,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    result = delete_gallery_image(
        conn=conn,
        user_id=current_user["user_id"],
        gallery_id=gallery_id,
        image_id=image_id,
    )
    if not result:
        raise HTTPException(status_code=404, detail="Image not found")
    return result


@router.get("/{gallery_id}/images")
def get_images(
    gallery_id: UUID,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_gallery_images(
        conn=conn,
        user_id=current_user["user_id"],
        gallery_id=gallery_id,
    )


@router.delete("/{gallery_id}")
def remove(
    gallery_id: UUID,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return delete_gallery(
        conn=conn,
        user_id=current_user["user_id"],
        gallery_id=gallery_id,
    )
