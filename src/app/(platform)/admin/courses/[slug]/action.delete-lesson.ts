"use server";

import { revalidatePath } from "next/cache";

import { CourseServices } from "@/services/course.services";

export async function deleteLessonAction(formData: FormData) {
  const lessonId = formData.get("lessonId") as string;

  await CourseServices.deleteLesson(lessonId);

  revalidatePath("/admin/courses/[slug]", "page");
}
