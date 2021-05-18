import {useState} from "react";
import { Switch, Route } from "react-router-dom";

import AppContainer from "../components/AppContainer";
import Nav from "../components/Nav";
import Navigator from "../components/Navigation";
import Home from "../pages/Home/Home";
import Add from "../pages/AddPost/Add";
import About from "../pages/About/About";
function UserRoutes() {
  const [popup, setPopup] = useState<String | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  return (
    <Switch>
      <AppContainer
        popup={popup}
        setPopup={setPopup}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
      >
        <Nav setPopup={setPopup} setShowPopup={setShowPopup} />
        <Navigator />
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/add">
          <Add setPopup={setPopup} setShowPopup={setShowPopup} />
        </Route>
        <Route path="/chats">
          <About />
        </Route>
        <Route path='*'>
          <p className="text-danger">Nothings 404!</p>
        </Route>
      </AppContainer>
    </Switch>
  );
}

export default UserRoutes;
