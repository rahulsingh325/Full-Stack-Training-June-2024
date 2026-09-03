from uuid import UUID
from app.db.procedures import call_procedure_read
from app.schemas.gallery.gallery_schema import GalleryCreate, GalleryImageAdd


def create_gallery(
    conn,
    user_id: int,
    payload: GalleryCreate,
):
    rows = call_procedure_read(
        conn,
        "emd.sp_gallery_create",
        {
            "user_id": user_id,
            "event_id": payload.event_id,
            "title": payload.title,
        },
    )
    return rows[0] if rows else None


def list_galleries(
    conn,
    user_id: int,
    search=None,
    category_name=None,
    date_filter="all",
    from_date=None,
    to_date=None,
    limit=12,
    offset=0,
):
    result_sets = call_procedure_read(
        conn,
        "emd.sp_gallery_list",
        {
            "user_id": user_id,
            "search": search,
            "category_name": category_name,
            "date_filter": date_filter,
            "from_date": from_date,
            "to_date": to_date,
            "limit": limit,
            "offset": offset,
        },
        multi=True,
    )

    rows = result_sets[0] if result_sets and result_sets[0] else []
    total_rs = result_sets[1] if len(result_sets) > 1 and result_sets[1] else []

    return {
        "items": [
            {
                "id": r["gallery_id"],
                "title": r["title"],
                "cover_image_url": r["cover_image_url"],
                "event_name": r["event_name"],
                "category_name": r["category_name"],
                "created_at": r["created_at"],
            }
            for r in rows
        ],
        "total": total_rs[0]["total"] if total_rs else 0,
    }


def add_gallery_image(
    conn,
    user_id: int,
    gallery_id: UUID,
    payload: GalleryImageAdd,
):
    rows = call_procedure_read(
        conn,
        "emd.sp_gallery_image_add",
        {
            "user_id": user_id,
            "gallery_id": gallery_id,
            "image_url": payload.image_url,
            "caption": payload.caption,
        },
    )
    return rows[0] if rows else None


def delete_gallery_image(
    conn,
    user_id: int,
    gallery_id: UUID,
    image_id: UUID,
):
    rows = call_procedure_read(
        conn,
        "emd.sp_gallery_image_delete",
        {
            "user_id": user_id,
            "gallery_id": gallery_id,
            "image_id": image_id,
        },
    )
    return rows[0] if rows else None


def get_gallery_images(
    conn,
    user_id: int,
    gallery_id: UUID,
):
    rows = call_procedure_read(
        conn,
        "emd.sp_gallery_images_get",
        {
            "user_id": user_id,
            "gallery_id": gallery_id,
        },
    )
    return rows or []


def delete_gallery(
    conn,
    user_id: int,
    gallery_id: UUID,
):
    rows = call_procedure_read(
        conn,
        "emd.sp_gallery_delete",
        {
            "user_id": user_id,
            "gallery_id": gallery_id,
        },
    )
    return rows[0] if rows else None
