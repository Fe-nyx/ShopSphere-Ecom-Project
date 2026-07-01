import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom";
import { removeFromWishlist } from "../redux/slices/wishlistSlice";
import { FiTrash2 } from "react-icons/fi";


function WishlistPage() {

  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.wishlist);

  if (wishlist.length === 0) {
    return (
      <h1 className="text-xl md:text-2xl lg:3xl text-center font-semibold my-8 md:my-12">
        Your wishlist is empty
      </h1>
    );
  }



  return (
    <>
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center my-4 md:my-8">
        Wishlist
      </h1>

      {wishlist.map((item) => (
        <div
          key={item.id}
          className="border p-4 flex gap-2 md:gap-6 items-center"
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
              className="hover:text-blue-600 transition"
            >
              <p className="text-base md:text-lg font-semibold mb-1 md:mb-2 line-clamp-2">
                {item.title}
              </p>
            </Link>


            <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-8">
              Price: ${item.price}
            </p>

            <button
              onClick={() => dispatch(removeFromWishlist(item.id))}
              className="
                cursor-pointer
                border
                border-red-500
                text-red-500
                px-1
                py-1.5
                md:text-xl
                rounded
                hover:bg-red-500
                hover:text-white transition
              ">
              <FiTrash2/>
            </button>

          </div>

        </div>
      ))}
    </>
  )
}

export default WishlistPage