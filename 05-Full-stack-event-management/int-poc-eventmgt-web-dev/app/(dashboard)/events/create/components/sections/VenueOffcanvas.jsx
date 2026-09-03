import { Offcanvas, Button, Card, Form, Row, Col } from "react-bootstrap";
import { VENUE_LEGENDS } from "./venueLegends";

export default function VenueOffcanvas({ show, onHide, register, errors, getValues, setValue }) {

    return (
        <Offcanvas show={show} onHide={onHide} placement="end" style={{ width: "100%" }}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Add Venue</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
                <Card className="p-3 mb-4">
                    <h5>Venue Details</h5>

                    <Row>
                        {/* VENUE NAME */}
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    Venue Name <span className="text-danger">*</span>
                                </Form.Label>

                                <Form.Control
                                    {...register("venue.venue_name")}
                                    isInvalid={!!errors?.venue?.venue_name}
                                />

                                <Form.Control.Feedback type="invalid">
                                    {errors?.venue?.venue_name?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        {/* FULL ADDRESS */}
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    Full Address <span className="text-danger">*</span>
                                </Form.Label>

                                <Form.Control
                                    {...register("venue.address")}
                                    isInvalid={!!errors?.venue?.address}
                                />

                                <Form.Control.Feedback type="invalid">
                                    {errors?.venue?.address?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>

                        {/* CITY */}
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    City <span className="text-danger">*</span>
                                </Form.Label>

                                <Form.Control
                                    {...register("venue.city")}
                                    isInvalid={!!errors?.venue?.city}
                                />

                                <Form.Control.Feedback type="invalid">
                                    {errors?.venue?.city?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        {/* STATE */}
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>State</Form.Label>

                                <Form.Control {...register("venue.state")} />
                            </Form.Group>
                        </Col>

                        {/* COUNTRY */}
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    Country <span className="text-danger">*</span>
                                </Form.Label>

                                <Form.Control
                                    {...register("venue.country")}
                                    isInvalid={!!errors?.venue?.country}
                                />

                                <Form.Control.Feedback type="invalid">
                                    {errors?.venue?.country?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                    </Row>
                    <Row>
                        {/* GOOGLE MAP LINK */}
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Google Map Link</Form.Label>

                                <Form.Control
                                    placeholder="https://maps.google.com/..."
                                    {...register("venue.map_link")}
                                />
                            </Form.Group>
                        </Col>

                        {/* LANDMARK */}
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Landmark</Form.Label>

                                <Form.Control
                                    placeholder="Near Metro Station / Mall"
                                    {...register("venue.landmark")}
                                />
                            </Form.Group>
                        </Col>

                    </Row>
                    <Row className="mt-3">

                        {/* PARKING */}
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Check
                                    type="checkbox"
                                    label="Parking Available"
                                    {...register("venue.has_parking")}
                                />
                            </Form.Group>
                        </Col>

                        {/* ENTRY GATES */}
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Number of Entry Gates</Form.Label>

                                <Form.Control
                                    type="number"
                                    min={1}
                                    {...register("venue.gates_count", {
                                        valueAsNumber: true,
                                    })}
                                />
                            </Form.Group>
                        </Col>


                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    Seat Plan Image <span className="text-danger">*</span>
                                </Form.Label>

                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    isInvalid={!!errors?.venue?.seat_plan_image}
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (!file) return;

                                        setValue("venue.seat_plan_image", file, {
                                            shouldValidate: true,
                                        });
                                    }}
                                />

                                <Form.Control.Feedback type="invalid">
                                    {errors?.venue?.seat_plan_image?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>


                        {/* Venue Map Image */}
                        <Col md={5}>

                            <Form.Group>
                                <Form.Label>Venue Map Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (!file) return;

                                        // RHF state me store karo
                                        setValue("venue.map_image", file, { shouldValidate: true });


                                    }}
                                />

                                {/* MANUAL ERROR MESSAGE */}
                                {errors?.venue?.map_image && (
                                    <div className="text-danger small mt-1">
                                        {errors.venue.map_image.message}
                                    </div>
                                )}
                            </Form.Group>


                        </Col>

                    </Row>

                    <h6 className="fw-semibold mt-3 mb-2">Map Legend</h6>

                    <Row>
                        {VENUE_LEGENDS.map((item) => (
                            <Col md={6} key={item.key} className="mb-2">
                                <Form.Check
                                    type="checkbox"
                                    label={
                                        <span className="d-flex align-items-center gap-2">
                                            <span
                                                className="d-flex align-items-center justify-content-center fw-semibold"
                                                style={{
                                                    width: 28,
                                                    height: 28,
                                                    borderRadius: "50%",
                                                    backgroundColor: item.color,
                                                    color: "#000",
                                                    fontSize: 12,
                                                }}
                                            >
                                                {item.icon}
                                            </span>
                                            {item.label}
                                        </span>
                                    }
                                    {...register(`venue.legend.${item.key}`)}
                                />
                            </Col>
                        ))}
                    </Row>

                    <Row>
                        <Card className="p-3 mt-3">
                            <h6 className="fw-semibold mb-3">Getting There</h6>

                            <Form.Group className="mb-3">
                                <Form.Label>By Car</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    placeholder="Parking details, access roads..."
                                    {...register("venue.getting_there.by_car")}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>By Metro</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    placeholder="Nearest station, exit gate, walking distance..."
                                    {...register("venue.getting_there.by_metro")}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>By Bus</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    placeholder="Bus routes and stops..."
                                    {...register("venue.getting_there.by_bus")}
                                />
                            </Form.Group>
                        </Card>

                    </Row>


                </Card>

                <Button
                    onClick={() => {
                        const venueData = getValues("venue");
                        console.log("VENUE SAVED FROM OFFCANVAS", venueData);
                        onHide();
                    }}
                >
                    Save Venue
                </Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
}
