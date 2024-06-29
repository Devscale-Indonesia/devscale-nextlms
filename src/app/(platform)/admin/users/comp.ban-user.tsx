"use client";

import { useActionState } from "react";

import { Button } from "@/components/button";

import { banUserAction } from "./action.ban";

export const BanUser = ({ userId }: { userId: string }) => {
  const [_, formAction, pending] = useActionState(banUserAction, null);

  return (
    <form action={formAction}>
      <input name="userId" value={userId} type="hidden" />
      <Button variant="danger" disabled={pending} size="sm" className="w-fit">
        Ban
      </Button>
    </form>
  );
};
