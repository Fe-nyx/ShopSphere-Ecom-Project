import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { FiSearch } from "react-icons/fi"

import { updateSearchValue } from "../redux/slices/searchSlice";
import { useState } from "react";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);

  const [showSearch, setShowSearch] = useState(false);
  const [inputValue, setInputValue] = useState("");



  const cartCounter = cart.reduce((total, item) => {
    return total + item.quantity
  }, 0)

  const wishlistCounter = wishlist.length;

  function handleSearchSubmit(event) {
    event.preventDefault();

    dispatch(updateSearchValue(inputValue.trim()));

    navigate("/");
  }


  return (
    <>
      <h1>Header</h1>

      <button
        onClick={() => setShowSearch(!showSearch)}
      >
        <FiSearch />
      </button>

      {showSearch && (
        <form onSubmit={handleSearchSubmit}>
          <input
            className="border"
            value={inputValue}
            onChange={(event)=>setInputValue(event.target.value)}
          />

          <button
            type="submit"
          >
            Search
          </button>

        </form>
      )}

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