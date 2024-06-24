"use server";

import bcrypt from "bcrypt";
import z from "zod";

import { generateVerificationCode } from "@/libs/generate-verification-code";
import { EmailServices } from "@/services/email.services";
import { UserServices } from "@/services/user.services";

const registerSchema = z.object({
  name: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 chars"),
});

export async function registerAction(prevState: unknown, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const inputValidation = registerSchema.safeParse({ name, email, password });

  if (!inputValidation.success) {
    return {
      status: "error",
      errors: inputValidation.error.flatten().fieldErrors,
      data: {
        name,
        email,
        password,
      },
    };
  }

  // input > db
  try {
    const hashPassword = await bcrypt.hash(password, 13);
    const user = await UserServices.createUser({ name, email, password: hashPassword, isVerified: false });
    const verificationCode = generateVerificationCode();

    await UserServices.createVerificationCode(user.id, verificationCode);
    await EmailServices.sendVerificationCode(user.id, verificationCode);

    return {
      status: "success",
      message: "Register success!",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Register error!",
    };
  }
}
