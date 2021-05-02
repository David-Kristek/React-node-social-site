import React, { ReactNode, useState } from "react";
import { Modal, Button } from "react-bootstrap";

import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Navigator from "./Navigation";

interface Props {
  children: ReactNode;
  popup: String | null;
  setPopup: (str: string | null) => void;
  setShowPopup: (bl: boolean) => void;
  showPopup: boolean;
}
function AppContainer({
  children,
  popup,
  setPopup,
  showPopup,
  setShowPopup,
}: Props) {
  const [nowLogin, setNowLogin] = useState(false);
  const close = () => {
    setShowPopup(false);
  };
  if (popup) {
    return (
      <>
        <Navigator />
        <Modal show={showPopup} onHide={close}>
          {popup === "login" && (
            <Login
              close={close}
              setPopup={setPopup}
              nowLogin={nowLogin}
              setNowLogin={setNowLogin}
            />
          )}
          {popup === "register" && (
            <Register
              close={close}
              setPopup={setPopup}
              setNowLogin={setNowLogin}
            />
          )}
        </Modal>
        {children}
      </>
    );
  } else {
    return (
      <>
        {" "}
        <Navigator />
        {children}
      </>
    );
  }
}

export default AppContainer;
