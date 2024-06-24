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
};
