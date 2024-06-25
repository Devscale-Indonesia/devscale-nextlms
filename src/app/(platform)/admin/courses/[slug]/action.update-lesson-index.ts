"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/utils/prisma";

export async function updateLessonsIndex(formData: FormData) {
  const sectionId = formData.get("sectionId") as string;
  const sourceIndex = Number(formData.get("sourceIndex"));
  const destinationIndex = Number(formData.get("destinationIndex"));

  const allLessons = await prisma.lesson.findMany({
    where: {
      sectionId,
    },
    orderBy: {
      index: "asc",
    },
  });

  const newLessons = [...allLessons];
  const [movedLesson] = newLessons.splice(sourceIndex, 1);
  newLessons.splice(destinationIndex, 0, movedLesson);

  const updatedLessons = newLessons.map((lesson, index) => ({
    ...lesson,
    index,
  }));

  const updatePromises = updatedLessons.map((lesson) => {
    return prisma.lesson.update({
      where: {
        id: lesson.id,
      },
      data: {
        index: lesson.index,
      },
    });
  });

  await Promise.all(updatePromises);

  revalidatePath("/admin/courses/[slug]", "page");
}
