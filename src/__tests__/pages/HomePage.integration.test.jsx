// HomePage.integration.test.jsx

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { vi, beforeEach, describe, it, expect } from "vitest";

import HomePage from "../../pages/HomePage";

import productsReducer from "../../redux/slices/productsSlice";
import searchReducer from "../../redux/slices/searchSlice";

import * as productService from "../../services/productService";

vi.mock("../../services/productService");

// Mock child components so we're only testing HomePage
vi.mock("../../components/ProductCard", () => ({
  default: ({ product }) => (
    <div data-testid="product-card">
      {product.title}
    </div>
  ),
}));

vi.mock("../../components/Banner", () => ({
  default: () => <div data-testid="banner" />,
}));

vi.mock("../../components/WhatWeSell", () => ({
  default: () => <div data-testid="what-we-sell" />,
}));

vi.mock("../../components/FAQ", () => ({
  default: () => <div data-testid="faq" />,
}));

window.HTMLElement.prototype.scrollIntoView = vi.fn();

const mockProducts = [
  {
    id: 1,
    title: "Laptop",
    image: "laptop.jpg",
    price: 1000,
    category: "electronics",
    rating: {
      rate: 4.5,
      count: 120,
    },
  },
  {
    id: 2,
    title: "Ring",
    image: "ring.jpg",
    price: 100,
    category: "jewelery",
    rating: {
      rate: 4.2,
      count: 50,
    },
  },
  {
    id: 3,
    title: "Phone",
    image: "phone.jpg",
    price: 500,
    category: "electronics",
    rating: {
      rate: 4.7,
      count: 200,
    },
  },
];

function renderComponent(preloadedState = {}) {
  const store = configureStore({
    reducer: {
      products: productsReducer,
      search: searchReducer,
    },
    preloadedState: {
      search: {
        searchValue: "",
      },
      ...preloadedState,
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </Provider>
  );
}

let user;

beforeEach(() => {
  vi.clearAllMocks();
  user = userEvent.setup();
});

describe("HomePage Integration", () => {
  it("fetches and displays products", async () => {
    productService.getAllProducts.mockResolvedValue(mockProducts);

    renderComponent();

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    expect(
      await screen.findAllByTestId("product-card")
    ).toHaveLength(3);
  });

  it("shows error state when API request fails", async () => {
    productService.getAllProducts.mockRejectedValue(
      new Error("Failed to fetch products")
    );

    renderComponent();

    expect(
      await screen.findByText("Something went wrong")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Failed to fetch products")
    ).toBeInTheDocument();
  });

  it("filters products by category", async () => {
    productService.getAllProducts.mockResolvedValue(mockProducts);

    renderComponent();

    await screen.findAllByTestId("product-card");

    await user.click(
      screen.getByRole("button", {
        name: /electronics/i,
      })
    );

    expect(screen.getByText("Laptop")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();

    expect(
      screen.queryByText("Ring")
    ).not.toBeInTheDocument();

    expect(
      screen.getAllByTestId("product-card")
    ).toHaveLength(2);
  });

  it("shows 'No products found' when search has no matches", async () => {
    productService.getAllProducts.mockResolvedValue(mockProducts);

    renderComponent({
      search: {
        searchValue: "xyz",
      },
    });

    expect(
      await screen.findByText("No products found")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Try searching for another product.")
    ).toBeInTheDocument();
  });
});