"use client";

import React from "react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

type Props = {};

const SignoutButton = (props: Props) => {
  const router = useRouter();
  const signOutHandler = async () => {
    await signOut();
    router.refresh();
  };
  return (
    <Button
    onClick={signOutHandler}
      variant={"destructive"}
      className="mt-auto flex justify-start gap-2 w-full"
    >
      <LogOut className="w-4 h-4" /> signout
    </Button>
  );
};

export default SignoutButton;
