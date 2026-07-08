import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

import Header from "../../components/Header";

import cartReducer from "../../redux/slices/cartSlice";
import wishlistReducer from "../../redux/slices/wishlistSlice";
import searchReducer from "../../redux/slices/searchSlice";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderComponent(preloadedState = {}) {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
      wishlist: wishlistReducer,
      search: searchReducer,
    },
    preloadedState: {
      cart: [],
      wishlist: [],
      search: {
        searchValue: "",
      },
      ...preloadedState,
    },
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    ),
  };
}

describe("Header", () => {
  it("renders logo and default counters", () => {
    renderComponent();

    expect(
      screen.getByAltText("ShopSphere Logo")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /cart/i })
    ).toHaveTextContent("0");

    expect(
      screen.getByRole("link", { name: /wishlist/i })
    ).toHaveTextContent("0");
  });

  it("shows correct cart and wishlist counters", () => {
    renderComponent({
      cart: [
        {
          product: { id: 1 },
          quantity: 2,
        },
        {
          product: { id: 2 },
          quantity: 1,
        },
      ],
      wishlist: [
        { id: 1 },
        { id: 2 },
      ],
    });

    expect(
      screen.getByRole("link", { name: /cart/i })
    ).toHaveTextContent("3");

    expect(
      screen.getByRole("link", { name: /wishlist/i })
    ).toHaveTextContent("2");
  });

  it("opens the search bar", async () => {
    const user = userEvent.setup();

    renderComponent();

    await user.click(
      screen.getByRole("button", { name: /open search/i })
    );

    expect(
      screen.getByPlaceholderText("Search Products...")
    ).toBeInTheDocument();
  });

  it("updates the Redux search value", async () => {
    const user = userEvent.setup();

    const { store } = renderComponent();

    await user.click(
      screen.getByRole("button", { name: /open search/i })
    );

    await user.type(
      screen.getByPlaceholderText("Search Products..."),
      "Laptop"
    );

    await user.click(
      screen.getByRole("button", { name: /^search$/i })
    );

    expect(
      store.getState().search.searchValue
    ).toBe("Laptop");
  });

  it("navigates home after searching", async () => {
    const user = userEvent.setup();

    renderComponent();

    await user.click(
      screen.getByRole("button", { name: /open search/i })
    );

    await user.type(
      screen.getByPlaceholderText("Search Products..."),
      "Laptop"
    );

    await user.click(
      screen.getByRole("button", { name: /^search$/i })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});