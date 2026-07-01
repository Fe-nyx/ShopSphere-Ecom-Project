import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { fetchProductDetails } from "../redux/slices/productDetailsSlice";
import { addToCart } from "../redux/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/slices/wishlistSlice";

import { formatCategory } from "../utils/formatCategory";

import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

function ProductDetailsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  const { productDetails, status, error } = useSelector(
    (state) => state.productDetails,
  );
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);

  const inCart = cart.some((item) => {
    return item.product.id === productDetails?.id;
  });

  const inWishlist = wishlist.some((item) => {
    return item.id === productDetails?.id;
  });

  if (status === "loading") {
    return <h1>Product is loading...Please Wait</h1>;
  }

  if (status === "failed") {
    return <h1>{error}</h1>;
  }

  const rating = Math.round(productDetails?.rating?.rate || 0);

  //Original Price is fabricated since FakeStore API does not provide original price or discounted price
  const originalPrice = (productDetails?.price * 1.2).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="grid md:grid-cols-2 gap-4 md:gap-8">
        <div className="flex justify-center items-center">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            className="w-full max-w-md h-56 md:h-96 object-contain mx-auto my-4"
          />
        </div>

        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-4">
            {productDetails?.title}
          </h1>

          <div className="mb-2 md:mb-4">
            <p className="text-xl md:text-2xl lg:text-3xl font-bold">
              ${productDetails?.price}
            </p>

            <p className="text-sm md:text-base text-gray-500 line-through">
              ${originalPrice}
            </p>
          </div>

          <p className="text-gray-500 mb-2">
            {formatCategory(productDetails?.category)}
          </p>

          <div className="flex items-center mb-4 gap-1">
            <span className="text-yellow-500">
              {"★".repeat(rating)}
              {"☆".repeat(5 - rating)}
            </span>

            <span className="text-gray-600 text-sm">
              ({productDetails?.rating?.count} reviews)
            </span>
          </div>

          <div className="text-sm md:text-base bg-gray-100 rounded p-2 md:p-4 mb-4 md:mb-6 text-green-600">
            <p>✓ Free Shipping</p>
            <p>✓ Secure Payment</p>
            <p>✓ Easy Returns</p>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4 md:mb-6">
            {productDetails?.description}
          </p>

          <div className="flex gap-3">
            <button
              className="
                px-6
                py-2
                mr-2
                flex-1
                btn-primary
              "
              onClick={() => {
                if (inCart) {
                  navigate("/cart");
                } else {
                  dispatch(addToCart(productDetails));
                }
              }}
            >
              {inCart ? "Go To Cart" : "Add To Cart"}
            </button>

            <button
              onClick={() => {
                if (inWishlist) {
                  dispatch(removeFromWishlist(productDetails.id));
                } else {
                  dispatch(addToWishlist(productDetails));
                }
              }}
              className="px-4 py-2 btn-secondary"
            >
              {inWishlist ? (
                <FaHeart className="text-red-500 text-xl" />
              ) : (
                <FiHeart className="text-xl" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
