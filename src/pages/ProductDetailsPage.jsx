import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getProductById } from "../services/productService";

function ProductDetailsPage() {
  const [product, setProduct] = useState(null);
  const params = useParams();

  useEffect(()=>{
    async function fetchProduct(id){
      const data = await getProductById(id)
      setProduct(data);
    }

    fetchProduct(params.id)
  },[params.id])
  return (
    <>
      <h1>{product?.title}</h1>
    </>
  )
}

export default ProductDetailsPage