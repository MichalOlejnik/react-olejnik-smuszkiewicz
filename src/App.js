import { Container, Row } from "react-bootstrap";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import ProductsList from "./components/Products/ProductsList";
import CartProvider from "./store/CartProvider";

function App() {
  return (
    <CartProvider>
      <Row>
        <Header />
      </Row>
      <Container>
        <Row>
          <ProductsList />
        </Row>
      </Container>
    </CartProvider>
  );
}

export default App;
