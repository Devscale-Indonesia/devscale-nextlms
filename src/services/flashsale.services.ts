import prisma from "@/utils/prisma";

export const FlashSaleServices = {
  getAllFlashSale: async () => {
    const flashSale = await prisma.flashSale.findMany({
      include: {
        course: true,
      },
    });

    return flashSale;
  },

  createSale: async (newAmount: number, courseId: string) => {
    await prisma.flashSale.create({
      data: {
        newAmount,
        courseId,
      },
    });
  },

  deleteSale: async (saleId: string) => {
    await prisma.flashSale.delete({
      where: {
        id: saleId,
      },
    });
  },
};
