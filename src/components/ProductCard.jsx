import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { addToCart } from "../redux/slices/cartSlice"
import { addToWishlist, removeFromWishlist } from "../redux/slices/wishlistSlice";

import { formatCategory } from "../utils/formatCategory";

import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

function ProductCard({ product }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const wishlist = useSelector((state) => state.wishlist);


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
        <div className="border rounded p-2 md:p-4 h-full flex flex-col transition duration-200 hover:shadow-lg hover:-translate-y-1">

            <Link to={`/product/${product.id}`}>
                <div className="flex-grow">

                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-40 md:h-56 object-contain mb-4 md:mb-8"
                    />

                    <p className="font-semibold text-base md:text-lg md:mb-2 h-12 md:h-14 line-clamp-2">
                        {product.title}
                    </p>

                    <div className="flex items-center md:mb-2 gap-1">
                        <span className="text-yellow-500">
                            {"★".repeat(rating)}
                            {"☆".repeat(5 - rating)}
                        </span>

                        <span className="text-gray-600 text-sm">
                            ({product.rating.count})
                        </span>
                    </div>

                    <div className="flex items-center md:mb-2 gap-1">
                        <span className="text-lg md:text-xl font-semibold">
                            ${product.price}
                        </span>

                        <span className="text-sm text-gray-500 line-through">
                            ${originalPrice}
                        </span>
                    </div>

                    <p className="text-sm text-gray-500 mb-2 md:mb-4">
                        {formatCategory(product.category)}
                    </p>

                </div>
            </Link>

            <div className="flex gap-2 md:gap-4">
                <button
                    className="
                        flex-1
                        px-2
                        py-1 md:py-2
                        pb-1.5
                        btn-primary
                    "
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
                    className="px-4 py-1 md:py-2 btn-secondary"
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