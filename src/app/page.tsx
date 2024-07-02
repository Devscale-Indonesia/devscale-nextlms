import Image from "next/image";

import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import { CourseServices } from "@/services/course.services";
import { currencyFormat } from "@/libs/currency-format";
import { Button } from "@/components/button";

export default async function Home() {
  const courses = await CourseServices.getAllCourses();

  return (
    <main className="flex min-h-screen flex-col justify-between">
      <Header />
      <section className="flex min-h-96 flex-col items-center justify-center space-y-32 py-32">
        <div className="max-w-4xl space-y-8 text-center">
          <h1 className="text-balance">Make knowledge investment for your future</h1>
          <h3 className="text-slate-500">Start learning with nextlms.</h3>
        </div>
        <div className="m-auto grid max-w-4xl grid-cols-6 items-center gap-12">
          <Image src="/logo/Asana.png" alt="Asana" width={1000} height={500} />
          <Image src="/logo/Atlassian.png" alt="Atlassian" width={1000} height={500} />
          <Image src="/logo/Basecamp.png" alt="Basecamp" width={1000} height={500} />
          <Image src="/logo/GitHub.png" alt="Github" width={1000} height={500} />
          <Image src="/logo/Google.png" alt="Google" width={1000} height={500} />
          <Image src="/logo/Spotify.png" alt="Spotify" width={1000} height={500} />
        </div>
      </section>
      <section className="mx-32 space-y-12 rounded-2xl bg-indigo-600 p-24 text-white">
        <div className="m-auto max-w-2xl space-y-6 text-balance text-center">
          <h2>Learning in better way, with our courses could boost your skillset</h2>
          <h4>Nextlms. is a platform where you can learn anything!</h4>
        </div>
        <div className="grid grid-cols-3 gap-10">
          {courses.map((course) => {
            return (
              <main key={course.id} className="relative space-y-4">
                <h4>{course.title}</h4>
                <div className="overflow-hidden rounded-xl bg-white">
                  <Image
                    src={`${process.env.R2_PUBLIC_URL}/devscale-nextlms/courses/${course.id}/${course.coverImage}`}
                    alt={course.title}
                    width={1000}
                    height={500}
                  />
                </div>
                {course.flashSales?.id && (
                  <div className="absolute right-4 top-4 z-10 rounded-lg bg-slate-950 px-3 py-2 font-bold text-white">Flash Sale!</div>
                )}
                <div className="grid grid-cols-3 gap-2">
                  <Button size="sm" variant="secondary" className="col-span-2 shadow-slate-600">
                    Buy {course.flashSales?.id ? currencyFormat(course.flashSales.newAmount) : currencyFormat(course.price)}
                  </Button>
                  <Button size="sm" variant="secondary" className="shadow-slate-600">
                    View
                  </Button>
                </div>
              </main>
            );
          })}
        </div>
      </section>
      <section></section>
      <Footer />
    </main>
  );
}
