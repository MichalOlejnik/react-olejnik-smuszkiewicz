import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useState, useRef } from "react";

const Checkout = (props) => {
  const fNameInputRef = useRef();
  const lNameInputRef = useRef();
  const cityInputRef = useRef();
  const streetInputRef = useRef();
  const codeInputRef = useRef();

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    const enteredFName = fNameInputRef.current.value;
    const enteredLName = lNameInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCode = codeInputRef.current.value;

    setValidated(true);

    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    props.onSubmit({
      fName: enteredFName,
      lName: enteredLName,
      city: enteredCity,
      street: enteredStreet,
      code: enteredCode,
    });

    props.onClose();
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Imię</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Imię"
            ref={fNameInputRef}
          />
          <Form.Control.Feedback>Ok!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Nazwisko</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Nazwisko"
            ref={lNameInputRef}
          />
          <Form.Control.Feedback>Ok!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Miasto</Form.Label>
          <Form.Control
            type="text"
            placeholder="Miasto"
            ref={cityInputRef}
            required
          />
          <Form.Control.Feedback type="invalid">
            Wprowadź miasto!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>Ulica i nr</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ulica i nr"
            ref={streetInputRef}
            required
          />
          <Form.Control.Feedback type="invalid">
            Wprowadź ulicę i nr!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Kod pocz.</Form.Label>
          <Form.Control
            type="text"
            placeholder="Kod"
            ref={codeInputRef}
            required
          />
          <Form.Control.Feedback type="invalid">
            Wprowadź kod pocztowy!
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Akceptuję warunki"
          feedback="Wymagane"
          feedbackType="invalid"
        />
      </Form.Group>
      <Button type="submit" variant="success">
        Zamów
      </Button>
      &nbsp;&nbsp;
      <Button variant="primary" onClick={props.onClose}>
        Zamknij
      </Button>
    </Form>
  );
};

export default Checkout;
