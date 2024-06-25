"use server";

import { revalidatePath } from "next/cache";

import { CourseServices } from "@/services/course.services";

export async function addLessonAction(formData: FormData) {
  const sectionId = formData.get("sectionId") as string;

  await CourseServices.createLesson(sectionId);

  revalidatePath("/admin/courses/[slug]", "page");
}
