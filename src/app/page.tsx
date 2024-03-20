"use server";

import H1 from "@/components/h1";
import RestaurantsList from "@/components/restaurants-list";
import { Suspense } from "react";
import Loading from "./loading";
import { z } from "zod";
const pageNumberSchema = z.coerce.number().int().positive().optional();
type EventsPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const parsedPage = pageNumberSchema.safeParse(searchParams.page);
  if (!parsedPage.success) {
    throw new Error("Invalid page number");
  }

  return (
    <main className="flex flex-col items-center py-24 px-[20px] min-h-[110vh]">
      <H1 className="mb-28">مطاعم</H1>

      <Suspense key={"Restaurants " + parsedPage.data} fallback={<Loading />}>
        <RestaurantsList page={parsedPage.data} />
      </Suspense>
    </main>
  );
}
