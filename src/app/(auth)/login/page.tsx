"use client";

import Link from "next/link";
import { useActionState } from "react";

import { Button } from "@/components/button";
import { Input } from "@/components/input";

import { loginAction } from "./action";

export default function Page() {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <>
      <section>
        <h3>Login</h3>
        <p>Welcome back!</p>
      </section>
      <form action={formAction} className="space-y-2">
        <Input name="email" placeholder="Email" defaultValue={state?.data?.email} />
        <Input name="password" placeholder="Password" type="password" defaultValue={state?.data?.password} />
        <Button disabled={pending}>Login</Button>
        {state?.status === "error" && state.errors?.email ? <div className="msg msg-error">{state.errors.email}</div> : null}
        {state?.status === "error" && state.errors?.password ? <div className="msg msg-error">{state.errors.password}</div> : null}
        {state?.status === "success" && state.message !== "" ? <div className="msg msg-success">{state.message}</div> : null}
        {state?.status === "error" && state.message !== "" ? <div className="msg msg-error">{state.message}</div> : null}
      </form>
      <section>
        <p>
          Don&apos;t have an account ? <Link href="/register">Register</Link>
        </p>
      </section>
    </>
  );
}
