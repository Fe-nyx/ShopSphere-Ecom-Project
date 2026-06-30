import { useSelector, useDispatch } from "react-redux"

import { deleteFromCart, increaseQty, decreaseQty } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";



function CartPage() {

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const cartTotal = cart.reduce(
    (total, item) => {
      return total + item.product.price * item.quantity
    }, 0
  );




  if (cart.length === 0) {
    return (<h1 className="text-3xl text-center font-semibold my-12">
      Your wishlist is empty
    </h1>)
  }


  return (
    <>
      <h1 className="text-3xl font-bold text-center my-8">
        Shopping Cart
      </h1>

      {cart.map((item) => (
        <div
          key={item.product.id}
          className="border p-4 flex flex-col md:flex-row gap-6 items-center"
        >
          <Link
            to={`/product/${item.product.id}`}
            className="hover:opacity-80 transition"
          >
            <img
              src={item.product.image}
              alt={item.product.title}
              className="w-48 h-48 object-contain"
            />
          </Link>


          <div className="flex-1">

            <Link
              to={`/product/${item.id}`}
              className="hover:text-blue-600 transition"
            >
              <p className="text-lg font-semibold mb-2">
                {item.product.title}
              </p>
            </Link>


            <p className="text-gray-600">
              Price: ${item.product.price}
            </p>

            <div className="flex items-center gap-3 my-3">

              <button
                onClick={() => dispatch(increaseQty(item.product.id))}
                className="cursor-pointer border px-3 py-1 rounded"
              >
                +
              </button>

              <span className="font-semibold">
                {item.quantity}
              </span>

              <button
                onClick={() => dispatch(decreaseQty(item.product.id))}
                className="cursor-pointer border px-3 py-1 rounded"
              >
                -
              </button>

            </div>

            <button
              onClick={() => dispatch(deleteFromCart(item.product.id))}
              className="cursor-pointer mt-3 border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-500 hover:text-white transition"
            >
              Remove
            </button>

            <p className="font-bold mt-3">
              Subtotal: ${(item.product.price * item.quantity).toFixed(2)}
            </p>
          </div>


        </div>
      ))}

      <div className="mt-8 border rounded-lg p-6 max-w-sm ml-auto shadow-sm">

        <p className="text-xl font-bold mb-4">
          Cart Total: ${cartTotal.toFixed(2)}
        </p>

        <button
          className="cursor-pointer w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
        >
          Proceed to Checkout
        </button>

      </div>
    </>
  )
}

export default CartPage