import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import { useState, useRef } from "react";

const Checkout = props => {
    const fNameInputRef = useRef()
    const lNameInputRef = useRef()
    const cityInputRef = useRef()
    const streetInputRef = useRef()
    const codeInputRef = useRef()

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      setValidated(true);
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
            />
            <Form.Control.Feedback>Ok!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Nazwisko"
            />
            <Form.Control.Feedback>Ok!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Miasto</Form.Label>
            <Form.Control type="text" placeholder="Miasto" required />
            <Form.Control.Feedback type="invalid">
              Wprowadź miasto!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>Ulica i nr</Form.Label>
            <Form.Control type="text" placeholder="Ulica i nr" required />
            <Form.Control.Feedback type="invalid">
              Wprowadź ulicę i nr!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label>Kod pocz.</Form.Label>
            <Form.Control type="text" placeholder="Kod" required />
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
        
        <Button type="submit" variant="success">Zamów</Button>
        &nbsp;&nbsp;
        <Button variant="primary" onClick={props.onClose}>Zamknij</Button>
      </Form>
    );}

export default Checkout