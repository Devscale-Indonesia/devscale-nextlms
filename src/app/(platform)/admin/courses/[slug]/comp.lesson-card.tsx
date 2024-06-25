import { Lesson } from "@prisma/client";

import { Button } from "@/components/button";
import { Card } from "@/components/card";

import { deleteLessonAction } from "./action.delete-lesson";

interface Props {
  lesson: Lesson;
}
export const LessonCard = ({ lesson }: Props) => {
  return (
    <Card className="p-2">
      <section className="flex items-center justify-between">
        <div className="ml-2 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="M8 6h.006M8 12h.006M8 18h.006m7.988-12H16m-.006 6H16m-.006 6H16"
              color="currentColor"
            ></path>
          </svg>
          <div>{lesson.title}</div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" className="w-fit">
            Edit
          </Button>
          <form action={deleteLessonAction}>
            <input name="lessonId" value={lesson.id} type="hidden" />
            <Button size="sm" variant="secondary" className="w-fit">
              Delete
            </Button>
          </form>
        </div>
      </section>
    </Card>
  );
};
