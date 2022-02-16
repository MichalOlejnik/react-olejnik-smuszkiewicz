import { useContext } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import ProductItemForm from "./ProductItemForm";
import CartContext from "../../../store/cart-context";

const ProductItem = (props) => {
  const CartCtx = useContext(CartContext)

  const addToCartHandler = amount => {
    CartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    })
  }

  return (
    <Card style={{ width: '18rem' }} >
    <Card.Img variant="top" src={props.imagePath} />
    <Card.Body style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <Card.Title>{props.name}</Card.Title>
      <Card.Subtitle>{props.price}</Card.Subtitle>
      <Card.Text>
        {props.desc}
      </Card.Text>
      <ProductItemForm id={props.id} onAddToCart={addToCartHandler}/>
    </Card.Body>
  </Card>
  );
};

export default ProductItem;
