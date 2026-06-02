

function ProductCard({ product }) {

    return (
        <div className="border p-4">
            <img
                src={product.image}
                alt="product image"
                className="w-full h-48 object-contain"
                />
            <p>{product.title}</p>
            <p>{product.price}</p>
            <p>{product.category}</p>
        </div>

    )
}

export default ProductCard