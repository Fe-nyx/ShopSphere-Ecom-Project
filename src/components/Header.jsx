import { Link } from "react-router-dom"

import { useSelector } from "react-redux"

function Header() {

  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);

  const cartTotal = cart.reduce((total, item) => {
    return total + item.quantity
  }, 0)

  const wishlistTotal = wishlist.length;




  return (
    <>
      <h1>Header</h1>
      <Link to="/">Home</Link>
      <Link to="/login">Log In</Link>
      <Link to="/wishlist">
        Wishlist ({wishlistTotal})
      </Link>
      <Link to="/cart">
        Cart ({cartTotal})
      </Link>
    </>
  )
}

export default Header