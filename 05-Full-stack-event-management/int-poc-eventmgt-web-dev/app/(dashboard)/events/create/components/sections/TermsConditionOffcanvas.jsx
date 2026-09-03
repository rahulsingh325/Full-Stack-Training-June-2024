import { Offcanvas, Button, Card } from "react-bootstrap";
import { useFormContext, Controller } from "react-hook-form";
import { Editor, EditorProvider } from "react-simple-wysiwyg";

export default function TermsConditionOffcanvas({ show, onHide }) {
  const {
    control,
    getValues,
    formState: { errors },
  } = useFormContext();

  return (
    <EditorProvider>
      <Offcanvas
        show={show}
        onHide={onHide}
        placement="end"
        style={{ width: "50%" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Terms & Conditions</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <Card className="p-3 mb-3">
            <label className="fw-semibold mb-2">
              Event Terms & Conditions <span className="text-danger">*</span>
            </label>

            <Controller
              name="terms_conditions"
              control={control}
              render={({ field }) => (
                <Editor
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="Write event terms & conditions here..."
                />
              )}
            />

            {errors?.terms_conditions && (
              <div className="text-danger small mt-2">
                {errors.terms_conditions.message}
              </div>
            )}
          </Card>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>

            <Button
              onClick={() => {
                console.log(
                  "TERMS SAVED:",
                  getValues("terms_conditions")
                );
                onHide();
              }}
            >
              Save Terms
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </EditorProvider>
  );
}
