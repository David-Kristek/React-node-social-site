import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";

import AppContainer from "./components/AppContainer";
import Nav from './components/Nav';
import Home from "./pages/Homie"

function App() {
  const [popup, setPopup] = useState<String | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  return (
    <Router>
      <AppContainer popup={popup} setPopup={setPopup} showPopup={showPopup} setShowPopup={setShowPopup}>
        <Nav setPopup={setPopup} setShowPopup={setShowPopup}/>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <p className="text-danger">Nothings 404!</p>
          </Route>
        </Switch>
      </AppContainer>
    </Router>
  );
}

export default App;