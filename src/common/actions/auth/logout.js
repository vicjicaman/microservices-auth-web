import React from "react";
import Root from "Root";
import { NavLink } from "react-router-dom";
import { NavItem } from "reactstrap";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import * as Viewer from "Queries/viewer";

const LOGOUT = gql`
  mutation Logout {
    auth {
      logout
    }
  }
`;

export default function() {
  let input;
  const [logout] = useMutation(LOGOUT, {
    refetchQueries: [{ query: Viewer.GET }],
    onCompleted: () => {
      window.location = "/";
    }
  });

  return (
    <NavLink
      className="nav-link"
      to="/auth"
      onClick={e => {
        e.preventDefault();
        logout();
      }}
    >
      Logout
    </NavLink>
  );
}
