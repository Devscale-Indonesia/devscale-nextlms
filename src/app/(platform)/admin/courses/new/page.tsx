"use client";

import Image from "next/image";
import React, { ChangeEvent, useActionState, useState } from "react";

import { Button } from "@/components/button";
import { FileInput } from "@/components/file-input";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";

import { createCourseAction } from "./action";

export default function Page() {
  const [preview, setPreview] = useState("");
  const [state, formAction, pending] = useActionState(createCourseAction, null);

  function handleCreatePreview(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;

    const file = event.target.files[0];
    setPreview(URL.createObjectURL(file));
  }

  return (
    <main className="m-auto max-w-lg space-y-6">
      <section>
        <h3>Create new course</h3>
      </section>
      <section>
        <form action={formAction} className="space-y-2">
          {preview ? <Image src={preview} width={800} height={300} alt="Course cover" className="rounded-lg" /> : null}
          <FileInput name="coverImage" placeholder="Choose the course cover" onChange={handleCreatePreview} />
          <Input name="title" placeholder="Course title" />
          <Textarea name="description" placeholder="Course descriptions" />
          <Input name="price" placeholder="Course prices" />
          <Button disabled={pending}>Save Draft</Button>
          {state?.status === "error" && state.errors?.title ? <div className="msg msg-error">{state.errors.title}</div> : null}
          {state?.status === "error" && state.errors?.description ? (
            <div className="msg msg-error">{state.errors.description}</div>
          ) : null}
          {state?.status === "error" && state.errors?.price ? <div className="msg msg-error">{state.errors.price}</div> : null}
          {state?.status === "error" && state.message !== "" ? <div className="msg msg-error">{state.message}</div> : null}
        </form>
      </section>
    </main>
  );
}
