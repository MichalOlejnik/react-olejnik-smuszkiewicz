import { useRef, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";

const ProductItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group controlId={"amount_" + props.id}>
        <Form.Control
          size="sm"
          type="number"
          min={1}
          step={1}
          defaultValue={1}
          ref={amountInputRef}
        />
        <Button variant="primary" type="submit">
          Dodaj
        </Button>
      </Form.Group>
    </Form>
  );
};

export default ProductItemForm;
