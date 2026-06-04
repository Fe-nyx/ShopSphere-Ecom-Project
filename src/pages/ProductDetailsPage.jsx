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

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            className="w-64 h-64 object-contain"
          />
        </div>

        <div>
          <h1>{productDetails?.title}</h1>

          <p>Price: ${productDetails?.price}</p>

          <p>Category: {productDetails?.category}</p>

          <p>Rating: {productDetails?.rating?.rate}</p>

          <p>Reviews: {productDetails?.rating?.count}</p>

          <p>{productDetails?.description}</p>

          <button
            onClick={() => dispatch(addToCart(productDetails))}
          >
            Add To Cart
          </button>

          <button
            onClick={() => dispatch(addToWishlist(productDetails))}
          >
            Add To Wishlist
          </button>
        </div>

      </div>
    </div>
  )
}

export default ProductDetailsPage