import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { FiSearch, FiHeart, FiShoppingCart, FiBell, FiUser, FiX } from "react-icons/fi"

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
    navigate("/");
    dispatch(updateSearchValue(inputValue.trim()));
    
    
    // Thought of closing the search bar after submitting but later thought it was a bad UX choice
    // setShowSearch(false);
  }


  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">

      <div className="flex items-center justify-between px-2 md:px-4 py-2 md:py-3">

        <Link
          to="/"
          className="hover:text-blue-600"
        >
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
            ShopSphere
          </h1>
        </Link>

          

        <div className="flex items-center gap-3 md:gap-5">

          <button
            onClick={() => setShowSearch(!showSearch)}
            className="text-xl md:text-2xl cursor-pointer"
          >
            {showSearch ? <FiX /> : <FiSearch />}
          </button>

          <Link
            to="/login"
          >
            <FiUser className="text-xl md:text-2xl"/>
          </Link>

          <Link
            to="/wishlist"
            className="flex items-center gap-0.5"
          >
            <FiHeart className="text-xl md:text-2xl" />
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
            className="flex items-center gap-0.5"
          >
            <FiShoppingCart className="text-xl md:text-2xl" />
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

          <FiBell className="text-xl md:text-2xl" />

        </div>

      </div>

      {showSearch && (
        <div className="border-t p-1 md:p-2">
          <form
            onSubmit={handleSearchSubmit}
            className="flex gap-1 md:gap-2"
          >
            <input
              className="flex-1 border rounded px-1 md:px-3 md:py-2"
              placeholder="Search Products..."
              value={inputValue}
              onChange={(event)=>setInputValue(event.target.value)}
            />

            <button
                type="submit"
                className="bg-blue-500 text-white px-3 md:px-4 rounded hover:bg-blue-600 cursor-pointer"
            >
              Search
            </button>
          </form>
        </div>
      )}

    </header>
  )
}

export default Header