import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import EmptyState from "../../components/EmptyState";

describe("EmptyState", () => {
  it("Should render all content", () => {
    render(
      <MemoryRouter>
        <EmptyState
          title="Empty Cart"
          description="Nothing here"
          buttonText="Go Shopping"
          to="/"
        />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: /empty cart/i }),
    ).toBeInTheDocument();

    expect(screen.getByText("Nothing here")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /go shopping/i }),
    ).toBeInTheDocument();
  });
});
