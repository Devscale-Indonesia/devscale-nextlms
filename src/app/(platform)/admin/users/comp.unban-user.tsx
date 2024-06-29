"use client";

import { useActionState } from "react";

import { Button } from "@/components/button";

import { unbanUserAction } from "./action.unban";

export const UnbanUser = ({ userId }: { userId: string }) => {
  const [_, formAction, pending] = useActionState(unbanUserAction, null);

  return (
    <form action={formAction}>
      <input name="userId" value={userId} type="hidden" />
      <Button variant="secondary" disabled={pending} size="sm" className="w-fit">
        Unban
      </Button>
    </form>
  );
};
