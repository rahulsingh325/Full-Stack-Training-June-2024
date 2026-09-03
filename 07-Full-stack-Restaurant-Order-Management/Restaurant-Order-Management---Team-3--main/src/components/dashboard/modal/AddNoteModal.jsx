import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddNoteModal = ({ show, onHide, note, setNote, onSubmit }) => {
    return (
        <Modal show={show} onHide={onHide} centered backdrop="static">
            <div className="p-lg-5">
                <Modal.Header closeButton>
                    <Modal.Title>Add note</Modal.Title>
                </Modal.Header>

                <Modal.Body className="pt-lg-5">
                    <Form.Group>
                        <Form.Label>Enter Order Note</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={8}
                            placeholder="What your order note here..."
                            className="bg-neutral-200 pt-lg-2 border"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer className="border-0 pt-lg-5">
                    <div className="d-flex w-100 gap-2">
                        <Button variant="light" className="rounded-pill py-2 border  flex-grow-1" onClick={onHide} >
                            Cancel
                        </Button>
                        <Button variant="primary" className="rounded-pill py-2 flex-grow-1" onClick={onSubmit} >
                            Add to Order
                        </Button>
                    </div>
                </Modal.Footer>
            </div>
        </Modal>
    );
};

export default AddNoteModal;
