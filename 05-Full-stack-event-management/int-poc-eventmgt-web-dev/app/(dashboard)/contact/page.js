import { Container } from "react-bootstrap";

export const metadata = {
  title: "Contact Us | Eventify",
  description: "Contact Eventify for support, inquiries, or assistance",
};

export default function ContactPage() {
  return (
    <Container fluid>
      <div>
        <h2 className="fw-semibold mb-3">Contact Us</h2>
        <p className="text-muted mb-4">
          We’d love to hear from you. Reach out to us for support, questions,
          or feedback.
        </p>

        <div className="row g-4">
          {/* LEFT INFO */}
          <div className="col-md-5">
            <div className="p-4 border rounded-4 h-100">
              <h5 className="fw-semibold mb-3">Get in Touch</h5>

              <p className="text-muted mb-2">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:support@eventify.com"
                  className="text-decoration-none text-primary"
                >
                  support@eventify.com
                </a>
              </p>

              <p className="text-muted mb-2">
                <strong>Support Hours:</strong>
                <br />
                Monday – Friday, 10:00 AM – 6:00 PM
              </p>

              <p className="text-muted mb-0">
                <strong>Response Time:</strong>
                <br />
                Within 24 business hours
              </p>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="col-md-7">
            <div className="p-4 border rounded-4">
              <h5 className="fw-semibold mb-3">Send Us a Message</h5>

              <form>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder="Write your message here..."
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-primary px-4"
                  disabled
                >
                  Send Message
                </button>

                <p className="text-muted small mt-2 mb-0">
                  * Form submission can be connected to backend later.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
