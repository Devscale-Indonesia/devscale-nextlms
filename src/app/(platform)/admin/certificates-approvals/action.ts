"use server";

import { revalidatePath } from "next/cache";

import { CertificateServices } from "@/services/certificate.services";

export async function approveCertificateAction(formData: FormData) {
  const certificateId = formData.get("certificateId") as string;

  await CertificateServices.approveCertificate(certificateId);

  revalidatePath("/admin/certificate-approvals");
}
