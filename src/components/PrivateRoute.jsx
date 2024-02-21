import React from 'react'
import { Navigate, Outlet } from 'react-router';

export default function PrivateRoute() {
    const loggedIn = false;
  return loggedIn? <Outlet/> : <Navigate to="/sign-in"/>
}
