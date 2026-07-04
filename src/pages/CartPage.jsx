import { useSelector, useDispatch } from "react-redux";

import {
  deleteFromCart,
  increaseQty,
  decreaseQty,
} from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";

import { FiTrash2, FiShoppingCart } from "react-icons/fi";

import EmptyState from "../components/EmptyState";

function CartPage() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const cartTotal = cart.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  if (cart.length === 0) {
    return (
      <EmptyState
        illustration={
          <FiShoppingCart
            className="
            text-7xl
            md:text-8xl
            text-[var(--color-brown)]/80
          "
          />
        }
        title="Your cart is empty"
        description="Looks like you haven't added anything to your cart yet."
        buttonText="Continue Shopping"
        to="/"
      />
    );
  }

  return (
    <div className="text-[var(--color-coal)]">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center my-4 md:my-8">
        Shopping Cart
      </h1>

      {cart.map((item) => (
        <div
          key={item.product.id}
          className="border rounded-md bg-white p-4 flex gap-2 md:gap-6 items-center m-2 md:mx-4"
        >
          <Link
            to={`/product/${item.product.id}`}
            className="hover:opacity-80 transition"
          >
            <img
              src={item.product.image}
              alt={item.product.title}
              className="w-32 md:w-48 h-32 md:h-48 object-contain"
            />
          </Link>

          <div className="flex-1">
            <Link
              to={`/product/${item.product.id}`}
              className="hover:text-[var(--color-slate)]/80"
            >
              <p className="text-base md:text-lg font-semibold mb-1 md:mb-2 line-clamp-2">
                {item.product.title}
              </p>
            </Link>

            <p className="text-sm md:text-base text-[var(--color-slate)]/80 mb-4 md:mb-8">
              Price: ${item.product.price}
            </p>

            <div className="flex items-center gap-2 md:gap-3 my-3">
              <button
                onClick={() => dispatch(increaseQty(item.product.id))}
                className="md:text-xl px-1.5 md:px-2 pb-0.5 md:pb-1 btn-secondary"
              >
                +
              </button>

              <span className="font-semibold text-sm md:text-base">
                {item.quantity}
              </span>

              <button
                onClick={() => dispatch(decreaseQty(item.product.id))}
                className="md:text-xl px-2 md:px-2.75 pb-0.5 md:pb-1 btn-secondary"
              >
                -
              </button>
            </div>

            <button
              onClick={() => dispatch(deleteFromCart(item.product.id))}
              className="
                px-1
                py-1.5
                md:text-xl
                btn-danger
              "
            >
              <FiTrash2 />
            </button>

            <p className="font-bold mt-3">
              Subtotal: ${(item.product.price * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      ))}

      <div className="mt-8 mx-2 border rounded-lg p-2 md:p-4 max-w-sm ml-auto shadow-sm">
        <p className="text-lg md:text-xl font-bold mb-2 md:mb-4">
          Cart Total: ${cartTotal.toFixed(2)}
        </p>

        <button
          className="
            w-full
            py-2 md:py-3
            btn-primary
          "
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default CartPage;
