import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { StarIcon, XIcon } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { db } from "utils/db.server";
import { cn } from "~/utils/shadcn";
import { useClamp } from "~/utils/use-clamp";

export async function loader({ params }: LoaderFunctionArgs) {
  const hotel = await db.hotel.findUniqueOrThrow({
    where: { id: Number(params.hotelId!) },
  });

  return json({ hotel });
}

export default function HotelId() {
  const { hotel } = useLoaderData<typeof loader>();
  const [expanded, setExpanded] = useState(false);

  const descriptionRef = useRef<ElementRef<"p">>(null);
  const { isClamped } = useClamp(descriptionRef);

  return (
    <main>
      <div className="relative mx-10">
        <img
          className="h-[30svh] object-cover w-full rounded-t-lg -clip"
          src={hotel.image}
          alt={hotel.name}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black opacity-40" />
        <div className="absolute bottom-4 right-4 font-semibold">
          {hotel.city}
        </div>
        <Link to="/" className="absolute top-0 right-0 p-4">
          <XIcon className="size-12" />
        </Link>
      </div>

      <div className="px-16 py-8">
        <h1 className="text-3xl font-semibold">{hotel.name}</h1>
        <p className="text-white/80 font-light">{hotel.address}</p>

        <div className="flex gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, i) =>
            i < hotel.stars ? (
              <StarIcon className="fill-yellow-400 stroke-none" key={i} />
            ) : (
              <StarIcon key={i} />
            )
          )}
        </div>

        <p
          ref={descriptionRef}
          className={cn(
            "text-xl leading-8 mt-8",
            expanded ? "line-clamp-none" : "line-clamp-5"
          )}
        >
          {hotel.description}
        </p>

        {isClamped ? (
          <button
            className="text-yellow-400 font-semibold"
            onClick={() => setExpanded((e) => !e)}
          >
            {expanded ? "Show Less" : "Show More"}
          </button>
        ) : null}
      </div>
    </main>
  );
}
