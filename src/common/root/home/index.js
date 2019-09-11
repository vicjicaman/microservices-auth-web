import React from "react";
import { Route, NavLink, Switch, Link } from "react-router-dom";
import Login from 'Actions/auth/login'

export default ({history}) => (
  <div>
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-header">Login</div>
          <div className="card-body">
            <Login />
          </div>
          <div className="card-footer">
          <Link to="/auth/register">
            register
          </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);
