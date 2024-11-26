"use client";
import { useContext } from "react";
import { useAuth } from "./AuthContext";

const AuthIndicatorTest = () => {
  const authContext = useAuth();
  return authContext && authContext.user ? (
    <p>You are logged in as {authContext.user.uid}</p>
  ) : (
    <p>You are not logged in</p>
  );
};

export default AuthIndicatorTest;
