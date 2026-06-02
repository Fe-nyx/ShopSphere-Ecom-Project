import { Link } from "react-router-dom"



function Header() {

  return (
    <>
      <h1>Header</h1>
      <Link to="/">Home</Link>
      <Link to="/login">Log In</Link>
      <Link to="/wishlist">Wishlist</Link>
      <Link to="/cart">Cart</Link>
    </>
  )
}

export default Header