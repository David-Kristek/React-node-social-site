import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import AdminPanel from "../pages/Admin/AdminPanel";
import Userlist from "../pages/Admin/AdminPages/Userlist/Userlist";
import Categories from "../pages/Admin/AdminPages/Categories/Categories";
import Posts from "../pages/Admin/AdminPages/Posts/Posts";

function AdminRoutes() {
  let { path, url } = useRouteMatch();

  return (
    <div>
      <AdminPanel>
        <Switch>
          <Route exact path={path}>
            <Userlist />
          </Route>
          <Route exact path={`${path}/categories`}>
            <Categories />
          </Route>
          <Route exact path={`${path}/posts`}>
            <Posts />
          </Route>
        </Switch>
      </AdminPanel>
    </div>
  );
}

export default AdminRoutes;
