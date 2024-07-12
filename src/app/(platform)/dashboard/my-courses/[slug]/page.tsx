import { redirect } from "next/navigation";

import { CourseServices } from "@/services/course.services";

interface Props {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: Props) {
  const course = await CourseServices.getCourseDetail(params.slug);

  if (!course) {
    redirect("/dashboard/my-courses");
  }

  const firstLesson = course.sections[0].lessons[0].slug;
  redirect(`/dashboard/my-courses/${course.slug}/${firstLesson}`);
}
