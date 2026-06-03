import { Link } from "react-router-dom"

import { useSelector } from "react-redux"

function Header() {

  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);

  const cartCounter = cart.reduce((total, item) => {
    return total + item.quantity
  }, 0)

  const wishlistCounter = wishlist.length;




  return (
    <>
      <h1>Header</h1>
      <Link to="/">Home</Link>
      <Link to="/login">Log In</Link>
      <Link to="/wishlist">
        Wishlist ({wishlistCounter})
      </Link>
      <Link to="/cart">
        Cart ({cartCounter})
      </Link>
    </>
  )
}

export default Header