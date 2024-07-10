import { Course, Lesson, Section } from "@prisma/client";
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
    const totalSection = await prisma.section.count({
      where: {
        courseId,
      },
    });

    await prisma.section.create({
      data: {
        title: `New section ${(totalSection + 1).toString()}`,
        courseId,
        index: totalSection,
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
      include: {
        flashSales: true,
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
        flashSales: true,
        sections: {
          include: {
            lessons: {
              orderBy: {
                index: "asc",
              },
            },
          },
          orderBy: {
            index: "asc",
          },
        },
      },
    });

    return data;
  },

  deleteSection: async (sectionId: string) => {
    await prisma.section.delete({
      where: {
        id: sectionId,
      },
    });
  },

  updateSection: async (section: Pick<Section, "id" | "title">) => {
    await prisma.section.update({
      where: {
        id: section.id,
      },
      data: {
        title: section.title,
      },
    });
  },

  deleteLesson: async (lessonId: string) => {
    await prisma.lesson.delete({
      where: {
        id: lessonId,
      },
    });
  },

  updateLesson: async (lesson: Pick<Lesson, "id" | "title" | "videoUrl">) => {
    await prisma.lesson.update({
      where: {
        id: lesson.id,
      },
      data: {
        title: lesson.title,
        slug: slugify(lesson.title, { lower: true }),
        videoUrl: lesson.videoUrl,
      },
    });
  },
};
