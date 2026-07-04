

const features = [
  {
    title: "Free Shipping",
    description: "Fast and reliable delivery on all orders.",
  },
  {
    title: "Easy Returns",
    description: "Hassle-free returns and refunds.",
  },
  {
    title: "Secure Payments",
    description: "Your transactions are always protected.",
  },
  {
    title: "24/7 Support",
    description: "We're here whenever you need help.",
  },
];

function WhatWeSell() {
  return (
    <section
        className="
            py-12 md:py-16 lg:py-20
            px-4 md:px-6
            text-[var(--color-coal)]
        ">
      <h2
        className="
            text-2xl md:text-3xl lg:text-4xl
            font-bold
            text-center
            mb-8 md:mb-12
        ">
        Why Shop With Us?
      </h2>

      <div
        className="
            grid
            grid-cols-1 md:grid-cols-2 lg:grid-cols-4
            gap-3 md:gap-6
        ">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="border rounded-lg p-2 md:p-6 text-center bg-white"
          >
            <h3 className="text-lg md:text-xl font-semibold md:mb-2">
              {feature.title}
            </h3>

            <p className="text-sm md:text-base text-[var(--color-slate)]/80">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhatWeSell;