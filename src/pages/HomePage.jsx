import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/slices/productsSlice";

import ProductCard from "../components/ProductCard";
import Banner from "../components/Banner";
import WhatWeSell from "../components/WhatWeSell";
import FAQ from "../components/FAQ";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";

import { formatCategory } from "../utils/formatCategory";

function HomePage() {
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState("all");

  const productsRef = useRef(null);

  const { searchValue } = useSelector((state) => state.search);
  const { products, status, error } = useSelector((state) => state.products);

  //Categories
  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => {
          return product.category === selectedCategory;
        });

  //Search
  const searchedProducts = filteredProducts.filter((product) => {
    return product.title.toLowerCase().includes(searchValue.toLowerCase());
  });

  function scrollToProducts() {
    productsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (searchValue.trim() !== "") {
      scrollToProducts();
    }
  }, [searchValue]);

  //Products Section
  let productsSection;

  if (searchedProducts.length === 0) {
    productsSection = (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold">No products found</h2>

        <p className="text-[var(--color-slate)]/80 mt-2">
          Try searching for another product.
        </p>
      </div>
    );
  } else {
    productsSection = (
      <div
        className="
        grid
        grid-cols-2 md:grid-cols-3 lg:grid-cols-4
        gap-2 md:gap-4
        px-3 md:px-6
      "
      >
        {searchedProducts.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    );
  }

  //Conditional Rendering

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (status === "failed") {
    return <ErrorState message={error} />;
  }

  // Main Render
  return (
    <>
      <Banner onCTAButton={scrollToProducts} />

      <WhatWeSell />

      <div
        className="flex flex-wrap gap-1 md:gap-2 mb-8 scroll-mt-20 px-6 bg-[var(--color-cream)]"
        ref={productsRef}
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
                ? "text-sm md:text-base px-2 md:px-4 py-1 md:py-2 rounded-full btn-primary"
                : "text-sm md:text-base px-2 md:px-4 py-1 md:py-2 rounded-full btn-secondary"
            }
          >
            {formatCategory(category)}
          </button>
        ))}
      </div>

      {productsSection}

      <FAQ />
    </>
  );
}

export default HomePage;
