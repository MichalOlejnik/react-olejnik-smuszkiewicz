import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useRef, useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import AuthContext from "../../store/auth-context";

const AuthForm = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const onHideHandler = () => {
    props.onClose();
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    setValidated(true);

    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    setIsLoading(true);

    if (isLogin) {
      authCtx.loginUser(enteredEmail, enteredPassword);
    } else {
      authCtx.addUser(enteredEmail, enteredPassword);
    }

    props.onClose();
  };

  return (
    <Modal show={props.showAuth} onHide={onHideHandler}>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="Podaj e-mail"
              required
              ref={emailRef}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Hasło</Form.Label>
            <Form.Control
              type="password"
              placeholder="Hasło"
              required
              ref={passwordRef}
            />
          </Form.Group>
          {!isLoading && (
            <Button variant="primary" type="submit">
              {isLogin ? "Zaloguj" : "Zarejestruj"}
            </Button>
          )}
          <Button variant="outline-primary" onClick={switchAuthModeHandler}>
            {isLogin ? "Rejestracja" : "Logowanie"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AuthForm;
