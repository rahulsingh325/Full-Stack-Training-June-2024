"use client";

import EventForm from "@/app/(dashboard)/events/create/components/EventForm";
import { EditorProvider } from "react-simple-wysiwyg";
import Container from "react-bootstrap/Container";

export default function CreateEventPage() {
  return (
    <EditorProvider>
      <Container fluid>
        <EventForm mode="create" />
      </Container>
    </EditorProvider>
  );
}
