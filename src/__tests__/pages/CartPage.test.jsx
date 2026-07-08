import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import CartPage from "../../pages/CartPage";

import cartReducer from "../../redux/slices/cartSlice";

function renderComponent(preloadedState = {}) {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: {
      cart: [],
      ...preloadedState,
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>
    </Provider>,
  );
}

const product1 = {
  id: 1,
  title: "Wireless Mouse",
  image: "mouse.jpg",
  price: 50,
};

const product2 = {
  id: 2,
  title: "Mechanical Keyboard",
  image: "keyboard.jpg",
  price: 100,
};

describe("CartPage", () => {
  it("renders EmptyState when cart is empty", () => {
    renderComponent();

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: /continue shopping/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders cart items correctly", () => {
    renderComponent({
      cart: [
        {
          product: product1,
          quantity: 2,
        },
      ],
    });

    expect(screen.getByText("Wireless Mouse")).toBeInTheDocument();

    expect(screen.getByText("Price: $50")).toBeInTheDocument();

    expect(
      screen.getByRole("img", {
        name: "Wireless Mouse",
      }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText("Quantity")).toHaveTextContent("2");
  });

  it("calculates subtotal correctly", () => {
    renderComponent({
      cart: [
        {
          product: product1,
          quantity: 2,
        },
      ],
    });

    expect(screen.getByText("Subtotal: $100.00")).toBeInTheDocument();
  });

  it("calculates total correctly for multiple products", () => {
    renderComponent({
      cart: [
        {
          product: product1,
          quantity: 2,
        },
        {
          product: product2,
          quantity: 3,
        },
      ],
    });

    expect(screen.getByText("Cart Total: $400.00")).toBeInTheDocument();
  });

  it("renders checkout button", () => {
    renderComponent({
      cart: [
        {
          product: product1,
          quantity: 1,
        },
      ],
    });

    expect(
      screen.getByRole("button", {
        name: /proceed to checkout/i,
      }),
    ).toBeInTheDocument();
  });
});
