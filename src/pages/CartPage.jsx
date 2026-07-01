import { useSelector, useDispatch } from "react-redux"

import { deleteFromCart, increaseQty, decreaseQty } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";

import { FiTrash2 } from "react-icons/fi";

function CartPage() {

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const cartTotal = cart.reduce(
    (total, item) => {
      return total + item.product.price * item.quantity
    }, 0
  );




  if (cart.length === 0) {
    return (<h1 className="text-xl md:text-2xl lg:3xl text-center font-semibold my-8 md:my-12">
      Your Shopping Cart is empty
    </h1>)
  }


  return (
    <>
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center my-4 md:my-8">
        Shopping Cart
      </h1>

      {cart.map((item) => (
        <div
          key={item.product.id}
          className="border p-4 flex gap-2 md:gap-6 items-center"
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
              to={`/product/${item.id}`}
              className="hover:text-blue-600 transition"
            >
              <p className="text-base md:text-lg font-semibold mb-1 md:mb-2 line-clamp-2">
                {item.product.title}
              </p>
            </Link>


            <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-8">
              Price: ${item.product.price}
            </p>

            <div className="flex items-center gap-2 md:gap-3 my-3">

              <button
                onClick={() => dispatch(increaseQty(item.product.id))}
                className="cursor-pointer border md:text-xl px-1.5 md:px-2 pb-0.5 md:pb-1 rounded"
              >
                +
              </button>

              <span className="font-semibold text-sm md:text-base">
                {item.quantity}
              </span>

              <button
                onClick={() => dispatch(decreaseQty(item.product.id))}
                className="cursor-pointer border md:text-xl px-2 md:px-2.75 pb-0.5 md:pb-1 rounded"
              >
                -
              </button>

            </div>

            <button
              onClick={() => dispatch(deleteFromCart(item.product.id))}
              className="
                cursor-pointer
                border
                border-red-500
                text-red-500
                px-1
                py-1.5
                md:text-xl
                rounded
                hover:bg-red-500
                hover:text-white transition
              ">
              <FiTrash2/>
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
          className="cursor-pointer w-full bg-black text-white py-2 md:py-3 rounded hover:bg-gray-800 transition"
        >
          Proceed to Checkout
        </button>

      </div>
    </>
  )
}

export default CartPage