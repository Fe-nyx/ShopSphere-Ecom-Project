import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getProductById } from "../services/productService";

function ProductDetailsPage() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(()=>{
    async function fetchProduct(id){
      const data = await getProductById(id)
      setProduct(data);
    }

    fetchProduct(id)
  },[id])
  return (
    <>
      <h1>{product?.title}</h1>
    </>
  )
}

export default ProductDetailsPage