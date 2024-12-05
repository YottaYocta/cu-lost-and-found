import { Button } from "@/components/ui/button";
import { useAuth } from "./AuthContext";
import { signInWithGoogle } from "@/firebase";
import { HTMLAttributes, PropsWithChildren } from "react";
import { Card } from "@/components/ui/card";

import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import {
  DialogPortal,
  DialogOverlay,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface AuthenticatedModalProps {
  modalTriggerText: string;
}

export const AuthenticatedModal = ({
  modalTriggerText,
  children,
  className,
}: AuthenticatedModalProps &
  PropsWithChildren &
  HTMLAttributes<HTMLButtonElement>) => {
  const authContext = useAuth();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={`min-w-36 ${className}`}>{modalTriggerText}</Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="flex items-center justify-center w-screen h-screen">
          <DialogContent>
            {authContext && authContext.user ? (
              children
            ) : (
              <Card className="flex flex-col items-center p-8 gap-4">
                <DialogHeader>
                  <DialogTitle>
                    <p className="text-4xl font-normal">
                      You must sign in to continue
                    </p>
                  </DialogTitle>
                </DialogHeader>
                <Button
                  className="w-full flex flex-row items-center gap-4"
                  onClick={signInWithGoogle}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="32"
                    height="32"
                  >
                    <path d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z"></path>
                  </svg>

                  <p className="text-lg">Sign in with Google</p>
                </Button>
              </Card>
            )}
          </DialogContent>
        </DialogOverlay>
      </DialogPortal>
    </Dialog>
  );
};
