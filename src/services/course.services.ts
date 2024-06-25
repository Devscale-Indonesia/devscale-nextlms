import { Course } from "@prisma/client";
import slugify from "slugify";

import prisma from "@/utils/prisma";

export const CourseServices = {
  createCourse: async (courseData: Pick<Course, "title" | "description" | "price" | "coverImage">) => {
    try {
      const slug = slugify(courseData.title, { lower: true });

      const newCourse = await prisma.course.create({
        data: {
          title: courseData.title,
          slug,
          description: courseData.description,
          price: courseData.price,
          coverImage: courseData.coverImage,
        },
      });

      return newCourse;
    } catch (error) {
      console.log(error);
    }
  },

  createSection: async (courseId: string) => {
    await prisma.section.create({
      data: {
        title: "New section",
        courseId,
      },
    });
  },

  createLesson: async (sectionId: string) => {
    const totalLesson = await prisma.lesson.count({
      where: {
        sectionId,
      },
    });

    await prisma.lesson.create({
      data: {
        sectionId,
        title: `New lesson ${(totalLesson + 1).toString()}`,
        slug: slugify(`New lesson ${totalLesson.toString()}`, { lower: true }),
        videoUrl: "-",
        index: totalLesson,
      },
    });
  },

  getAllCourses: async () => {
    const data = await prisma.course.findMany({
      orderBy: {
        title: "asc",
      },
    });

    return data;
  },

  getCourseDetail: async (idOrSlug: string) => {
    const data = await prisma.course.findFirst({
      where: {
        OR: [
          {
            id: idOrSlug,
          },
          {
            slug: idOrSlug,
          },
        ],
      },
      include: {
        sections: {
          include: {
            lessons: true,
          },
        },
      },
    });

    return data;
  },

  deleteLesson: async (lessonId: string) => {
    await prisma.lesson.delete({
      where: {
        id: lessonId,
      },
    });
  },
};
