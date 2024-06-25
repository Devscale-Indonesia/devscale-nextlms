import { redirect } from "next/navigation";
import React from "react";

import { Button } from "@/components/button";
import { CourseServices } from "@/services/course.services";

import { AddSectionBtn } from "./comp.add-section";
import { LessonEditForm } from "./comp.lesson-edit-form";
import { Sections } from "./comp.section-dnd";
import { SectionEditForm } from "./comp.section-edit-form";

interface Props {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: Props) {
  const course = await CourseServices.getCourseDetail(params.slug);

  if (!course) {
    redirect("/admin/courses");
  }

  return (
    <main className="m-auto max-w-2xl space-y-8">
      <section className="space-y-2">
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <Button size="sm" className="w-fit">
          Publish Course
        </Button>
      </section>
      <section className="space-y-2">
        <AddSectionBtn courseId={course.id} />
        <Sections course={course} />
      </section>
      <LessonEditForm />
      <SectionEditForm />
    </main>
  );
}
