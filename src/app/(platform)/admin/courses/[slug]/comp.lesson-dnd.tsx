"use client";

import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { Lesson, Section } from "@prisma/client";
import { startTransition, useOptimistic } from "react";

import { updateLessonsIndex } from "./action.update-lesson-index";
import { LessonCard } from "./comp.lesson-card";

interface Props {
  section: Section & { lessons: Lesson[] };
}

export const Lessons = ({ section }: Props) => {
  const [optimisticState, setOptimisticState] = useOptimistic(section.lessons);

  async function onDragEnd(result: DropResult) {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const newLessons = [...section.lessons];
    const [movedLesson] = newLessons.splice(sourceIndex, 1);
    newLessons.splice(destinationIndex, 0, movedLesson);

    const reorderedLessons = newLessons.map((lesson, index) => ({
      ...lesson,
      index,
    }));

    startTransition(() => {
      setOptimisticState(reorderedLessons);
    });

    const formData = new FormData();
    formData.append("sourceIndex", sourceIndex.toString());
    formData.append("destinationIndex", destinationIndex.toString());
    formData.append("sectionId", section.id);

    await updateLessonsIndex(formData);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lessons">
        {(droppableProvided) => {
          return (
            <section className="space-y-2 bg-slate-50 p-2" {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
              {optimisticState.map((lesson, index) => {
                return <LessonCard key={lesson.id} lesson={lesson} index={index} />;
              })}
              {droppableProvided.placeholder}
            </section>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};
