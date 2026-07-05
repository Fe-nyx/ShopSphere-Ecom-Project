import { describe, it, expect } from "vitest";
import cartReducer, {
  addToCart,
  deleteFromCart,
  increaseQty,
  decreaseQty,
} from "../../redux/slices/cartSlice";

const product = {
  id: 1,
  title: "Shirt",
  price: 20,
};

const cartItem = {
  product,
  quantity: 1,
};

describe("cartSlice", () => {
  it("should return the initial state", () => {
    const state = cartReducer(undefined, { type: "unknown" });

    expect(state).toEqual([]);
  });

  it("should add a new product", () => {
    const state = [];
    const newState = cartReducer(state, addToCart(product));

    
    expect(newState.length).toBe(1);
    expect(newState[0].product).toEqual(product);
    expect(newState[0].quantity).toBe(1);
  });

  it("should increase quantity if product already in cart", () => {
    const state = [cartItem];
    const newState = cartReducer(state, addToCart(product));

    expect(newState.length).toBe(1);
    expect(newState[0].quantity).toBe(2);
  });

  it("should delete a product", () => {
    const state = [cartItem];
    const newState = cartReducer(state, deleteFromCart(product.id));

    expect(newState).toEqual([]);
  });

  it("should increase quantity of products in cart", () => {
    const state = [cartItem];
    const newState = cartReducer(state, increaseQty(product.id));

    expect(newState[0].quantity).toBe(2);
  });

  it("should decrease quantity of products in cart", () => {
    const state = [
      {
        product,
        quantity: 2,
      },
    ];
    const newState = cartReducer(state, decreaseQty(product.id));

    expect(newState[0].quantity).toBe(1);
  });

  it("should delete the product when qty reaches 0", () => {
    const state = [cartItem];
    const newState = cartReducer(state, decreaseQty(product.id));

    expect(newState).toEqual([]);
  });
});
