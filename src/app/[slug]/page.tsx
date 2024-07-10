import Image from "next/image";
import { redirect } from "next/navigation";

import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import { currencyFormat } from "@/libs/currency-format";
import { CourseServices } from "@/services/course.services";

import { buyCourseAction } from "./action";

interface Props {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: Props) {
  const course = await CourseServices.getCourseDetail(params.slug);

  if (!course) {
    redirect("/");
  }

  return (
    <main>
      <Header />
      <section className="space-y-4 bg-slate-950 p-24 text-white">
        <h2>{course.title}</h2>
        <h3 className="w-1/2 whitespace-pre-line font-normal text-indigo-200">{course.description}</h3>
      </section>
      <section className="mx-24 my-12 grid grid-cols-3 gap-12">
        <div className="col-span-2 space-y-4">
          {course.sections.map((section) => {
            return (
              <main key={section.id} className="space-y-4">
                <h4>{section.title}</h4>
                <div className="space-y-4">
                  {section.lessons.map((lesson) => {
                    return (
                      <Card key={lesson.id}>
                        <div>{lesson.title}</div>
                      </Card>
                    );
                  })}
                </div>
              </main>
            );
          })}
        </div>
        <div className="space-y-4">
          <Image
            src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/devscale-nextlms/courses/${course.id}/${course.coverImage}`}
            alt={course.title}
            width={1000}
            height={500}
            className="rounded-xl"
          />
          <h5>{course.sections.length} Sections</h5>
          <h5>{course.sections.reduce((acc, section) => acc + section.lessons.length, 0)} Lessons</h5>
          <form action={buyCourseAction}>
            <input type="hidden" value={course.id} name="courseId" />
            <input type="hidden" value={course.flashSales ? course.flashSales.newAmount : course.price} name="amount" />
            <Button>Buy {currencyFormat(course.flashSales ? course.flashSales.newAmount : course.price)}</Button>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}
