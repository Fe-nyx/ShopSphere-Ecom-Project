import { useEffect, useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/slices/productsSlice";


import ProductCard from "../components/ProductCard";
import Banner from "../components/Banner";
import WhatWeSell from "../components/WhatWeSell";



function HomePage() {
  const dispatch = useDispatch();
  
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const productsRef = useRef(null);

  const { searchValue } = useSelector((state) => state.search);
  const { products, status, error } = useSelector((state) => state.products)

  function scrollToProducts() {
    productsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch]);

  useEffect(() => {
    if (searchValue.trim() !== "") {
      scrollToProducts();
    }
  }, [searchValue]);



  //Categories
  const categories = ["all", ...new Set(products.map((product) => product.category))];
  const filteredProducts = selectedCategory === "all" ? products : products.filter((product) => {
    return product.category === selectedCategory
  });

  //Search
  const searchedProducts = filteredProducts.filter((product) => {
    return product.title.toLowerCase().includes(searchValue.toLowerCase())
  });


  //Products Section
  let productsSection;

  if (searchedProducts.length === 0) {
    productsSection = (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold">
          No products found
        </h2>

        <p className="text-gray-500 mt-2">
          Try searching for another product.
        </p>
      </div>
    );
  }
  else {
    productsSection = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {searchedProducts.map((product) => {
          return <ProductCard key={product.id} product={product} />
        })}
      </div>
    );

  }


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
      <Banner />

      <WhatWeSell />

      <div
        className="flex flex-wrap gap-2 mb-8 scroll-mt-20"
        ref = {productsRef}
        >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              scrollToProducts();
            }}
            className={
              selectedCategory === category
                ? "border px-4 py-2 rounded bg-black text-white hover:bg-gray-800 cursor-pointer"
                : "border px-4 py-2 rounded hover:bg-gray-100 cursor-pointer"
            }
          >
            {category}
          </button>
        ))}
      </div >

      {productsSection}

    </>
  );

}

export default HomePage