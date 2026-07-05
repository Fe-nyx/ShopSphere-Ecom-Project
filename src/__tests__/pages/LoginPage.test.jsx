import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LoginPage from "../../pages/LoginPage";

const validCredentials = {
  email: "test@example.com",
  password: "Password123!",
};

describe("LoginPage", () => {
  it("should render the login form", () => {
    render(<LoginPage />);

    // assertions
    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("should display errors empty fields", async () => {
    render(<LoginPage />);

    const user = userEvent.setup();
    const loginButton = screen.getByRole("button", { name: "Login" });

    await user.click(loginButton);

    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Password is required")).toBeInTheDocument();
  });

  it("should login successfully with valid credentials", async () => {
    const alertMock = vi.fn();
    window.alert = alertMock;

    render(<LoginPage />);

    const user = userEvent.setup();
    const loginButton = screen.getByRole("button", { name: "Login" });

    await user.type(screen.getByLabelText("Email"), validCredentials.email);
    await user.type(
      screen.getByLabelText("Password"),
      validCredentials.password,
    );

    await user.click(screen.getByRole("button", { name: "Login" }));

    expect(alertMock).toHaveBeenCalledWith("Login Successful");
  });
});
