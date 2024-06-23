"use client";

import Link from "next/link";
import { useActionState } from "react";

import { Button } from "@/components/button";
import { Input } from "@/components/input";

import { registerAction } from "./action";

export default function Page() {
  const [state, formAction, pending] = useActionState(registerAction, null);
  console.log(state);

  return (
    <>
      <section>
        <h3>Register</h3>
        <p>Create an account to get started</p>
      </section>
      <form action={formAction} className="space-y-2">
        <Input name="name" placeholder="Name" defaultValue={state?.data?.name} />
        <Input name="email" placeholder="Email" defaultValue={state?.data?.email} />
        <Input name="password" placeholder="Password" type="password" defaultValue={state?.data?.password} />
        <Button disabled={pending}>Register</Button>
        {state?.status === "error" && state.errors?.name ? <div className="msg msg-error">{state.errors.name}</div> : null}
        {state?.status === "error" && state.errors?.email ? <div className="msg msg-error">{state.errors.email}</div> : null}
        {state?.status === "error" && state.errors?.password ? <div className="msg msg-error">{state.errors.password}</div> : null}
        {state?.status === "success" ? <div className="msg msg-success">{state.message}</div> : null}
      </form>
      <section>
        <p>
          Have an account ? <Link href="/login">Login</Link>
        </p>
      </section>
    </>
  );
}
