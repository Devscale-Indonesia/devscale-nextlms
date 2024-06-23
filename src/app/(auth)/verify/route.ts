import { NextRequest } from "next/server";

import prisma from "@/utils/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("user");
  const code = searchParams.get("code");

  if (!userId || !code) {
    return Response.json({ message: "No user and verification code found" });
  }

  const unverifiedUser = await prisma.user.findFirst({
    where: {
      AND: [
        {
          id: userId,
        },
        {
          isVerified: false,
        },
        {
          verificationCode: {
            code,
          },
        },
      ],
    },
  });

  if (!unverifiedUser) {
    return Response.json({ message: "No user and verification code found in database" });
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      isVerified: true,
    },
  });

  return Response.json({ message: "User verified, please login..." });
}
