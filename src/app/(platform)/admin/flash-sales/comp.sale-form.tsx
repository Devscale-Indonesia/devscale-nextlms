"use client";

import { Course } from "@prisma/client";
import { useActionState } from "react";

import { Button } from "@/components/button";
import { Input, Select } from "@/components/input";

import { createSaleAction } from "./action.create-sale";

interface Props {
  courses: Course[];
}

export const SaleForm = ({ courses }: Props) => {
  const [_, formAction, pending] = useActionState(createSaleAction, null);

  return (
    <form className="space-y-2" action={formAction}>
      <Input name="amount" type="number" placeholder="New Amount" />
      <Select name="courseId">
        {courses.map((course) => {
          return (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          );
        })}
      </Select>
      <Button disabled={pending}>Create Sale</Button>
    </form>
  );
};
