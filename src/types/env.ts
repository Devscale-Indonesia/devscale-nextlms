/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
import z from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  RESEND_API_KEY: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  GOOGLE_REDIRECT_URI: z.string().min(1),
  R2_PUBLIC_URL: z.string().min(1),
  R2_ACCESS_ID: z.string().min(1),
  R2_SECRET_KEY: z.string().min(1),
  R2_S3API_URL: z.string().min(1),
});

const envParse = envSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
  R2_PUBLIC_URL: process.env.R2_PUBLIC_URL,
  R2_ACCESS_ID: process.env.R2_ACCESS_ID,
  R2_SECRET_KEY: process.env.R2_SECRET_KEY,
  R2_S3API_URL: process.env.R2_S3API_URL,
});

if (!envParse.success) {
  throw new Error("Error ENV Validation");
  process.exit(1);
}

type TENV = z.infer<typeof envSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends TENV {}
  }
}
