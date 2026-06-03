import { useSelector, useDispatch } from "react-redux"

import { removeFromWishlist } from "../redux/slices/wishlistSlice";



function WishlistPage() {

  const dispatch = useDispatch();

  const wishlist = useSelector((state)=>state.wishlist);

  if (wishlist.length === 0) {
    return <h1>Your wishlist is empty</h1>
  }



  return (
    <>
      <h1>Wishlist</h1>

      {wishlist.map((item)=>(
        <div
          key={item.id}
          className="border p-4"
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-48 h-48 object-contain"
          />

          <p>{item.title}</p>

          <p>{item.price}</p>

          <button onClick={()=>dispatch(removeFromWishlist(item.id))}>
            Remove
          </button>
        </div>
      ))}
    </>
  )
}

export default WishlistPage