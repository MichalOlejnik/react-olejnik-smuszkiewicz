import { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import ProductItem from "./ProductItem/ProductItem";
import { Container, Row } from "react-bootstrap";
import { db } from "../../store/auth-context";
import { collection, getDocs } from "firebase/firestore";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const colRef = collection(db, "products");

  useEffect(() => {
    const getProducts = () => {
      const products = [];
      getDocs(colRef)
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            products.push({ ...doc.data(), id: doc.id });
          });
          setProducts(products);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    getProducts();
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
