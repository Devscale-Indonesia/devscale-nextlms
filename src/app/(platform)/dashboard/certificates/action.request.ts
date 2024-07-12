"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/utils/prisma";

export async function requestCertificateAction(formData: FormData) {
  const certificateId = formData.get("certificateId") as string;

  await prisma.certificate.update({
    where: {
      id: certificateId,
    },
    data: {
      status: "UNDER_REVIEW",
    },
  });

  revalidatePath("/dashboard/certificates");
}
