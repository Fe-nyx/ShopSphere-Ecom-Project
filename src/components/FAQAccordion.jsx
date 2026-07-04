import { useState } from "react";

function FAQAccordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="
        border
        rounded-lg
        overflow-hidden
      "
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-full
          flex
          justify-between
          items-center
          px-2 md:px-4
          py-2 md:py-4
          text-sm md:text-base
          cursor-pointer
          bg-white
          hover:bg-[var(--color-beige)]
          transition
          text-[var(--color-coal)]
        "
      >
        <span className="font-semibold text-left">
          {title}
        </span>

        <span className="text-xl">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen && (
        <div
          className="
            px-4
            pb-4
            text-[var(--color-slate)]
            leading-relaxed
            text-sm md:text-base
            bg-white
          "
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default FAQAccordion;