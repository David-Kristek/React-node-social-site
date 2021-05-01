import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import { googleLogin } from "../../api/auth";
import { register } from "../../api/auth";

interface Props {
  close: () => void;
  setPopup: (str: string) => void;
}
const responseSuccessGoogle = (response: any) => {
  googleLogin(response);
};
const responseErrorGoogle = (response: any) => {
  console.log(response);
};

function Register({ close, setPopup }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConf] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    register({ name, password, email, password_confirmation }).then((res) => {
      console.log(res);
      //setError | history.push("/")
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
          onClose={() => setError(null)}
          show={!!error}
          dismissible
        >
          {error}
        </Alert>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              isInvalid={error?.includes("name")}
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
              isInvalid={email?.includes("name")}
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
              isInvalid={"password" in errors}
            />
            {"password" in errors && (
              <Form.Control.Feedback type="invalid">
                {/* {errors.password} */}
              </Form.Control.Feedback>
            )}
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
              isInvalid={"password" in errors}
            />
            {"password" in errors && (
              <Form.Control.Feedback type="invalid">
                {/* {errors.password} */}
              </Form.Control.Feedback>
            )}
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
            <Button variant="primary" type="submit">
              {loading ? "Loading" : "Submit"}
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
