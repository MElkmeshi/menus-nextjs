import "server-only";
import { unstable_cache } from "next/cache";
import prisma from "./db";
const PAGE_SIZE = 21;
export const getRestaurants = unstable_cache(async (page = 1) => {
  const restaurants = await prisma.restaurants.findMany({
    take: PAGE_SIZE,
    skip: (page - 1) * PAGE_SIZE,
    orderBy: {
      prestoID: "asc",
    },
  });

  const totalCount = await prisma.restaurants.count({});
  return {
    restaurants,
    totalCount,
  };
});

export const getProsucts = unstable_cache(async (restaurant: string) => {
  const products = await prisma.products.findMany({
    where: {
      restaurant: restaurant,
    },
  });

  const totalCount = await prisma.products.count({});
  return {
    products,
    totalCount,
  };
});
