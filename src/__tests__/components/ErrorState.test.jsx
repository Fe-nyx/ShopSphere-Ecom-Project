import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import ErrorState from "../../components/ErrorState";

describe("LoadingSpinner", () => {
  it("should render the heading and the message", () => {
    render(<ErrorState message="Network Error" />);

    expect(
      screen.getByRole("heading", { name: /something went wrong/i }),
    ).toBeInTheDocument();

    expect(screen.getByText("Network Error")).toBeInTheDocument();
  });
});
