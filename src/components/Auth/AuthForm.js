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
      console.log("tu");
      return;
    }

    setIsLoading(true);
    let url = "";

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDjKLmh1UYeqyMf8sgu1fi-h5Uefm03PbA";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjKLmh1UYeqyMf8sgu1fi-h5Uefm03PbA";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          res.json().then((data) => {
            let errorMessage = "Rejestracja nieudana";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
      })
      .catch((err) => {
        alert(err.message);
      });

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
