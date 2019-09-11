import React from "react";
import Root from "Root";
import { NavLink } from "react-router-dom";
import { NavItem } from "reactstrap";
import { Query } from "react-apollo";
import * as Viewer from "Queries/viewer"

import Logout from 'Actions/auth/logout'

const App = () => {
  return (
    <Query
      query={Viewer.GET}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;

        const { viewer } = data;

        return (
          <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
              <a className="navbar-brand" href="#">
                µservices
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarCollapse"
                aria-controls="navbarCollapse"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item ">
                    <a className="nav-link" href="#">
                      Home
                    </a>
                  </li>
                </ul>
              </div>
              <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <NavItem>
                      {viewer.id === null ? (
                        <NavLink className="nav-link" to="/auth">
                          Login
                        </NavLink>
                      ) : (
                        <Logout/>
                      )}
                    </NavItem>
                  </li>
                </ul>
              </div>
            </nav>

            <main role="main" className="container">
              <Root viewer={viewer} />
            </main>
          </div>
        );
      }}
    </Query>
  );
};

export default App;
