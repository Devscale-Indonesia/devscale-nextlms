import React from "react";

import { Button } from "@/components/button";

import { loginWithGoogleAction } from "./action.social-login";

export const SocialLoginBtn = () => {
  return (
    <form action={loginWithGoogleAction}>
      <Button variant="secondary">Continue with Google</Button>
    </form>
  );
};
