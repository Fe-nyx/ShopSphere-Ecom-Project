import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom"
import { fetchProductDetails } from "../redux/slices/productDetailsSlice";
import { addToCart } from "../redux/slices/cartSlice";
import { addToWishlist } from "../redux/slices/wishlistSlice";

function ProductDetailsPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchProductDetails(id))
  }, [dispatch, id]);

  const { productDetails, status, error } = useSelector((state) => state.productDetails)

  if (status === "loading") {
    return <h1>Product is loading...Please Wait</h1>
  }

  if (status === "failed") {
    return <h1>{error}</h1>
  }

  const rating = Math.round(productDetails?.rating?.rate || 0);

  //Original Price is fabricated since FakeStore API does not provide original price or discounted price
  const originalPrice = (productDetails.price * 1.2).toFixed(2);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            className="w-full max-w-md h-96 object-contain mx-auto"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">
            {productDetails?.title}
          </h1>

          <div className="mb-4">
            <p className="text-3xl font-bold">
              ${productDetails?.price}
            </p>

            <p className="text-gray-500 line-through">
              ${originalPrice}
            </p>
          </div>

          <p className="text-gray-500 mb-2">
            Category: {productDetails?.category}
          </p>

          <p className="text-yellow-500 mb-2">
            {"★".repeat(rating)}
          </p>

          <p className="text-gray-600 mb-4">
            {productDetails?.rating?.count} reviews
          </p>

          <div className="bg-gray-100 rounded p-4 mb-6 text-green-600">
            <p>✓ Free Shipping</p>
            <p>✓ Secure Payment</p>
            <p>✓ Easy Returns</p>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            {productDetails?.description}
          </p>

          <div className="flex gap-3">

            <button
              onClick={() => dispatch(addToCart(productDetails))}
              className="bg-black text-white px-6 py-2 rounded mr-2 flex-1"
            >
              Add To Cart
            </button>

            <button
              onClick={() => dispatch(addToWishlist(productDetails))}
              className="border px-6 py-2 rounded flex-1"
            >
              Add To Wishlist
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}

export default ProductDetailsPage