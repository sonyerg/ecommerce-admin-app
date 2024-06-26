import prismadb from "@/lib/prismadb";

export async function getTotalRevenue(storeId: string) {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const totalRevenue = paidOrders.reduce((total, order) => {
    const orderTotal = order.orderItems.reduce((total, item) => {
      return total + item.product.price.toNumber();
    }, 0);

    return total + orderTotal;
  }, 0);

  return totalRevenue;
}
