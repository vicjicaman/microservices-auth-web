import React from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import Home from './home'
import Register from './register'

export default () => (
  <div>
    <Switch>
      <Route path={"/auth"} exact={true} component={Home} />
      <Route path={"/auth/register"} exact={true} component={Register} />
    </Switch>
  </div>
);
