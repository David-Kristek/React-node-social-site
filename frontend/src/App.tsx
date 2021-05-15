import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin">
          <AdminRoutes />
        </Route>
        <Route>
          <UserRoutes />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
