import { getRestaurants } from "@/lib/server-utils";
import PaginationControls from "./pagination-controls";
import RestaurantCard from "./restaurant-card";
type EventsListProps = {
  page?: number;
};

export default async function RestaurantsList({ page = 1 }: EventsListProps) {
  const { restaurants, totalCount } = await getRestaurants(page);

  const previousPath = page > 1 ? `/?page=${page - 1}` : "";
  const nextPath = totalCount > 6 * page ? `/?page=${page + 1}` : "";

  return (
    <section className="max-w-[1100px] flex flex-wrap gap-10 justify-center px-[20px]">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}

      <PaginationControls previousPath={previousPath} nextPath={nextPath} />
    </section>
  );
}
