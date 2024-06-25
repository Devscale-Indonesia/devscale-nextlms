"use client";

import { Draggable } from "@hello-pangea/dnd";
import { Lesson, Section } from "@prisma/client";
import { useSetAtom } from "jotai";

import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { openSectionEditModalAtom, sectionDetailAtom } from "@/context/atom";

import { deleteSectionAction } from "./action.delete-section";
import { AddLessonBtn } from "./comp.add-lesson";
import { Lessons } from "./comp.lesson-dnd";

interface Props {
  section: Section & { lessons: Lesson[] };
  index: number;
}

export const SectionCard = ({ section, index }: Props) => {
  const setOpenModal = useSetAtom(openSectionEditModalAtom);
  const setSectionDetail = useSetAtom(sectionDetailAtom);

  return (
    <Draggable draggableId={section.id} index={index}>
      {(draggableProvider) => {
        return (
          <Card key={section.id} className="p-0" {...draggableProvider.draggableProps} ref={draggableProvider.innerRef}>
            <section className="flex items-center justify-between p-2">
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
                <div>{section.title}</div>
              </div>
              <div className="m-0 flex gap-2">
                <Button
                  onClick={() => {
                    setOpenModal(true);
                    setSectionDetail(section);
                  }}
                  size="sm"
                  variant="secondary"
                  className="w-fit"
                >
                  Edit
                </Button>
                <form action={deleteSectionAction}>
                  <input name="sectionId" value={section.id} type="hidden" />
                  <Button disabled={section.lessons.length > 0} size="sm" variant="secondary" className="w-fit">
                    Delete
                  </Button>
                </form>
                <AddLessonBtn sectionId={section.id} />
              </div>
            </section>
            <Lessons section={section} />
          </Card>
        );
      }}
    </Draggable>
  );
};
