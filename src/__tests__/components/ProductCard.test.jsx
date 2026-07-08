// ProductCard.test.jsx

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

import ProductCard from "../../components/ProductCard";
import cartReducer from "../../redux/slices/cartSlice";
import wishlistReducer from "../../redux/slices/wishlistSlice";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const product = {
  id: 1,
  title: "Test Product",
  image: "test.jpg",
  price: 99.99,
  category: "electronics",
  rating: {
    rate: 4.3,
    count: 120,
  },
};

function renderComponent(preloadedState = {}) {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
      wishlist: wishlistReducer,
    },
    preloadedState: {
      cart: [],
      wishlist: [],
      ...preloadedState,
    },
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard product={product} />
        </MemoryRouter>
      </Provider>
    ),
  };
}

describe("ProductCard", () => {
  it("renders product information", () => {
    renderComponent();

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
    expect(screen.getByText("Electronics")).toBeInTheDocument();
  });

  it("adds product to cart", async () => {
    const user = userEvent.setup();
    const { store } = renderComponent();

    await user.click(
      screen.getByRole("button", { name: /add to cart/i })
    );

    expect(store.getState().cart).toHaveLength(1);
    expect(store.getState().cart[0].product.id).toBe(1);
  });

  it("adds product to wishlist", async () => {
    const user = userEvent.setup();
    const { store } = renderComponent();

    const buttons = screen.getAllByRole("button");

    await user.click(buttons[1]);

    expect(store.getState().wishlist).toHaveLength(1);
    expect(store.getState().wishlist[0].id).toBe(1);
  });

  it("shows Go To Cart if product already exists in cart", () => {
    renderComponent({
      cart: [
        {
          product,
          quantity: 1,
        },
      ],
    });

    expect(
      screen.getByRole("button", { name: /go to cart/i })
    ).toBeInTheDocument();
  });

  it("navigates to cart when Go To Cart is clicked", async () => {
    const user = userEvent.setup();

    renderComponent({
      cart: [
        {
          product,
          quantity: 1,
        },
      ],
    });

    await user.click(
      screen.getByRole("button", { name: /go to cart/i })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/cart");
  });
});