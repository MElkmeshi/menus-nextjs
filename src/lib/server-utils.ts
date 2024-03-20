import "server-only";
import { unstable_cache } from "next/cache";
import prisma from "./db";

export const getRestaurants = unstable_cache(async (page = 1) => {
  const restaurants = await prisma.restaurants.findMany({
    take: 6,
    skip: (page - 1) * 6,
  });

  const totalCount = await prisma.restaurants.count({});
  return {
    restaurants,
    totalCount,
  };
});

export const getProsucts = unstable_cache(
  async (restaurant: string, page = 1) => {
    const products = await prisma.products.findMany({
      take: 6,
      where: {
        restaurant: restaurant,
      },
      skip: (page - 1) * 6,
    });

    const totalCount = await prisma.products.count({});
    return {
      products,
      totalCount,
    };
  }
);
