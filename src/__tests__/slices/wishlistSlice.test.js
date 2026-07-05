import wishlistReducer, {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/slices/wishlistSlice";

import { describe, it, expect } from "vitest";

const product = {
  id: 1,
  title: "Shirt",
  price: 20,
};

describe("wishlistSlice", () => {
  it("should return the initial state", () => {
    const state = wishlistReducer(undefined, { type: "unknown" });

    expect(state).toEqual([]);
  });

  it("should add a product to the wishlist", () => {
    const state = [];
    const newState = wishlistReducer(state, addToWishlist(product));

    expect(newState[0]).toEqual(product);
    expect(newState.length).toBe(1);
  });

  it("should not add duplicate products", () => {
    const state = [product];

    const newState = wishlistReducer(state, addToWishlist(product));

    expect(newState.length).toBe(1);
    expect(newState[0]).toEqual(product);
  });

  it("should remove a product", () => {
    const state = [product];

    const newState = wishlistReducer(state, removeFromWishlist(product.id));

    expect(newState).toEqual([]);
  });
});
