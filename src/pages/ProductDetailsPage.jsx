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
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";

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
    return <LoadingSpinner />;
  }

  if (status === "failed") {
    return <ErrorState message={error} />;
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
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-4 text-[var(--color-coal)]">
            {productDetails?.title}
          </h1>

          <div className="mb-2 md:mb-4 text-[var(--color-coal)]">
            <p className="text-xl md:text-2xl lg:text-3xl font-bold">
              ${productDetails?.price}
            </p>

            <p className="text-sm md:text-base text-[var(--color-slate)]/70 line-through">
              ${originalPrice}
            </p>
          </div>

          <p className="text-[var(--color-slate)]/70 mb-2">
            {formatCategory(productDetails?.category)}
          </p>

          <div className="flex items-center mb-4 gap-1">
            <span className="text-[var(--color-brown)]">
              {"★".repeat(rating)}
              {"☆".repeat(5 - rating)}
            </span>

            <span className="text-[var(--color-brown)]/80 text-sm">
              ({productDetails?.rating?.count} reviews)
            </span>
          </div>

          <div className="flex gap-3 mb-4">
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
              aria-label={
                inWishlist ? "Remove from Wishlist" : "Add to Wishlist"
              }
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
                <FaHeart className="text-[var(--color-brown)] text-xl" />
              ) : (
                <FiHeart className="text-xl" />
              )}
            </button>
          </div>

          <div className="text-sm md:text-base bg-[var(--color-beige)] rounded p-2 md:p-4 mb-4 md:mb-6 text-[var(--color-coal)]/70">
            <p>✓ Free Shipping</p>
            <p>✓ Secure Payment</p>
            <p>✓ Easy Returns</p>
          </div>

          <p className="text-[var(--color-coal)] leading-relaxed mb-4 md:mb-6">
            {productDetails?.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
