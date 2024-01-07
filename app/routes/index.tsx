import { json, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";
import { HeroSection } from "~/components/hero-section";
import { HotelCard } from "~/components/hotel-card";
import { Separator } from "~/components/ui/separator";

export async function loader() {
  const hotels = await db.hotel.findMany({
    orderBy: { stars: "desc" },
  });

  return json({ hotels });
}

export default function Index() {
  const { hotels } = useLoaderData<typeof loader>();

  return (
    <main>
      <HeroSection />

      <Separator className="my-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-16">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </main>
  );
}
