import { useContext, useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import ProductItem from "./ProductItem/ProductItem";
import { Container, Row, Col } from "react-bootstrap";
import AuthContext from "../../store/auth-context";

const SetProductsList = (newProducts) => {

}

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const authCtx = useContext(AuthContext)

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "https://sklepik-olejnik-smuszkie-5edcf-default-rtdb.firebaseio.com/products.json"
      );
      const responseData = await response.json();

      const loadedProducts = [];

      for (const key in responseData) {
        loadedProducts.push({
          id: key,
          desc: responseData[key].desc,
          name: responseData[key].name,
          imagePath: responseData[key].imagePath,
          price: responseData[key].price,
        });
      }

      setProducts(loadedProducts);
    };
    
    fetchProducts();
  }, []);

  const productsList = products.map((product) => (
    <ProductItem
      id={product.id}
      key={product.id}
      name={product.name}
      desc={product.desc}
      price={product.price}
      imagePath={product.imagePath}
    />
  ));
  return (
    <Container>
      <Row>
        <Row xs={1} md={2} className="g-4">
          {productsList}
        </Row>
      </Row>
    </Container>
  );
};

export default ProductsList;
