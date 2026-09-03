"use client";

import { Card, Form, Button, Spinner, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import api from "@/helper/api";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  notesSchema,
  artistSchema,
  prohibitedItemSchema,
} from "./schemas/notes.schema";

/* ICON OPTIONS */
const ICON_OPTIONS = [
  { key: "food", label: "Food" },
  { key: "weapon", label: "Weapon" },
  { key: "alcohol", label: "Alcohol" },
  { key: "camera", label: "Camera" },
  { key: "bag", label: "Bag" },
];

export default function NotesStep({ eventId, onSaved, }) {
  const router = useRouter();

  const [notes, setNotes] = useState([]);
  const [artists, setArtists] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [editingArtist, setEditingArtist] = useState(null);


  /* ================= NOTES FORM ================= */
  const notesForm = useForm({
    resolver: yupResolver(notesSchema),
    defaultValues: {
      note: {
        text: "",
      },
    },
  });

  /* ================= ARTIST FORM ================= */
  const artistForm = useForm({
    resolver: yupResolver(artistSchema),
    defaultValues: {
      artist: {
        name: "",
        role: "",
        display_order: 1,
      },
    },
  });

  /* ================= PROHIBITED ITEM FORM ================= */
  const itemForm = useForm({
    resolver: yupResolver(prohibitedItemSchema),
    defaultValues: {
      item: {
        title: "",
        icon_key: "",
        note: "",
      },
    },
  });


  const startEdit = (artist) => {
    setEditingArtist(artist);
    artistForm.reset({
      artist: {
        name: artist.name,
        role: artist.role || "",
        display_order: artist.display_order,
      },
    });
  };



  /* ================= FETCH ALL ================= */
  const fetchAll = async () => {
    try {
      const [n, a, p] = await Promise.all([
        api.get(`/notes/list/${eventId}`),
        api.get(`/artists/list/${eventId}`),
        api.get(`/prohibited_items/list/${eventId}`),
      ]);

      setNotes(n.data || []);
      setArtists(a.data || []);
      setItems(p.data || []);
    } catch (e) {
      console.error("FETCH ERROR", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventId) fetchAll();
  }, [eventId]);

  /* ================= ADD NOTE ================= */
  const addNote = async (data) => {
    try {
      setSaving(true);
      await api.post("/notes/add", {
        event_id: eventId,
        note: data.note.text,
      });
      toast.success("Note added");
      onSaved?.();
      notesForm.reset({ note: { text: "" } });
      fetchAll();
    } catch {
      toast.error("Failed to add note");
    } finally {
      setSaving(false);
    }
  };

  /* ================= ADD ARTIST ================= */
  const addArtist = async (data) => {
    try {
      setSaving(true);

      const fd = new FormData();
      fd.append("event_id", eventId);
      fd.append("name", data.artist.name);
      fd.append("display_order", data.artist.display_order);

      if (data.artist.role) {
        fd.append("role", data.artist.role);
      }

      await api.post("/artists/add", fd);

      toast.success("Artist added");
      onSaved?.();
      artistForm.reset({
        artist: { name: "", role: "", display_order: 1 },
      });
      fetchAll();
    } catch (err) {
      console.error("ARTIST ADD FAILED", err);
      toast.error("Failed to add artist");
    } finally {
      setSaving(false);
    }
  };


  // Update Artists
  const updateArtist = async (data) => {
    try {
      setSaving(true);

      const fd = new FormData();
      fd.append("artist_id", editingArtist.artist_id);
      fd.append("name", data.artist.name);
      fd.append("display_order", data.artist.display_order);

      if (data.artist.role) {
        fd.append("role", data.artist.role);
      }

      await api.put("/artists/update", fd);

      toast.success("Artist updated");
      onSaved?.();
      setEditingArtist(null);
      artistForm.reset({
        artist: { name: "", role: "", display_order: 1 },
      });
      fetchAll();
    } catch (e) {
      toast.error("Failed to update artist");
    } finally {
      setSaving(false);
    }
  };

  /* ================= ADD PROHIBITED ITEM ================= */
  const addItem = async (data) => {
    try {
      setSaving(true);

      const fd = new FormData();
      fd.append("event_id", eventId);
      fd.append("title", data.item.title);
      fd.append("icon_key", data.item.icon_key);

      if (data.item.note) {
        fd.append("note", data.item.note);
      }

      await api.post("/prohibited_items/add", fd);

      toast.success("Prohibited item added");
      onSaved?.();
      itemForm.reset({
        item: { title: "", icon_key: "", note: "" },
      });
      fetchAll();
    } catch (e) {
      toast.error("Failed to add prohibited item");
    } finally {
      setSaving(false);
    }
  };


  /* ================= DELETE ================= */
  const remove = async (url, id) => {
    await api.delete(`${url}/${id}`);
    fetchAll();
  };

  if (loading) {
    return (
      <div className="p-5 text-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Card className="p-4 shadow-sm">
      <h5 className="mb-4">Notes & Guidelines</h5>

      {/* ================= NOTES ================= */}
      <Card className="p-3 mb-4 border">
        <h6>Internal Notes</h6>

        <Form onSubmit={notesForm.handleSubmit(addNote)}>
          <Form.Control
            as="textarea"
            rows={3}
            {...notesForm.register("note.text")}
          />
          <div className="text-end mt-2">
            <Button size="sm" type="submit" disabled={saving} className="bg-secondary-100 text-grey-10">
              Add Note
            </Button>
          </div>
        </Form>

        {notes.map((n) => (
          <div
            key={n.note_id}
            className="border p-2 mt-2 d-flex justify-content-between"
          >
            <span>{n.note}</span>
            <Button
              size="sm"
              variant="outline-danger"
              onClick={() => remove("/notes/delete", n.note_id)}
            >
              Remove
            </Button>
          </div>
        ))}
      </Card>

      {/* ================= ARTISTS ================= */}
      <Card className="p-3 mb-4 border">
        <h6>Artists</h6>

        <Form
          onSubmit={artistForm.handleSubmit(
            editingArtist ? updateArtist : addArtist
          )}
        >
          <Row>
            <Col md={4}  className="mt-2">
              <Form.Control
                placeholder="Artist name"
                {...artistForm.register("artist.name")}
              />
            </Col>

            <Col md={4}  className="mt-2">
              <Form.Control
                placeholder="Role (Singer / DJ)"
                {...artistForm.register("artist.role")}
              />
            </Col>

            <Col md={2}  className="mt-2">
              <Form.Control
                type="number"
                min={1}
                {...artistForm.register("artist.display_order", {
                  valueAsNumber: true,
                })}
              />
            </Col>

            <Col md={2} className="mt-2">
              <Button type="submit" size="sm" disabled={saving} className="bg-secondary-100 text-grey-10">
                {editingArtist ? "Update" : "Add"}
              </Button>
            </Col>
          </Row>
        </Form>

        {artists
          .sort((a, b) => a.display_order - b.display_order)
          .map((a) => (
            <div
              key={a.artist_id}
              className="border p-2 mt-2 d-flex justify-content-between"
            >
              <span>
                {a.display_order}. {a.name} {a.role && `(${a.role})`}
              </span>

              <div className="d-flex gap-2">
                <Button
                  size="sm"
                  variant="outline-primary"
                  onClick={() => startEdit(a)}
                >
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => remove("/artists/delete", a.artist_id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
      </Card>



      {/* ================= PROHIBITED ITEMS ================= */}
      <Card className="p-3 mb-4 border">
        <h6>Prohibited Items</h6>

        <Form onSubmit={itemForm.handleSubmit(addItem)}>
          <Row>
            <Col md={6}  className="mt-2">
              <Form.Control
                placeholder="Item title"
                {...itemForm.register("item.title")}
              />
            </Col>

            <Col md={6} className="mt-2">
              <Form.Select {...itemForm.register("item.icon_key")}>
                <option value="">Select icon</option>
                {ICON_OPTIONS.map((i) => (
                  <option key={i.key} value={i.key}>
                    {i.label}
                  </option>
                ))}
              </Form.Select>
            </Col>
            </Row>
            <Row className="">

            <Col md={6} className="mt-2">
              <Form.Control
                placeholder="Note (optional)"
                {...itemForm.register("item.note")}
              />
            </Col>

            <Col md={6} className="text-end mt-2">
              <Button type="submit" size="sm" disabled={saving} className="bg-secondary-100 text-grey-10">
                Add
              </Button>
            </Col>
          </Row>
        </Form>

        {items.map((i) => (
          <div
            key={i.prohibited_item_id}
            className="border p-2 mt-2 d-flex justify-content-between"
          >
            <span>
              {i.title}
              {i.note && ` – ${i.note}`}
            </span>

            <Button
              size="sm"
              variant="outline-danger"
              onClick={() =>
                remove("/prohibited_items/delete", i.prohibited_item_id)
              }
            >
              Remove
            </Button>
          </div>
        ))}
      </Card>

      {/* ================= FINISH ================= */}
      <div className="text-end">
        <Button variant="primary" onClick={() => router.push("/events")} className="bg-secondary-100 text-grey-10">
          Submit All & Finish
        </Button>
      </div>
    </Card>
  );
}
