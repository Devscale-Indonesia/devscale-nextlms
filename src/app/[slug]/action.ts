"use server";

import { redirect } from "next/navigation";

import serverAuth from "@/libs/server-auth";
import { TransactionServices } from "@/services/transaction.services";

export async function buyCourseAction(formData: FormData) {
  const courseId = formData.get("courseId") as string;
  const amount = formData.get("amount") as string;

  const user = serverAuth();

  if (!user) {
    redirect("/login");
  }

  const data = await TransactionServices.createTransaction(courseId, user.id, Number(amount));

  redirect(data.paymentLink);
}
