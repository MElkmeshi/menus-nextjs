import { getProsucts } from "@/lib/server-utils";
import PaginationControls from "./pagination-controls";
import ProductCard from "./product-card";

type EventsListProps = {
  restaurant: string;
};

export default async function RestaurantProductsList({
  restaurant,
}: EventsListProps) {
  const { products } = await getProsucts(restaurant);

  return (
    <section className="max-w-[1100px] flex flex-wrap gap-10 justify-center px-[20px]">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
