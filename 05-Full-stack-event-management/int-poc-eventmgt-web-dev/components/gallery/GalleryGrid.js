import { Col, Row } from "react-bootstrap";
import GalleryEventCard from "./GalleryEventCard";

export default function GalleryGrid({
  galleries,
  loading,
  onDeleted,
}) {
  if (loading)
    return <p className="text-center py-5">Loading...</p>;

  if (!galleries.length)
    return (
      <p className="text-center py-5">
        No galleries found
      </p>
    );

  return (
    <Row className="g-4">
      {galleries.map((gallery) => (
        <Col
          xl={3}
          lg={4}
          md={6}
          key={gallery.gallery_id}
        >
          <GalleryEventCard
            gallery={gallery}
            onDeleted={onDeleted}
          />
        </Col>
      ))}
    </Row>
  );
}
