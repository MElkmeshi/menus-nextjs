"use server";

import H1 from "@/components/h1";
import { Suspense } from "react";
import Loading from "./loading";
import { z } from "zod";
import { Metadata } from "next";
import RestaurantProductsList from "@/components/restaurant-products-list";
import prisma from "@/lib/db";
const pageNumberSchema = z.coerce.number().int().positive().optional();

type Props = {
  params: {
    restaurant: string;
  };
};

type EventsPageProps = Props & {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function MenusPage({
  params,
  searchParams,
}: EventsPageProps) {
  const restaurant = params.restaurant;
  const restaurantName = await prisma.restaurants.findUnique({
    where: {
      id: restaurant,
    },
  });

  const parsedPage = pageNumberSchema.safeParse(searchParams.page);
  if (!parsedPage.success) {
    throw new Error("Invalid page number");
  }

  return (
    <main className="flex flex-col items-center py-24 px-[20px] min-h-[110vh]">
      <H1 className="mb-28">{restaurantName?.name}</H1>

      <Suspense key={"Restaurants " + parsedPage.data} fallback={<Loading />}>
        <RestaurantProductsList
          restaurant={restaurant}
          page={parsedPage.data}
        />
      </Suspense>
    </main>
  );
}
