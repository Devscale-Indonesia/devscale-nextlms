"use client";

import { Draggable } from "@hello-pangea/dnd";
import { Lesson } from "@prisma/client";
import { useSetAtom } from "jotai";

import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { lessonDetailAtom, openLessonEditModalAtom } from "@/context/atom";

import { deleteLessonAction } from "./action.delete-lesson";
import { markAsPreviewAction, unmarkAsPreviewAction } from "./action.mark-free";

interface Props {
  lesson: Lesson;
  index: number;
}
export const LessonCard = ({ lesson, index }: Props) => {
  const setOpenModal = useSetAtom(openLessonEditModalAtom);
  const setLessonDetail = useSetAtom(lessonDetailAtom);

  return (
    <Draggable draggableId={lesson.id} index={index}>
      {(draggableProvider) => {
        return (
          <Card className="p-2" {...draggableProvider.draggableProps} ref={draggableProvider.innerRef}>
            <section className="flex items-center justify-between">
              <div className="ml-2 flex items-center gap-2">
                <div {...draggableProvider.dragHandleProps}>
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
                </div>
                <div>{lesson.title}</div>
              </div>
              <div className="flex gap-2">
                {!lesson.isPreview ? (
                  <form action={markAsPreviewAction}>
                    <input name="lessonId" value={lesson.id} type="hidden" />
                    <Button size="sm" variant="secondary" className="w-fit">
                      Mark as preview
                    </Button>
                  </form>
                ) : (
                  <form action={unmarkAsPreviewAction}>
                    <input name="lessonId" value={lesson.id} type="hidden" />
                    <Button size="sm" variant="secondary" className="w-fit">
                      Unmark as preview
                    </Button>
                  </form>
                )}
                <Button
                  onClick={() => {
                    setOpenModal(true);
                    setLessonDetail(lesson);
                  }}
                  size="sm"
                  variant="secondary"
                  className="w-fit"
                >
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
      }}
    </Draggable>
  );
};
