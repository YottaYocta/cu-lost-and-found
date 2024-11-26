"use client";
import { Button } from "@/components/ui/button";
import { signOut, User } from "firebase/auth";
import { auth, signInWithGoogle } from "@/firebase";
import { AuthProvider, useAuth } from "./(components)/AuthContext";
import { useState } from "react";
import AuthIndicatorTest from "./(components)/AuthIndicatorTest";

export default function Home() {
  const login = () => {
    signInWithGoogle();
  };

  const logout = () => {
    signOut(auth);
  };

  return (
    <div>
      <AuthProvider>
        <Button onClick={login}>Login</Button>
        <Button onClick={logout}>Logout</Button>
        <AuthIndicatorTest></AuthIndicatorTest>
      </AuthProvider>
    </div>
  );
}
