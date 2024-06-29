"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/utils/prisma";

export async function banUserAction(_: unknown, formData: FormData) {
  const userId = formData.get("userId") as string;

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      onBanned: true,
    },
  });

  revalidatePath("/admin/users");
}
