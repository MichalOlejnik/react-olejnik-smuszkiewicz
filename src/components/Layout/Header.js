import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useContext } from "react";
import Cart from "../Cart/Cart";
import CartContext from "../../store/cart-context";

const Header = (props) => {
  const cartCtx = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const handleCloseCart = () => setShowCart(false);
  const handleOpenCart = () => setShowCart(true);

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Sklepik</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Produkty</Nav.Link>
              <Nav.Link onClick={handleOpenCart}>
                Koszyk <Badge bg="secondary">{numberOfCartItems}</Badge>
              </Nav.Link>
            </Nav>
            <Nav className="justify-content-end">
              <NavDropdown title="Profil" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Zaloguj</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Zarejestruj</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.3">Wyloguj</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Cart showCart={showCart} onClose={handleCloseCart} />
    </div>
  );
};

export default Header;
