"use server";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

import { UserServices } from "@/services/user.services";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 chars"),
});

export async function loginAction(prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validation = loginSchema.safeParse({ email, password });

  if (!validation.success) {
    return {
      status: "error",
      errors: validation.error.flatten().fieldErrors,
      data: {
        email,
        password,
      },
    };
  }

  const user = await UserServices.findUser(email);

  if (!user) {
    return {
      status: "error",
      message: "User not found",
      data: {
        email,
        password,
      },
    };
  }

  if (!user.isVerified) {
    return {
      status: "error",
      message: "Verify your account",
    };
  }

  if (!user.password) {
    return {
      status: "error",
      message: "You might create your account with google, please try continue with google",
    };
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return {
      status: "error",
      message: "Invalid Credetials",
      data: {
        email,
        password,
      },
    };
  }

  // JWT Token
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatarUrl: user.avatarUrl,
  };

  const jwtToken = jwt.sign(payload, process.env.JWT_SECRET);

  cookies().set("token", jwtToken, {
    httpOnly: true,
    path: "/",
  });

  redirect("/my-courses");
}
