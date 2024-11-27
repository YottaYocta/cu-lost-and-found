"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "./AuthContext";
import { signOut, User } from "firebase/auth";
import { auth, signInWithGoogle } from "@/firebase";

const LoginLogoutButton = () => {
  const authContext = useAuth();

  const login = () => {
    signInWithGoogle();
  };

  const logout = () => {
    signOut(auth);
  };

  return authContext && authContext.user ? (
    <Button onClick={logout}>Logout</Button>
  ) : (
    <Button onClick={login}>Login</Button>
  );
};

export default LoginLogoutButton;
