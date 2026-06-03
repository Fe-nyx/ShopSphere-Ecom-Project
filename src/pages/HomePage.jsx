import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../redux/slices/productsSlice";


function HomePage() {
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch]);

  const { products, status, error } = useSelector((state) => state.products)

  if (status === "loading") {
    return <h1>Products are loading...Please Wait</h1>
  }

  if (status === "failed") {
    return <h1>{error}</h1>
  }

  
  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />
      })}
    </div>
  );

}

export default HomePage