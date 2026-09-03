import { Container } from "react-bootstrap";

export const metadata = {
    title: "Terms & Conditions | Peterdraw",
    description: "Terms and Conditions for using the Peterdraw Event SaaS Platform",
};

export default function TermsPage() {
    return (
        <Container fluid>
            <div>
                <h2 className="fw-semibold mb-3">Terms & Conditions</h2>
                <p className="text-muted mb-4">
                    Last updated: {new Date().toLocaleDateString()}
                </p>

                {/* INTRO */}
                <section className="mb-4">
                    <h5 className="fw-semibold">1. Introduction</h5>
                    <p className="text-muted">
                        Welcome to <strong>Eventify</strong>, an event management and
                        ticketing SaaS platform. By accessing or using our platform,
                        dashboard, or services, you agree to be bound by these Terms &
                        Conditions.
                    </p>
                    <p className="text-muted">
                        If you do not agree with any part of these terms, you must not use
                        the platform.
                    </p>
                </section>

                {/* PURPOSE */}
                <section className="mb-4">
                    <h5 className="fw-semibold">2. Platform Purpose</h5>
                    <p className="text-muted">
                        Peterdraw provides tools for creating, managing, and promoting
                        events, handling ticket sales, and viewing analytics. Peterdraw
                        does not organize events and is not responsible for event execution.
                    </p>
                </section>

                {/* ACCOUNT */}
                <section className="mb-4">
                    <h5 className="fw-semibold">3. User Accounts</h5>
                    <ul className="text-muted">
                        <li>Users must be at least 18 years old</li>
                        <li>Account information must be accurate and up to date</li>
                        <li>Users are responsible for maintaining account security</li>
                        <li>Fake or duplicate accounts are strictly prohibited</li>
                    </ul>
                </section>

                {/* EVENTS */}
                <section className="mb-4">
                    <h5 className="fw-semibold">4. Event Management</h5>
                    <p className="text-muted">
                        Event organizers are solely responsible for all event details,
                        including pricing, schedules, venues, and rules. Peterdraw is not
                        liable for incorrect or misleading event information.
                    </p>
                </section>

                {/* PAYMENTS */}
                <section className="mb-4">
                    <h5 className="fw-semibold">5. Payments & Fees</h5>
                    <ul className="text-muted">
                        <li>Payments are processed through secure third-party gateways</li>
                        <li>Platform service fees are non-refundable</li>
                        <li>Refund policies are defined by event organizers</li>
                    </ul>
                </section>

                {/* PROHIBITED */}
                <section className="mb-4">
                    <h5 className="fw-semibold">6. Prohibited Activities</h5>
                    <ul className="text-muted">
                        <li>Fraudulent or illegal activities</li>
                        <li>Uploading false or misleading information</li>
                        <li>Attempting to hack or disrupt the platform</li>
                        <li>Violating intellectual property rights</li>
                    </ul>
                </section>

                {/* IP */}
                <section className="mb-4">
                    <h5 className="fw-semibold">7. Intellectual Property</h5>
                    <p className="text-muted">
                        All platform content, branding, and design belong to Peterdraw.
                        Users may not copy or redistribute platform materials without
                        written permission.
                    </p>
                </section>

                {/* LIABILITY */}
                <section className="mb-4">
                    <h5 className="fw-semibold">8. Limitation of Liability</h5>
                    <p className="text-muted">
                        Peterdraw is not responsible for event cancellations, attendee
                        disputes, financial losses, or indirect damages arising from the
                        use of the platform.
                    </p>
                </section>

                {/* TERMINATION */}
                <section className="mb-4">
                    <h5 className="fw-semibold">9. Account Termination</h5>
                    <p className="text-muted">
                        Peterdraw reserves the right to suspend or terminate accounts that
                        violate these Terms or misuse platform services.
                    </p>
                </section>

                {/* CHANGES */}
                <section className="mb-4">
                    <h5 className="fw-semibold">10. Changes to Terms</h5>
                    <p className="text-muted">
                        We may update these Terms at any time. Continued use of the platform
                        after changes indicates acceptance of the revised Terms.
                    </p>
                </section>

                {/* LAW */}
                <section className="mb-4">
                    <h5 className="fw-semibold">11. Governing Law</h5>
                    <p className="text-muted">
                        These Terms shall be governed by and interpreted in accordance with
                        the laws of India.
                    </p>
                </section>

                {/* CONTACT */}
                <section>
                    <h5 className="fw-semibold">12. Contact Us</h5>
                    <p className="text-muted">
                        For any questions regarding these Terms, please contact us at:
                    </p>
                    <p className="text-muted">
                        <strong>Email:</strong>{" "}
                        <a
                            href="mailto:support@eventify.com"
                            className="text-decoration-none text-primary"
                        >
                            support@eventify.com
                        </a>
                    </p>


                </section>
            </div>
        </Container>
    );
}
