"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { Container, Row, Col, Spinner, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import api from "@/helper/api";
import Header from "@/components/Header";

export default function GalleryDetailPage() {
  const params = useParams();
  const galleryId = params?.gallery_id;

  if (!galleryId || galleryId === "undefined") {
    console.error("Invalid gallery_id", params);
    return null;
  }

  const [images, setImages] = useState([]);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  /* =========================
     FETCH IMAGES
  ========================= */
  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(
        `/galleries/${galleryId}/images`
      );

      const normalized = (res.data ?? []).map((img) => ({
        image_id: img.image_id,
        url: img.image_url,
        caption: img.caption,
      }));

      setImages(normalized);
    } catch (err) {
      toast.error("Failed to load images");
      setImages([]);
    } finally {
      setLoading(false);
    }
  }, [galleryId]);

  /* =========================
     UPLOAD IMAGE + CAPTION
  ========================= */
  const handleUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    if (caption) formData.append("caption", caption);

    setUploading(true);
    try {
      await api.post(
        `/galleries/${galleryId}/images/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Image uploaded successfully");
    } catch (err) {
      toast.error("Image upload failed");
    } finally {
      setCaption("");
      fetchImages();
      setUploading(false);
    }
  };

  /* =========================
     DELETE IMAGE
  ========================= */
  const handleDeleteImage = async (imageId) => {
    if (!imageId) return;
    if (!confirm("Delete this image?")) return;

    try {
      await api.delete(
        `/galleries/${galleryId}/images/${imageId}`
      );

      setImages((prev) =>
        prev.filter((img) => img.image_id !== imageId)
      );

      toast.success("Image deleted");
    } catch (err) {
      toast.error("Failed to delete image");
    }
  };

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return (
    <>
      {/* <Header
        title="Gallery Images"
        breadcrumb="Dashboard / Gallery / Images"
      /> */}

      <Container fluid className="bg-grey-20 rounded-4 p-4">

        {/* IMAGE GRID */}
        {loading ? (
          <p className="text-center py-5">Loading images…</p>
        ) : !images.length ? (
          <p className="text-center py-5 text-muted">
            No images uploaded yet
          </p>
        ) : (
          <Row className="g-4 mb-4">
            {images.map((img) => (
              <Col xl={6} lg={6} key={img.image_id}>
                <div className="bg-white rounded-4 shadow-sm overflow-hidden h-100 position-relative">
                  <img
                    src={img.url}
                    alt={img.caption || ""}
                    className="w-100"
                    style={{
                      height: 300,
                      objectFit: "cover",
                    }}
                  />

                  {/* DELETE */}
                  <button
                    type="button"
                    className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                    style={{ zIndex: 5 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteImage(img.image_id);
                    }}
                  >
                    ✕
                  </button>

                  {img.caption && (
                    <div className="p-3 fs-body-sm text-grey-80">
                      {img.caption}
                    </div>
                  )}
                </div>
              </Col>
            ))}
          </Row>
        )}

        {/* UPLOAD SECTION */}
        <div className="bg-white rounded-4 shadow-sm p-4">
          <Row className="align-items-end g-3">
            <Col md={6}>
              <Form.Label className="fw-medium">
                Image Caption (optional)
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. Opening ceremony moment"
                value={caption}
                onChange={(e) =>
                  setCaption(e.target.value)
                }
              />
            </Col>

            <Col md="auto">
              <label className="btn bg-primary-100 text-grey-10 rounded-pill px-4">
                {uploading ? (
                  <>
                    <Spinner size="sm" className="me-2" />
                    Uploading…
                  </>
                ) : (
                  "Upload Image"
                )}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  disabled={uploading}
                  onChange={(e) =>
                    handleUpload(e.target.files[0])
                  }
                />
              </label>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}
