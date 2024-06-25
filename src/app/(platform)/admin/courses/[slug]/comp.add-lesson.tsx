import React from "react";

import { Button } from "@/components/button";

import { addLessonAction } from "./action.add-lesson";

export const AddLessonBtn = ({ sectionId }: { sectionId: string }) => {
  return (
    <form action={addLessonAction}>
      <input name="sectionId" value={sectionId} type="hidden" />
      <Button size="sm" className="w-fit">
        Add lesson
      </Button>
    </form>
  );
};
