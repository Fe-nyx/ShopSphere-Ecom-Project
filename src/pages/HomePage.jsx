import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../redux/slices/productsSlice";


function HomePage() {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch]);

  const { products, status, error } = useSelector((state) => state.products)


  const categories = ["all", ...new Set(products.map((product) => product.category))];

  if (status === "loading") {
    return <h1>Products are loading...Please Wait</h1>
  }

  if (status === "failed") {
    return <h1>{error}</h1>
  }
  
  const filteredProducts = selectedCategory === "all" ? products : products.filter((product)=>{
    return product.category === selectedCategory
  });


  return (
    <>
      <div>
        <select
          value={selectedCategory}
          onChange={(event)=>setSelectedCategory(event.target.value)}
        >
          {categories.map((category, index)=>{
            return <option key={index}>{category}</option>
          })}
        </select>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {filteredProducts.map((product) => {
          return <ProductCard key={product.id} product={product} />
        })}
      </div>
    </>
  );

}

export default HomePage