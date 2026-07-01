import { useEffect, useState } from "react";

const slides = [
  {
    title: "Shop Smarter, Live Better",
    subtitle: "Discover amazing products at unbeatable prices.",
    button: "Shop Now",
    background: "from-blue-600 to-indigo-700",
  },
  {
    title: "Summer Sale",
    subtitle: "Save up to 20% on all products.",
    button: "Explore Deals",
    background: "from-orange-500 to-red-600",
  },
  {
    title: "Free Shipping",
    subtitle: "Fast delivery on every order with easy returns.",
    button: "Start Shopping",
    background: "from-emerald-500 to-teal-600",
  },
];

function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  function nextSlide() {
    setCurrentSlide((previous) => {
      return (previous + 1) % slides.length;
    });
  }

  function previousSlide() {
    setCurrentSlide((previous) => {
      return previous === 0 ? slides.length - 1 : previous - 1;
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((previous) => (previous + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="
        relative
        text-center
        py-12 md:py-18 lg:py-24
        px-4 md:px-6
        bg-gray-100
      "
    >
      <h1
        className="
        text-3xl md:text-4xl lg:text-5xl
        font-bold
        mb-4 md:mb-6"
      >
        {slides[currentSlide].title}
      </h1>

      <p className="text-base md:text-lg mb-2 md:mb-4">
        {slides[currentSlide].subtitle}
      </p>

      <button className="btn-primary mt-6">
        {slides[currentSlide].button}
      </button>

      <button
        onClick={previousSlide}
        className="
          absolute
          left-4 md:left-8
          top-1/2
          -translate-y-1/2
          cursor-pointer
          bg-white/80
          hover:bg-white
          rounded-full
          p-3
          shadow-md
          transition
        "
      >
        ←
      </button>

      <button
        onClick={nextSlide}
        className="
          absolute
          right-4 md:right-8
          top-1/2
          -translate-y-1/2
          cursor-pointer
          bg-white/80
          hover:bg-white
          rounded-full
          p-3
          shadow-md
          transition
        "
      >
        →
      </button>

        <div className="flex justify-center gap-2 mt-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`
                w-3
                h-3
                rounded-full
                transition-all
                duration-300
                cursor-pointer
                ${
                  currentSlide === index
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/80"
                }
              `}
            />
          ))}
        </div>
    </section>
  );
}

export default Banner;
