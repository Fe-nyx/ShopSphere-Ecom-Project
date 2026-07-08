import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import FAQAccordion from "../../components/FAQAccordion";

describe("FAQAccordion", () => {
  it("should render the question", () => {
    render(
      <FAQAccordion title="Test Question">
        Test Answer
      </FAQAccordion>
    );

    expect(
      screen.getByText("Test Question")
    ).toBeInTheDocument();
  });

  it("should show the answer when clicked", async () => {
    const user = userEvent.setup();

    render(
      <FAQAccordion title="Test Question">
        Test Answer
      </FAQAccordion>
    );

    await user.click(
      screen.getByRole("button")
    );

    expect(
      screen.getByText("Test Answer")
    ).toBeInTheDocument();
  });

  it("should hide the answer when clicked again", async () => {
    const user = userEvent.setup();

    render(
      <FAQAccordion title="Test Question">
        Test Answer
      </FAQAccordion>
    );

    const button = screen.getByRole("button");

    await user.click(button);

    expect(
      screen.getByText("Test Answer")
    ).toBeInTheDocument();

    await user.click(button);

    expect(
      screen.queryByText("Test Answer")
    ).not.toBeInTheDocument();
  });
});