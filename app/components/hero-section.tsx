import { AccentLine, DownArrow } from "~/components/icons";

export function HeroSection() {
  return (
    <>
      {/* Hero Image with Gradient */}
      <div className="relative">
        <img
          className="h-80 object-cover w-full"
          src="https://d13bre0qp8legl.cloudfront.net/homepage/images/CNhV1lnSbgMvzB335BTIgUpsr0xyXl17RsF1YZiq.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
        <div className="absolute bottom-4 right-4 font-semibold">
          Alila Kothaifaru Maldives
        </div>
      </div>

      {/* Action Statement */}
      <div className="flex px-4 md:px-16 py-8 justify-center items-center">
        <AccentLine className="flex-shrink-0" />
        <p className="text-start text-2xl md:text-3xl font-semibold px-4">
          We guarantee the lowest rates and the most benefits at the best luxury
          hotels
        </p>
        <AccentLine className="flex-shrink-0 rotate-180" />
      </div>

      <button
        className="w-full p-4"
        onClick={(e) => {
          e.preventDefault();
          // Scroll to just below this element
          window.scrollTo({
            top: e.currentTarget.offsetTop + e.currentTarget.offsetHeight,
            behavior: "smooth",
          });
        }}
      >
        <DownArrow className="mx-auto" />
      </button>
    </>
  );
}
