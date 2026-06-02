import { Link } from "react-router-dom"


function ProductCard({ product }) {

    return (
        <div className="border p-4">
            <Link to={`/product/${product.id}`}>
                <img
                    src={product.image}
                    alt="product image"
                    className="w-full h-48 object-contain"
                />
                <p>{product.title}</p>
                <p>{product.price}</p>
                <p>{product.category}</p>
            </Link>
        </div>

    )
}

export default ProductCard