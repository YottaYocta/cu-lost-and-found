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
              <Card className="flex flex-col items-center p-8 gap-32">
                <DialogHeader>
                  <p className="text-4xl">You must sign in to continue</p>
                </DialogHeader>
                <Button className="w-full" onClick={signInWithGoogle}>
                  Sign in with Google
                </Button>
              </Card>
            )}
          </DialogContent>
        </DialogOverlay>
      </DialogPortal>
    </Dialog>
  );
};
