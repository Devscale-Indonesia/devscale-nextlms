import { customAlphabet } from "nanoid";

export function generateVerificationCode() {
  const generateCode = customAlphabet("123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 6);
  return generateCode();
}
