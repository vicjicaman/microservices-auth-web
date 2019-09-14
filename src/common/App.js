import React from "react";
import Root from "Root";
import { NavLink } from "react-router-dom";
import { NavItem } from "reactstrap";
import { Query } from "react-apollo";
import * as Viewer from "Queries/viewer";

import Logout from "Actions/auth/logout";
import { Layout } from "@nebulario/microservice-layout";

const App = () => {
  return (
    <Query query={Viewer.GET}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;

        const { viewer } = data;

        return (
          <div>
            <Layout
              viewer={viewer}
              login={
                <NavItem>
                  <NavLink to="/auth">Login</NavLink>
                </NavItem>
              }
              logout={<Logout />}
            >
              <Root viewer={viewer} />
            </Layout>
          </div>
        );
      }}
    </Query>
  );
};

export default App;
