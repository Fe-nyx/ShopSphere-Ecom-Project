import { useState, useEffect } from "react"
import { useSelector } from "react-redux";
import { getAllProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";


function HomePage() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getAllProducts();
      setProducts(data);
    }

    fetchProducts();
  }, []);


  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map((product) => {
        return <ProductCard key={product.id} product={product}/>
      })}
    </div>
  );

}

export default HomePage