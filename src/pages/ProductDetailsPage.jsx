import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom"
import { fetchProductDetails } from "../redux/slices/productDetailsSlice";

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
    <>
      <h1>{productDetails?.title}</h1>
    </>
  )
}

export default ProductDetailsPage