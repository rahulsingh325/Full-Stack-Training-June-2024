import { Container } from "react-bootstrap";

export const metadata = {
    title: "Privacy Policy | Eventify",
    description: "Privacy Policy for the Eventify Event Management SaaS Platform",
};

export default function PrivacyPolicyPage() {
    return (
        <Container fluid>
            <div className="">
                <h2 className="fw-semibold mb-3">Privacy Policy</h2>
                <p className="text-muted mb-4">
                    Last updated: {new Date().toLocaleDateString()}
                </p>

                {/* INTRO */}
                <section className="mb-4">
                    <p className="text-muted">
                        This Privacy Policy explains how <strong>Eventify</strong> (“we”,
                        “our”, or “us”) collects, uses, and protects your personal
                        information when you use our event management and ticketing
                        platform.
                    </p>
                    <p className="text-muted">
                        By using our services, you agree to the collection and use of
                        information in accordance with this Privacy Policy.
                    </p>
                </section>

                {/* INFORMATION COLLECTED */}
                <section className="mb-4">
                    <h5 className="fw-semibold">1. Information We Collect</h5>

                    <h6 className="fw-medium mt-3">a) Personal Information</h6>
                    <ul className="text-muted">
                        <li>Name, email address, phone number</li>
                        <li>Account login credentials</li>
                        <li>Organizer or business details</li>
                    </ul>

                    <h6 className="fw-medium mt-3">b) Event & Usage Data</h6>
                    <ul className="text-muted">
                        <li>Events created, tickets sold, and attendee data</li>
                        <li>Dashboard activity, logs, and analytics</li>
                    </ul>

                    <h6 className="fw-medium mt-3">c) Payment Information</h6>
                    <p className="text-muted">
                        Payments are processed through secure third-party payment gateways.
                        We do not store your credit/debit card or banking details.
                    </p>
                </section>

                {/* USE OF INFORMATION */}
                <section className="mb-4">
                    <h5 className="fw-semibold">2. How We Use Your Information</h5>
                    <ul className="text-muted">
                        <li>To provide and operate our services</li>
                        <li>To manage events, bookings, and payments</li>
                        <li>To communicate updates, alerts, and support messages</li>
                        <li>To improve platform performance and user experience</li>
                        <li>To prevent fraud and ensure security</li>
                    </ul>
                </section>

                {/* SHARING */}
                <section className="mb-4">
                    <h5 className="fw-semibold">3. Sharing of Information</h5>
                    <p className="text-muted">
                        We do not sell or rent your personal data. We may share information
                        only with:
                    </p>
                    <ul className="text-muted">
                        <li>Payment gateway providers</li>
                        <li>Service providers supporting platform operations</li>
                        <li>Legal authorities when required by law</li>
                    </ul>
                </section>

                {/* SECURITY */}
                <section className="mb-4">
                    <h5 className="fw-semibold">4. Data Security</h5>
                    <p className="text-muted">
                        We implement reasonable technical and organizational measures to
                        protect your personal data. However, no method of transmission or
                        storage is 100% secure, and we cannot guarantee absolute security.
                    </p>
                </section>

                {/* RETENTION */}
                <section className="mb-4">
                    <h5 className="fw-semibold">5. Data Retention</h5>
                    <p className="text-muted">
                        We retain personal data only for as long as necessary to fulfill
                        the purposes outlined in this policy, comply with legal obligations,
                        and resolve disputes.
                    </p>
                </section>

                {/* COOKIES */}
                <section className="mb-4">
                    <h5 className="fw-semibold">6. Cookies & Tracking Technologies</h5>
                    <p className="text-muted">
                        We use cookies and similar technologies to enhance user experience,
                        analyze platform usage, and remember preferences. You can manage
                        cookie settings through your browser.
                    </p>
                </section>

                {/* USER RIGHTS */}
                <section className="mb-4">
                    <h5 className="fw-semibold">7. User Rights</h5>
                    <ul className="text-muted">
                        <li>Access your personal data</li>
                        <li>Request corrections or updates</li>
                        <li>Request account deletion (subject to legal requirements)</li>
                    </ul>
                </section>

                {/* THIRD PARTY */}
                <section className="mb-4">
                    <h5 className="fw-semibold">8. Third-Party Links</h5>
                    <p className="text-muted">
                        Our platform may contain links to third-party websites. We are not
                        responsible for the privacy practices or content of those websites.
                    </p>
                </section>

                {/* CHILDREN */}
                <section className="mb-4">
                    <h5 className="fw-semibold">9. Children’s Privacy</h5>
                    <p className="text-muted">
                        Our services are not intended for users under the age of 18. We do
                        not knowingly collect personal information from minors.
                    </p>
                </section>

                {/* CHANGES */}
                <section className="mb-4">
                    <h5 className="fw-semibold">10. Changes to This Privacy Policy</h5>
                    <p className="text-muted">
                        We may update this Privacy Policy from time to time. Any changes
                        will be posted on this page with an updated date.
                    </p>
                </section>

                {/* CONTACT */}
                <section>
                    <h5 className="fw-semibold">11. Contact Us</h5>
                    <p className="text-muted">
                        If you have any questions about this Privacy Policy, please contact
                        us at:
                        <br />
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
