import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { FiSearch, FiHeart, FiShoppingCart, FiBell } from "react-icons/fi"

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
    
    // Thought of closing the search bar after submitting but later thought it was a bad UX choice
    // setShowSearch(false);
  }


  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">

      <div className="flex items-center justify-between px-4 py-3">

        <Link
          to="/"
          className="hover:text-blue-600"
        >
          <h1 className="text-2xl font-bold">
            ShopSphere
          </h1>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="text-xl cursor-pointer"
          >
            <FiSearch />
          </button>

          {showSearch && (
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-2"
            >

              <input
                className="border rounded px-3 py-1"
                placeholder="Search products..."
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
              />

              <button
                type="submit"
                className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Search
              </button>

            </form>
          )}
        </div>

        <div className="flex items-center gap-4">

          <Link
            to="/login"
            className="border px-3 py-1 rounded hover:bg-gray-100"
          >
            Log In
          </Link>

          <Link
            to="/wishlist"
            className="flex items-center gap-1"
          >
            <FiHeart className="text-xl" />
            <span
              className="
                bg-red-500
                text-white
                text-xs
                px-2
                rounded-full
              "
            >
              {wishlistCounter}
            </span>
          </Link>

          <Link
            to="/cart"
            className="flex items-center gap-1"
          >
            <FiShoppingCart className="text-xl" />
            <span
              className="
                bg-blue-500
                text-white
                text-xs
                px-2
                rounded-full
              "
            >
              {cartCounter}
            </span>
          </Link>

          <FiBell className="text-xl" />

        </div>

      </div>

    </header>
  )
}

export default Header