import { useSelector, useDispatch } from "react-redux"

import { deleteFromCart, increaseQty, decreaseQty } from "../redux/slices/cartSlice";



function CartPage() {

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const cartTotal = cart.reduce(
    (total, item) => {
      return total + item.product.price * item.quantity
    }, 0
  );




  if (cart.length === 0) {
    return <h1>Your cart is empty</h1>;
  }


  return (
    <>
      <h1>CartPage</h1>

      {cart.map((item) => (
        <div
          key={item.product.id}
          className="border p-4"
        >
          <img
            src={item.product.image}
            alt={item.product.title}
            className="w-48 h-48 object-contain"
          />
          <p>{item.product.title}</p>
          <p>Price: {item.product.price}</p>
          <button onClick={()=> dispatch(increaseQty(item.product.id))}>
            +
          </button>
          <p>Quantity: {item.quantity}</p>
          <button onClick={()=> dispatch(decreaseQty(item.product.id))}>
            -
          </button>
          <button onClick={() => dispatch(deleteFromCart(item.product.id))}>
            Delete
          </button>
          <p>Subtotal: {(item.product.price * item.quantity).toFixed(2)}</p>
        </div>
      ))}

      <p>Cart Total: ${cartTotal.toFixed(2)}</p>
    </>
  )
}

export default CartPage