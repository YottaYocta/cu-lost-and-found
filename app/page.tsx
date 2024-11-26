"use client";
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/firebase";

export default function Home() {
  return (
    <div>
      <Button onClick={signInWithGoogle}></Button>
    </div>
  );
}
