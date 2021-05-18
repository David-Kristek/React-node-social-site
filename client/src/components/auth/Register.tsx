import React, { useState } from "react";
import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import { googleLogin } from "../../api/auth";
import { register } from "../../api/auth";
import "../../App.css";

interface Props {
  close: () => void;
  setPopup: (str: string) => void;
  setNowLogin: (bl: boolean) => void;
}
const responseSuccessGoogle = (response: any) => {
  googleLogin(response);
};
const responseErrorGoogle = (response: any) => {
  console.log(response);
};

function Register({ close, setPopup, setNowLogin }: Props) {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConf] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    register({ name, password, email, password_confirmation }).then((res) => {
      if (res === "now login") {
        // history.push("/")
        setNowLogin(true);
        setPopup("login");
      } else {
        console.log(res);
        setError(res);
      }
      setLoading(false);
    });
  };
  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert
          variant="danger"
          onClose={() => setError("")}
          show={!!error}
          dismissible
        >
          {error}
        </Alert>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              isInvalid={error.includes("name")}
            />
          </Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              isInvalid={error.includes("email") || error.includes("Email")}
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
              isInvalid={error.includes("password")}
            />
          </Form.Group>
          <Form.Group controlId="formPasswordConfirmation">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Repeat password"
              value={password_confirmation}
              onChange={(e) => {
                setPasswordConf(e.target.value);
              }}
              isInvalid={error.includes("password")}
            />
          </Form.Group>

          <div className="d-flex justify-content-between">
            <p>
              Already have account?
              <a
                className="text-primary point"
                onClick={() => {
                  setPopup("login");
                }}
              >
                {" "}
                Login
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

export default Register;
