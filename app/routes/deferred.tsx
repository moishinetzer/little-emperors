import { defer, useLoaderData, Await } from "@remix-run/react";
import { Suspense } from "react";
import { db } from "utils/db.server";
import { HeroSection } from "~/components/hero-section";
import { HotelCard, SkeletonHotelCard } from "~/components/hotel-card";
import { Separator } from "~/components/ui/separator";

export async function loader() {
  async function findHotels() {
    // Artificial delay to simulate a slow connection
    // Notice how this does not block the initial render
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return db.hotel.findMany({
      // Do the ordering on the DB query - much faster and cheaper.
      orderBy: { stars: "desc" },
    });
  }

  async function countHotels() {
    return db.hotel.count();
  }

  // See https://remix.run/docs/en/main/guides/streaming for more info on streaming with Remix
  return defer({
    hotels: findHotels(),
    // Here I'm `await`ing the count because I want to use it in the skeleton
    // This is fine to await because counting is a very fast operation, but fingHotels could be slow
    count: await countHotels(),
  });
}

export default function Index() {
  const { hotels, count } = useLoaderData<typeof loader>();

  return (
    <main>
      <HeroSection />

      <Separator className="my-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-16">
        <Suspense
          fallback={Array.from({ length: count }).map((_, i) => (
            <SkeletonHotelCard key={i} />
          ))}
        >
          <Await resolve={hotels}>
            {(hotels) =>
              hotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)
            }
          </Await>
        </Suspense>
      </div>
    </main>
  );
}
