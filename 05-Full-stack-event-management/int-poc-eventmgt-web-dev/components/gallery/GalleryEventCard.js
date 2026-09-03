import { MoreVertical, Trash2, ImagePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "@/helper/api";
import { formatDate } from "@/utils/dateTime";

export default function GalleryEventCard({
  gallery,
  onDeleted,
}) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const {
    gallery_id,
    title = "Untitled Gallery",
    cover_image_url,
    created_at,
    category_name,
  } = gallery;

  const hasCategory = Boolean(category_name);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this gallery?")) return;

    try {
      setDeleting(true);
      await api.delete(`/galleries/${gallery_id}`);
      onDeleted?.(gallery_id);
    } catch (err) {
      alert("Failed to delete gallery");
    } finally {
      setDeleting(false);
      setMenuOpen(false);
    }
  };

  return (
    <div className="event-card position-relative">
      <div
        className="rounded-4 mb-3 cursor-pointer d-flex align-items-start p-3"
        style={{
          height: 170,
          backgroundSize: "cover",     
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#e5e7eb",
          backgroundImage: cover_image_url
            ? `url(${cover_image_url})`
            : undefined,
        }}
        onClick={() => router.push(`/gallery/${gallery_id}`)}
      >
      </div>


      <div className="event-info">
        <div className="d-flex justify-content-between align-items-start">
          <div className="fw-semibold text-truncate pe-2">
            {title}
          </div>

          <div className="position-relative">
            <MoreVertical
              size={16}
              className="cursor-pointer text-muted"
              onClick={() =>
                setMenuOpen((v) => !v)
              }
            />

            {menuOpen && (
              <div
                className="position-absolute end-0 mt-2 bg-white shadow rounded-3 p-2"
                style={{ minWidth: 160, zIndex: 10 }}
              >
                <button
                  className="btn btn-sm w-100 text-start"
                  onClick={() =>
                    router.push(`/gallery/${gallery_id}`)
                  }
                >
                  <ImagePlus size={14} className="me-2" />
                  Add Images
                </button>

                <button
                  className="btn btn-sm w-100 text-start text-danger"
                  disabled={deleting}
                  onClick={handleDelete}
                >
                  <Trash2 size={14} className="me-2" />
                  Delete Gallery
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="d-flex align-items-center fs-body-sm mt-1">
          {hasCategory && (
            <>
              <span className="text-primary-100">
                {category_name}
              </span>
              <span className="mx-2">•</span>
            </>
          )}

          <span className="text-grey-80">
            {created_at && formatDate(created_at)}
          </span>
        </div>
      </div>
    </div>
  );
}
