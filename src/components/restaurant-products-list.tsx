import { getProsucts } from "@/lib/server-utils";
import PaginationControls from "./pagination-controls";
import ProductCard from "./product-card";

type EventsListProps = {
  restaurant: string;
  page?: number;
};

export default async function RestaurantProductsList({
  restaurant,
  page = 1,
}: EventsListProps) {
  const { products, totalCount } = await getProsucts(restaurant, page);

  const previousPath =
    page > 1 ? `/restaurant/${restaurant}?page=${page - 1}` : "";
  const nextPath =
    totalCount > 6 * page ? `/restaurant/${restaurant}?page=${page + 1}` : "";

  return (
    <section className="max-w-[1100px] flex flex-wrap gap-10 justify-center px-[20px]">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}

      <PaginationControls previousPath={previousPath} nextPath={nextPath} />
    </section>
  );
}
