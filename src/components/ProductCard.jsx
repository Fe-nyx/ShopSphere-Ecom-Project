import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addToCart } from "../redux/slices/cartSlice"

function ProductCard({ product }) {

    const dispatch = useDispatch();

    return (
        <div className="border p-4">
            <Link to={`/product/${product.id}`}>
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-contain"
                />
                <p>{product.title}</p>
                <p>{product.price}</p>
                <p>{product.category}</p>
            </Link>


            <button onClick={() => dispatch(addToCart(product))}>Add To Cart</button>
        </div>

    )
}

export default ProductCard