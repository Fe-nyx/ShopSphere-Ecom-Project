import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { removeFromWishlist } from "../redux/slices/wishlistSlice";
import EmptyState from "../components/EmptyState";

import { FiTrash2, FiHeart } from "react-icons/fi";

function WishlistPage() {
  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.wishlist);

  if (wishlist.length === 0) {
    return (
      <EmptyState
        illustration={
          <FiHeart
            className="
            text-7xl
            md:text-8xl
            text-[var(--color-brown)]/80
          "
          />
        }
        title="Your wishlist is empty"
        description="Save products you love and come back to them anytime."
        buttonText="Discover Products"
        to="/"
      />
    );
  }

  return (
    <>
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center my-4 md:my-8 text-[var(--color-coal)]">
        Wishlist
      </h1>

      {wishlist.map((item) => (
        <div
          key={item.id}
          className="border bg-white rounded-md p-4 flex gap-2 md:gap-6 items-center m-2 md:mx-4"
        >
          <Link
            to={`/product/${item.id}`}
            className="hover:opacity-80 transition"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-32 md:w-48 h-32 md:h-48 object-contain"
            />
          </Link>

          <div className="flex-1">
            <Link
              to={`/product/${item.id}`}
              className="text-[var(--color-coal)] hover:text-[var(--color-slate)]/80"
            >
              <p className="text-base md:text-lg font-semibold mb-1 md:mb-2 line-clamp-2">
                {item.title}
              </p>
            </Link>

            <p className="text-sm md:text-base mb-4 md:mb-8 text-[var(--color-slate)]">
              Price: ${item.price}
            </p>

            <button
              onClick={() => dispatch(removeFromWishlist(item.id))}
              className="
                px-1
                py-1.5
                md:text-xl
                btn-danger
              "
            >
              <FiTrash2 />
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default WishlistPage;
