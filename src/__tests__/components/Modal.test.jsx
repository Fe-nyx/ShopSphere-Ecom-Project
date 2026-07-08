import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Modal from "../../components/Modal";

describe("Modal", () => {
  it("should not render when closed", () => {
    render(
      <Modal isOpen={false} title="Test Modal" onClose={() => {}}>
        Modal Content
      </Modal>,
    );

    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
  });

  it("should render when open", () => {
    render(
      <Modal isOpen={true} title="Test Modal" onClose={() => {}}>
        Modal Content
      </Modal>,
    );

    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });

  it("should call onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Modal isOpen={true} title="Test Modal" onClose={onClose}>
        Modal Content
      </Modal>,
    );

    await user.click(screen.getByRole("button", { name: /close/i }));

    expect(onClose).toHaveBeenCalled();
  });
});
