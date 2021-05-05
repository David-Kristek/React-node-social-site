import React, { useState } from "react";
import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import { useGlobalContext } from "../../context";
import { googleLogin } from "../../api/auth";
import "../../App.css";
import { login } from "../../api/auth";

interface Props {
  close: () => void;
  setPopup: (str: string) => void;
  setNowLogin: (bl: boolean) => void;
  nowLogin: boolean;
}

function Login({ close, setPopup, nowLogin, setNowLogin }: Props) {
  const { setUser } = useGlobalContext();
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    login({ email, password }).then((res) => {
      if (res?.msg === "success") {
        setUser({
          logged: true,
          name: res.user.name,
          email: res.user.email,
          picture: res.user.picture,
        });
        localStorage.setItem("auth-type", "jwt"); 
        setError(null);
        setPopup("");
      } else {
        setError(res);
      }
      setLoading(false);
    });
  };
  const responseSuccessGoogle = (response: any) => {
    googleLogin(response).then((res) => {
      if (res.msg === "failed") {
        setError(res.error); 
      } else {
        setUser({
          logged: true,
          name: res?.user.name,
          email: res?.user.email,
          picture: res?.user.picture,
        });
        setPopup(""); 
      }
    });
  };
  const responseErrorGoogle = (response: any) => {
    console.log(response);
  };
  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>Log in</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert
          variant="success"
          onClose={() => setNowLogin(false)}
          show={nowLogin}
          dismissible
        >
          Succesfully registered, now login
        </Alert>
        <Alert
          variant="danger"
          onClose={() => setError(null)}
          show={!!error}
          dismissible
        >
          {error}
        </Alert>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              isInvalid={!!error}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              isInvalid={!!error}
            />
          </Form.Group>
          <div className="d-flex justify-content-between">
            <p>
              Dont have account?
              <a
                className="text-primary point"
                onClick={() => {
                  setPopup("register");
                }}
              >
                {" "}
                Register
              </a>
            </p>
            <Button variant="primary submit" type="submit">
              {loading ? (
                <Spinner animation="border" variant="light" />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </Form>
        <h5 className="mt-4 text-center border-top pt-4">
          Continue with google:{" "}
        </h5>
        <div className="center mt-3 mb-3">
          <GoogleLogin
            clientId="236995755291-85hhe3gi2eaofgemhvcbv1horm067upu.apps.googleusercontent.com"
            buttonText="Login in with google"
            onSuccess={responseSuccessGoogle}
            onFailure={responseErrorGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </Modal.Body>
    </div>
  );
}

export default Login;
