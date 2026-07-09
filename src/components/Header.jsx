import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";

import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiBell,
  FiUser,
  FiX,
} from "react-icons/fi";

import { updateSearchValue } from "../redux/slices/searchSlice";
import logo from "../assets/logo.png";



function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);

  const [showSearch, setShowSearch] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const cartCounter = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  const wishlistCounter = wishlist.length;

  function handleSearchSubmit(event) {
    //to prevent browser from reloading the page
    event.preventDefault();
    //Navigate to home after submission
    navigate("/");
    //update redux state with latest search value
    dispatch(updateSearchValue(inputValue.trim()));

    // Thought of closing the search bar after submitting but later thought it was a bad UX choice
    // setShowSearch(false);
  }

  //Focusing on input when search is clicked
  const inputRef = useRef(null);
  useEffect(()=>{
    if(showSearch) {
      inputRef.current?.focus();
    }
  }, [showSearch]);

  return (
    <header className="sticky top-0 z-50 shadow-md bg-[var(--color-beige)] text-[var(--color-coal)]">
      <div className="flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="ShopSphere Logo"
            className="h-10 md:h-15 w-10 md:w-15 object-contain"
          />

          <h1 className="hidden md:block text-2xl font-brand font-bold hover:text-[var(--color-slate)]/90">
            ShopSphere
          </h1>
        </Link>

        <div className="flex items-center gap-3 md:gap-5">
          
          {/* Search Button */}
          <button
            onClick={() => setShowSearch((prev) => !prev)}
            aria-label={showSearch ? "Close Search" : "Open Search"}
            className="text-xl md:text-2xl cursor-pointer hover:text-[var(--color-slate)]/90"
          >
            {showSearch ? <FiX /> : <FiSearch />}
          </button>


          {/* Login Page */}
          <Link to="/login" aria-label="Login">
            <FiUser className="text-xl md:text-2xl hover:text-[var(--color-slate)]/90" />
          </Link>


          {/* Wishlist */}
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="flex items-center gap-0.5 hover:text-[var(--color-slate)]/90"
          >
            <FiHeart className="text-xl md:text-2xl" />
            <span
              className="
                bg-[var(--color-coal)]
                text-white
                text-xs
                px-2
                rounded-full
              "
            >
              {wishlistCounter}
            </span>
          </Link>


          {/* Cart */}
          <Link
            to="/cart"
            aria-label="Cart"
            className="flex items-center gap-0.5 hover:text-[var(--color-slate)]/90"
          >
            <FiShoppingCart className="text-xl md:text-2xl" />
            <span
              className="
                bg-[var(--color-coal)]
                text-white
                text-xs
                px-2
                rounded-full
              "
            >
              {cartCounter}
            </span>
          </Link>


          <FiBell className="text-xl md:text-2xl hover:text-[var(--color-slate)]/90 cursor-pointer" />
        </div>
      </div>

      {showSearch && (
        <div className="border-t p-1 md:p-2">
          <form onSubmit={handleSearchSubmit} className="flex gap-1 md:gap-2">
            <input
              className="
                text-sm md:text-base
                flex-1
                px-1 md:px-3
                py-1 md:py-2
                input
              "
              ref={inputRef}
              placeholder="Search Products..."
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
            />

            <button
              type="submit"
              className="
                text-sm md:text-base
                px-3 md:px-4
                py-1 md:py-2
                btn-primary
              "
            >
              Search
            </button>
          </form>
        </div>
      )}
    </header>
  );
}

export default Header;
