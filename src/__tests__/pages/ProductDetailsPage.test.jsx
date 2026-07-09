import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

import ProductDetailsPage from "../../pages/ProductDetailsPage";

import productDetailsReducer from "../../redux/slices/productDetailsSlice";
import cartReducer from "../../redux/slices/cartSlice";
import wishlistReducer from "../../redux/slices/wishlistSlice";

import * as productService from "../../services/productService";

//mocked productService
vi.mock("../../services/productService");

//Mocked Routing
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({
      id: "1",
    }),
  };
});

//Mocked API data
const mockProduct = {
  id: 1,
  title: "Laptop",
  price: 1200,
  description: "A powerful laptop.",
  category: "electronics",
  image: "laptop.jpg",
  rating: {
    rate: 4.5,
    count: 120,
  },
};

function renderComponent(preloadedState = {}) {
  const store = configureStore({
    reducer: {
      productDetails: productDetailsReducer,
      cart: cartReducer,
      wishlist: wishlistReducer,
    },
    preloadedState: {
      cart: [],
      wishlist: [],
      ...preloadedState,
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <ProductDetailsPage />
      </MemoryRouter>
    </Provider>,
  );
}

//Mocks cleared and user is setup before each test
let user;
beforeEach(() => {
  vi.clearAllMocks();
  user = userEvent.setup();
});

describe("ProductDetailsPage Integration", () => {
  it("fetches the correct product on mount", async () => {
    productService.getProductById.mockResolvedValue(mockProduct);

    renderComponent();

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    expect(await screen.findByText("Laptop")).toBeInTheDocument();

    expect(productService.getProductById).toHaveBeenCalledWith("1");
  });

  it("renders product information", async () => {
    productService.getProductById.mockResolvedValue(mockProduct);

    renderComponent();

    expect(await screen.findByText("Laptop")).toBeInTheDocument();

    expect(
      screen.getByRole("img", {
        name: "Laptop",
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("$1200")).toBeInTheDocument();

    expect(screen.getByText("Electronics")).toBeInTheDocument();

    expect(screen.getByText("A powerful laptop.")).toBeInTheDocument();

    expect(screen.getByText("(120 reviews)")).toBeInTheDocument();
  });

  it("renders error state when request fails", async () => {
    productService.getProductById.mockRejectedValue(
      new Error("Failed to fetch product"),
    );

    renderComponent();

    expect(await screen.findByText("Something went wrong")).toBeInTheDocument();

    expect(screen.getByText("Failed to fetch product")).toBeInTheDocument();
  });
});

describe("Cart and Wishlist UI", () => {
  it("shows 'Go To Cart' when product is already in cart", async () => {
    productService.getProductById.mockResolvedValue(mockProduct);

    renderComponent({
      cart: [
        {
          product: mockProduct,
          quantity: 1,
        },
      ],
    });

    expect(
      await screen.findByRole("button", {
        name: /go to cart/i,
      }),
    ).toBeInTheDocument();
  });

  it("navigates to cart when 'Go To Cart' is clicked", async () => {

    productService.getProductById.mockResolvedValue(mockProduct);

    renderComponent({
      cart: [
        {
          product: mockProduct,
          quantity: 1,
        },
      ],
    });

    await user.click(
      await screen.findByRole("button", {
        name: /go to cart/i,
      }),
    );

    expect(mockNavigate).toHaveBeenCalledWith("/cart");
  });

  it("shows 'Add to Wishlist' button when product is not wishlisted", async () => {
    productService.getProductById.mockResolvedValue(mockProduct);

    renderComponent();

    expect(
      await screen.findByRole("button", {
        name: /add to wishlist/i,
      }),
    ).toBeInTheDocument();
  });

  it("shows 'Remove from Wishlist' button when product is wishlisted", async () => {
    productService.getProductById.mockResolvedValue(mockProduct);

    renderComponent({
      wishlist: [mockProduct],
    });

    expect(
      await screen.findByRole("button", {
        name: /remove from wishlist/i,
      }),
    ).toBeInTheDocument();
  });
});
