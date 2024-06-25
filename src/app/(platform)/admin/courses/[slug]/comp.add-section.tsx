import React from "react";

import { Button } from "@/components/button";

import { addSectionAction } from "./action.add-section";

export const AddSectionBtn = ({ courseId }: { courseId: string }) => {
  return (
    <form action={addSectionAction}>
      <input name="courseId" value={courseId} type="hidden" required />
      <Button variant="secondary" size="sm">
        Add Section
      </Button>
    </form>
  );
};
