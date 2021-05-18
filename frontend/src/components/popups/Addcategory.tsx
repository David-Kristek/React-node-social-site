import React, { useState } from "react";
import { Modal, Button, Alert, Spinner, Form } from "react-bootstrap";
import "../../App.css";
import { addCategory } from "../../api/category";
interface Props {
  close: () => void;
  setPopup: (str: string | null) => void;
}
function AddCategory({ close, setPopup }: Props) {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState(false);
  const [sucAlert, setSucAlert] = useState<string>()
  const delay = (delay: number) => {
    return new Promise(res => setTimeout(res, delay)); 
  }; 

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    addCategory({ name }).then((res) => {
      console.log(res);
      if (res.msg) {
        setError(null);
        //delay 5s s popupem succes kategorie pridana ke schvaleni
        setSucAlert("Váš návrh na kategorii byl poslán ke schválení"); 
        delay(5000).then(res => {
          setPopup("");
        })
      } else if (res.err) {
        setError(res.err);
      } else {
        setError("Something went wrong");
      }
      setLoading(false);
    });
  };

  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>Add category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert
          variant="danger"
          onClose={() => setError(null)}
          show={!!error}
          dismissible
        >
          {error}
        </Alert>
        <Alert
          variant="success"
          onClose={() => setSucAlert("")}
          show={!!sucAlert}
          dismissible
        >
          {sucAlert}
        </Alert>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name of category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name of category"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              isInvalid={!!error}
            />
          </Form.Group>
          <Button variant="primary submit" type="submit">
            {loading ? (
              <Spinner animation="border" variant="light" />
            ) : (
              "Submit"
            )}
          </Button>
        </Form>
      </Modal.Body>
    </div>
  );
}

export default AddCategory;
