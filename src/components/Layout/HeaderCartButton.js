import { NavLink } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const HeaderCartButton = (props) => {
  return (
    <NavLink>
      <span>Koszyk </span>
      <span className="badge">3</span>       
    </NavLink>
  );
};

export default HeaderCartButton;
