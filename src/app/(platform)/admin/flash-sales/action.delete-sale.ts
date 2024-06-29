"use server";

import { revalidatePath } from "next/cache";

import { FlashSaleServices } from "@/services/flashsale.services";

export async function deleteSaleAction(formData: FormData) {
  const saleId = formData.get("saleId") as string;

  await FlashSaleServices.deleteSale(saleId);

  revalidatePath("/admin/flash-sales");
}
