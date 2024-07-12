import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

import { Card } from "@/components/card";
import serverAuth from "@/libs/server-auth";
import { CourseServices } from "@/services/course.services";

export default async function Page() {
  const auth = serverAuth();

  if (!auth) {
    redirect("/login");
  }

  const userCourses = await CourseServices.getUserCourses(auth.id);

  return (
    <main className="m-auto max-w-2xl space-y-6 py-12">
      <section className="space-y-1">
        <h3>My Courses</h3>
        <p className="font-medium text-slate-400">All courses you enrolled</p>
      </section>
      <section className="space-y-6">
        {userCourses.map(({ course }) => {
          return (
            <Link key={course.id} href={`/dashboard/my-courses/${course.slug}`} className="block">
              <Card className="flex cursor-pointer items-center gap-6 space-y-0 rounded-xl border bg-white transition duration-200 hover:border-indigo-600 hover:shadow-md">
                <Image
                  src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/devscale-nextlms/courses/${course.id}/${course.coverImage}`}
                  alt={course.title}
                  width={140}
                  height={140}
                  className="rounded-lg"
                />
                <section>
                  <h4>{course.title}</h4>
                  <p>{course.description}</p>
                </section>
              </Card>
            </Link>
          );
        })}
        {userCourses.length === 0 && (
          <Card className="text-balance bg-slate-50 text-center">
            <h5>You have no course</h5>
          </Card>
        )}
      </section>
    </main>
  );
}
