"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "./AuthContext";
import { signOut } from "firebase/auth";
import { auth, signInWithGoogle } from "@/firebase";
import { HTMLAttributes } from "react";

const LoginLogoutButton = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  const authContext = useAuth();

  const login = () => {
    signInWithGoogle();
  };

  const logout = () => {
    signOut(auth);
  };

  return authContext && authContext.user ? (
    <Button className={className} onClick={logout}>
      Logout
    </Button>
  ) : (
    <Button className={className} onClick={login}>
      Login
    </Button>
  );
};

export default LoginLogoutButton;
