import React, { ReactNode, useState, useRef } from "react";
import { Modal, Button } from "react-bootstrap";

import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import AddCategory from "../components/popups/Addcategory";

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
  const loginPopup = useRef<React.MutableRefObject<null>>(null);
  const close = () => {
    // if(loginPopup.current) loginPopup.current.onHide = false; 
    setShowPopup(false);
  };
  //useRef !!!
  if (popup) {
    return (
      <>
        <Modal show={showPopup} onHide={close} ref={loginPopup}>
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
          {popup === "addCategory" && (
            <AddCategory close={close} setPopup={setPopup} />
          )}
        </Modal>
        {children}
      </>
    );
  } else {
    return <> {children}</>;
  }
}

export default AppContainer;
