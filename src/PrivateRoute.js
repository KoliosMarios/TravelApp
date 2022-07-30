import React, { useContext } from "react";
import { AuthContext } from "./context/auth";
import { Navigate, Outlet } from "react-router-dom";

//If there is a user logged in you are allowed to continue to the Route that is inside the PrivateRoute,
//otherwise it redirects you to the home page
const PrivateRoute = () => {
  const { user } = useContext(AuthContext);
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
