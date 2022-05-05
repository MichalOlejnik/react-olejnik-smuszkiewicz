import { Container, Row } from "react-bootstrap";
import Header from "./components/Layout/Header";
import ProductsList from "./components/Products/ProductsList";
import CartProvider from "./store/CartProvider";
//oadngfa
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
