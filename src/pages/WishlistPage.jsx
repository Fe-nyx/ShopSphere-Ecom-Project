import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom";
import { removeFromWishlist } from "../redux/slices/wishlistSlice";



function WishlistPage() {

  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.wishlist);

  if (wishlist.length === 0) {
    return (
      <h1 className="text-3xl text-center font-semibold my-12">
        Your wishlist is empty
      </h1>
    );
  }



  return (
    <>
      <h1 className="text-3xl font-bold text-center my-8">
        Wishlist
      </h1>

      {wishlist.map((item) => (
        <div
          key={item.id}
          className="border p-4 flex flex-col md:flex-row gap-6 items-center"
        >
          <Link
          to={`/product/${item.id}`}
          className="hover:opacity-80 transition"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-48 h-48 object-contain"
            />
          </Link>


          <div className="flex-1">

            <Link
              to={`/product/${item.id}`}
              className="hover:text-blue-600 transition"
            >
              <p className="text-lg font-semibold mb-2">
                {item.title}
              </p>
            </Link>


            <p className="text-gray-600 mb-4">
              Price: ${item.price}
            </p>

            <button
              onClick={() => dispatch(removeFromWishlist(item.id))}
              className="cursor-pointer border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-500 hover:text-white transition"
            >
              Remove
            </button>

          </div>

        </div>
      ))}
    </>
  )
}

export default WishlistPage