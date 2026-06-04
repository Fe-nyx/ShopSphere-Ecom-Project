import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addToCart } from "../redux/slices/cartSlice"
import { addToWishlist } from "../redux/slices/wishlistSlice";

function ProductCard({ product }) {

    const dispatch = useDispatch();
    const rating = Math.round(product.rating.rate);

    return (
        <div className="border rounded p-4 hover:shadow-lg h-full flex flex-col">

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

                    <p className="text-lg font-bold mb-2">
                        ${product.price}
                    </p>

                    <p className="text-sm text-gray-500 mb-4">
                        {product.category}
                    </p>

                </div>
            </Link>

            <div className="flex gap-2">
                <button
                    className="flex-1 bg-black text-white px-3 py-1 rounded mr-2"
                    onClick={() => dispatch(addToCart(product))}
                >
                    Add To Cart
                </button>

                <button
                    className="flex-1 border px-3 py-1 rounded"
                    onClick={() => dispatch(addToWishlist(product))}
                >
                    Add To Wishlist
                </button>
            </div>
        </div>

    )
}

export default ProductCard