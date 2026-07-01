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
          px-4
          py-4
          cursor-pointer
          hover:bg-gray-50
          transition
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
            text-gray-600
            leading-relaxed
          "
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default FAQAccordion;