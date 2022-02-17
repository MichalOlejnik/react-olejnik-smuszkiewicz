import { useContext, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, ListGroup, Modal } from "react-bootstrap";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `${cartCtx.totalAmount.toFixed(2)} zł`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const showCheckout = () => {
    setIsCheckout(true);
  };

  const hideCheckout = () => {
    setIsCheckout(false)
  }

  const submitOrderHandler = (userData) => {
    fetch(
      "https://sklepik-olejnik-smuszkie-5edcf-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
  };

  const onHideHandler = () => {
    props.onClose()
    hideCheckout()
  }

  const cartItems = (
    <ListGroup>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ListGroup>
  );
  return (
    <Modal show={props.showCart} onHide={onHideHandler}>
      <Modal.Body>
        {cartItems}
        <hr />
        <strong>Suma: </strong>
        <span>{totalAmount}</span>
      </Modal.Body>
      {isCheckout && (
        <Modal.Body>
          <hr />
          <Checkout onClose={onHideHandler} onSubmit={submitOrderHandler} />
        </Modal.Body>
      )}
      {!isCheckout && (
        <Modal.Footer>
          <Button variant="primary" onClick={props.onClose}>
            Zamknij
          </Button>
          {hasItems && (
            <Button variant="success" onClick={showCheckout}>
              Zamów
            </Button>
          )}
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default Cart;
