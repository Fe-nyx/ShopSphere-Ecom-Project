import { useEffect, useState } from "react";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const slides = [
  {
    title: "Shop Smarter, Live Better",
    subtitle: "Discover amazing products at unbeatable prices.",
    button: "Shop Now",
    //background: "from-[#2C3639] to-[#49504A]",
    background: "from-[#2C3639] to-[#434A46]",
  },
  {
    title: "Summer Sale",
    subtitle: "Save up to 20% on all products.",
    button: "Explore Deals",
    background: "from-[#434A46] to-[#4C4A45]",
    //background: "from-[#49504A] to-[#5B5850]",
  },
  {
    title: "Free Shipping",
    subtitle: "Fast delivery on every order with easy returns.",
    button: "Start Shopping",
    background: "from-[#4C4A45] to-[#2C3639]",
    //background: "from-[#5B5850] to-[#2C3639]",
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
  }, [currentSlide]);

  return (
    <section
      className={`
        relative
        text-center
        py-12 md:py-24 lg:py-32
        px-4 md:px-6
        bg-gradient-to-r
        ${slides[currentSlide].background}
        text-[var(--color-cream)]
        transition-all
        duration-500
      `}
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

      <button className="text-sm md:text-base btn-secondary mt-6 px-1.5 py-0.5 md:px-2 md:py-1">
        {slides[currentSlide].button}
      </button>

      <button
        onClick={previousSlide}
        className="
          absolute
          left-4 md:left-8
          top-2/3 md:top-1/2 
          -translate-y-1/2
          cursor-pointer
          bg-white/60
          hover:bg-white/80
          rounded-full
          py-1 md:p-2
          shadow-md
          transition
        "
      >
        <FiChevronLeft className="md:text-xl text-[var(--color-slate)]" />
      </button>

      <button
        onClick={nextSlide}
        className="
          absolute
          right-4 md:right-8
          top-2/3 md:top-1/2 
          -translate-y-1/2
          cursor-pointer
          bg-white/60
          hover:bg-white/80
          rounded-full
          py-1 md:p-2
          shadow-md
          transition
        "
      >
        <FiChevronRight className="md:text-xl text-[var(--color-slate)]"/>
      </button>

        <div className="flex justify-center gap-2 mt-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`
                w-1 md:w-3
                h-2 md:h-3
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
