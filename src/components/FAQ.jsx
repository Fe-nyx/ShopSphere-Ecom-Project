import FAQAccordion from "./FAQAccordion";

function FAQ() {
  return (
    <section className="py-12 px-4 md:px-6">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[var(--color-coal)]">
        Frequently Asked Questions
      </h2>

      <div className="max-w-3xl mx-auto space-y-4">

        <FAQAccordion title="Do you offer free shipping?">
          Yes. We provide free shipping on all eligible orders.
        </FAQAccordion>

        <FAQAccordion title="How long does delivery take?">
          Most orders arrive within 3–7 business days depending on your location.
        </FAQAccordion>

        <FAQAccordion title="Can I return a product?">
          Yes. Products can be returned within 30 days if they meet our return policy.
        </FAQAccordion>

        <FAQAccordion title="Are my payments secure?">
          Absolutely. All transactions are encrypted and processed securely.
        </FAQAccordion>

        <FAQAccordion title="How can I contact customer support?">
          You can reach us by email or phone using the contact information in the footer.
        </FAQAccordion>

      </div>
    </section>
  );
}

export default FAQ;