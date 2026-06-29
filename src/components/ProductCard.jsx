import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../redux/slices/cartSlice"
import { addToWishlist, removeFromWishlist } from "../redux/slices/wishlistSlice";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

function ProductCard({ product }) {

    const cart = useSelector((state) => state.cart);
    const wishlist = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const rating = Math.round(product.rating.rate);
    //Original Price is fabricated since FakeStore API does not provide original price or discounted price
    const originalPrice = (product.price * 1.2).toFixed(2);

    const inCart = cart.some((item) => {
        return item.product.id === product.id;
    });

    const inWishlist = wishlist.some((item) => {
        return item.id === product.id;
    });

    return (
        <div className="border rounded p-4 h-full flex flex-col transition duration-200 hover:shadow-lg hover:-translate-y-1">

            <Link to={`/product/${product.id}`}>
                <div className="flex-grow">

                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-56 object-contain mb-4"
                    />

                    <p className="font-semibold mb-2 line-clamp-2">
                        {product.title}
                    </p>

                    <p className="text-yellow-500 mb-2">
                        {"★".repeat(rating)}
                    </p>

                    <div className="mb-2">
                        <span className="text-lg font-bold">
                            ${product.price}
                        </span>

                        <span className="text-sm text-gray-500 line-through ml-2">
                            ${originalPrice}
                        </span>
                    </div>

                    <p className="text-sm text-gray-500 mb-4">
                        {product.category}
                    </p>

                </div>
            </Link>

            <div className="flex gap-2">
                <button
                    className="flex-1 bg-black text-white px-3 py-1 rounded mr-2"
                    onClick={() => {
                        if (inCart) {
                            navigate("/cart");
                        }
                        else {
                            dispatch(addToCart(product));
                        }
                    }}
                >
                    {inCart ? "Go To Cart" : "Add To Cart"}
                </button>

                <button
                    className="border rounded px-3 py-2 hover:bg-gray-100 transition"
                    onClick={() => {
                        if (inWishlist) {
                            dispatch(removeFromWishlist(product.id));
                        }
                        else {
                            dispatch(addToWishlist(product));
                        }
                    }}
                >
                    {inWishlist ? (
                        <FaHeart className="text-red-500 text-xl" />
                    ) : (
                        <FiHeart className="text-xl" />
                    )}
                </button>
            </div>
        </div>

    )
}

export default ProductCard