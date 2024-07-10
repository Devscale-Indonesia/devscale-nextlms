import prisma from "@/utils/prisma";

import { CourseServices } from "./course.services";
import { UserServices } from "./user.services";

export const TransactionServices = {
  createTransaction: async (courseId: string, userId: string, amount: number) => {
    const courseDetail = await CourseServices.getCourseDetail(courseId);

    if (!courseDetail) {
      throw new Error("Course not found!");
    }

    const user = await UserServices.findUser(userId);

    // hit API dari payment Gateway.
    const res = await fetch("https://api.mayar.id/hl/v1/payment/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MAYAR_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user?.name,
        email: user?.email,
        amount: Number(amount),
        description: `Payment for ${courseDetail.title}`,
        mobile: "000000000000",
      }),
    });

    // receive response
    const data = (await res.json()) as { data: { link: string; id: string } };
    console.log(data);

    // insert table transaction
    const transaction = await prisma.transaction.create({
      data: {
        course: {
          connect: {
            id: courseId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
        paymentStatus: "UNPAID",
        amount,
        paymentLink: data.data.link,
        transactionId: data.data.id,
      },
    });

    return transaction;
  },
};
