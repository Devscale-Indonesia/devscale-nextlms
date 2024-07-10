import { NextRequest } from "next/server";

import prisma from "@/utils/prisma";

interface ReqBody {
  event: string;
  data: Record<string, string | number>;
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as ReqBody;

  if (body.event === "payment.received") {
    // update Transaction => Paid
    const updatedTransaction = await prisma.transaction.update({
      where: {
        transactionId: body.data.productId as string,
      },
      data: {
        paymentStatus: "PAID",
      },
    });

    // create Access
    await prisma.courseAccess.create({
      data: {
        userId: updatedTransaction.userId,
        courseId: updatedTransaction.courseId,
      },
    });

    // create certificate Placeholder
    await prisma.certificate.create({
      data: {
        userId: updatedTransaction.userId,
        courseId: updatedTransaction.courseId,
      },
    });

    console.log("Transaction API has been hitted");
  }

  return new Response("OK");
}
