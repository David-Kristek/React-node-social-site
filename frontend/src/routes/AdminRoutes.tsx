import React from "react";
import { Switch, Route } from "react-router-dom";

import AdminPanel from "../pages/Admin/AdminPanel";
import Userlist from "../pages/Admin/AdminPages/Userlist";
function AdminRoutes() {
  return (
    <div>
      <AdminPanel>
        <Route path="/admin">
          <Userlist />
        </Route>
      </AdminPanel>
    </div>
  );
}

export default AdminRoutes;
