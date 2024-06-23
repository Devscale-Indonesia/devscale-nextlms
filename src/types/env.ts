/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
import z from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  RESEND_API_KEY: z.string().min(1),
  JWT_SECRET: z.string().min(1),
});

const envParse = envSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
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
