import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";


import { fetchProducts } from "../redux/slices/productsSlice";


import ProductCard from "../components/ProductCard";
import Banner from "../components/Banner";
import WhatWeSell from "../components/WhatWeSell";

function HomePage() {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { searchValue } = useSelector((state)=>state.search);

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch]);

  const { products, status, error } = useSelector((state) => state.products)


  //Categories
  const categories = ["all", ...new Set(products.map((product) => product.category))];
  const filteredProducts = selectedCategory === "all" ? products : products.filter((product) => {
    return product.category === selectedCategory
  });

  //Search
  const searchedProducts = filteredProducts.filter((product) => {
    return product.title.toLowerCase().includes(searchValue.toLowerCase())
  });



  //Conditional Rendering

  if (status === "loading") {
    return <h1>Products are loading...Please Wait</h1>
  }

  if (status === "failed") {
    return <h1>{error}</h1>
  }

  // Main Render
  return (
    <>
      <Banner/>

      <WhatWeSell/>

      <div>
        <select
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
        >
          {categories.map((category, index) => {
            return <option
              key={index}
              value={category}  
            >
              {category}
            </option>
          })}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {searchedProducts.map((product) => {
          return <ProductCard key={product.id} product={product} />
        })}
      </div>
    </>
  );

}

export default HomePage