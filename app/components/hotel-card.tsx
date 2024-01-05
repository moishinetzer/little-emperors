import { Hotel } from "@prisma/client";
import { Link } from "@remix-run/react";
import { StarIcon } from "lucide-react";
import { Skeleton } from "~/components/ui/skeleton";

export function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <Link
      className="flex flex-col gap-4 animate-in fade-in duration-100"
      to={`/${hotel.id}`}
    >
      <img
        className="h-64 object-cover w-full rounded overflow-clip"
        src={hotel.image}
      />
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="text-xl font-semibold">{hotel.name}</div>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) =>
              i < hotel.stars ? (
                <StarIcon className="fill-yellow-400 stroke-none" key={i} />
              ) : (
                <StarIcon key={i} />
              )
            )}
          </div>
        </div>
        <div>
          <div className="text-white/50 font-semibold">{hotel.city}</div>
          <div className="text-white/80 font-light">{hotel.address}</div>
        </div>
        <div className="pt-4 text-yellow-100/80 truncate text-wrap line-clamp-2">
          {hotel.description}
        </div>
      </div>
    </Link>
  );
}

export function SkeletonHotelCard() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-64 rounded overflow-clip" />
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <Skeleton className="w-1/2 h-8" />
          <Skeleton className="w-1/4 h-8" />
        </div>
        <div>
          <Skeleton className="w-1/4 h-6" />
          <Skeleton className="w-1/2 h-6" />
        </div>
        <div className="pt-4">
          <Skeleton className="w-3/4 h-6" />
          <Skeleton className="w-1/2 h-6" />
        </div>
      </div>
    </div>
  );
}
