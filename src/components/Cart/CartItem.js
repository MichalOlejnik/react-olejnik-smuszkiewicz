import "bootstrap/dist/css/bootstrap.min.css";
import { Badge, Button, ListGroup } from "react-bootstrap";

const CartItem = (props) => {
  const price = `${props.price.toFixed(2)} zł`;

  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-start">
      <div className="ms-2 me-auto">
        <div className="fw-bold">{props.name}</div>
        <small>{price}</small>
      </div>
      <h4>
        <Badge bg="secondary">x {props.amount}</Badge>
        <Button onClick={props.onRemove} size="sm" variant="outline-danger">
          −
        </Button>
        <Button onClick={props.onAdd} size="sm" variant="outline-success">
          +
        </Button>
      </h4>
    </ListGroup.Item>
  );
};

export default CartItem;
