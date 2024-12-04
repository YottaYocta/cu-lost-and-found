import { Button } from "@/components/ui/button";
import { useAuth } from "./AuthContext";
import Link from "next/link";
import { signInWithGoogle } from "@/firebase";
import { PropsWithChildren } from "react";

interface LoginOrRedirectProps {
  href: string;
}

export const LoginOrRedirectButton = ({
  href,
  children,
}: LoginOrRedirectProps & PropsWithChildren) => {
  const authContext = useAuth();
  return authContext && authContext.user ? (
    <Link href={href}>
      <Button>{children}</Button>{" "}
    </Link>
  ) : (
    <Button onClick={signInWithGoogle}>{children}</Button>
  );
};
