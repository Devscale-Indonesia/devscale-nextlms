"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/utils/prisma";

export async function updateSectionsIndex(formData: FormData) {
  const courseId = formData.get("courseId") as string;
  //   const sectionId = formData.get("sectionId");
  const sourceIndex = Number(formData.get("sourceIndex"));
  const destinationIndex = Number(formData.get("destinationIndex"));

  const allSections = await prisma.section.findMany({
    where: {
      courseId,
    },
    orderBy: {
      index: "asc",
    },
  });

  const newSections = [...allSections];
  const [movedSection] = newSections.splice(sourceIndex, 1);
  newSections.splice(destinationIndex, 0, movedSection);

  const updatedSections = newSections.map((section, index) => ({
    ...section,
    index,
  }));

  const updatePromises = updatedSections.map((section) => {
    return prisma.section.update({
      where: {
        id: section.id,
      },
      data: {
        index: section.index,
      },
    });
  });

  await Promise.all(updatePromises);

  revalidatePath("/admin/courses/[slug]", "page");
}
