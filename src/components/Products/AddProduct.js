import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Button, Modal } from "react-bootstrap";
import { useState, useRef } from "react";
import { db } from "../../store/auth-context";
import { collection, setDoc, doc } from "firebase/firestore";

const colRef = collection(db, "products");

export const AddProduct = (props) => {
  const nameInputRef = useRef();
  const descInputRef = useRef();
  const imagePathInputRef = useRef();
  const priceInputRef = useRef();

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    const enteredName = nameInputRef.current.value;
    const enteredDesc = descInputRef.current.value;
    const enteredImagePath = imagePathInputRef.current.value;
    const enteredPrice = priceInputRef.current.value;

    setValidated(true);

    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    setDoc(doc(colRef), {
      name: enteredName,
      desc: enteredDesc,
      imagePath: enteredImagePath,
      price: enteredPrice,
    }).catch((err) => {
      console.log(err.message);
    });

    props.onClose();
  };

  return (
    <Modal show={props.showAddProduct} onHide={props.onClose}>
      <Modal.Body>
        <Form noValidate validated={validated}>
          <Row>
            <Form.Group controlId="validationCustom01">
              <Form.Label>Nazwa</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nazwa"
                ref={nameInputRef}
              />
              <Form.Control.Feedback>Ok!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group controlId="validationCustom02">
              <Form.Label>Opis</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Opis"
                ref={descInputRef}
              />
              <Form.Control.Feedback>Ok!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group controlId="validationCustom03">
              <Form.Label>Zdjęcie (URL)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Zdjęcie"
                ref={imagePathInputRef}
                required
              />
              <Form.Control.Feedback type="invalid">
                Wprowadź URL zdjęcia!
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group controlId="validationCustom04">
              <Form.Label>Cena</Form.Label>
              <Form.Control
                type="number"
                placeholder="Cena"
                ref={priceInputRef}
                required
              />
              <Form.Control.Feedback type="invalid">
                Wprowadź cenę!
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          {/* <Button type="submit" variant="success">
            Zamów
          </Button>
          &nbsp;&nbsp;
          <Button variant="primary" onClick={props.onClose}>
            Zamknij
          </Button> */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.onClose}>
          Zamknij
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Dodaj
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProduct;
