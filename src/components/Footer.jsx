import { Link } from "react-router-dom";



function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 p-4 md:p-8">
        <div>
          <h3 className="font-semibold md:font-bold text-lg mb-2 md:mb-4">
            ShopSphere
          </h3>
          <p className="text-sm md:text-base">Your one-stop destination for online shopping.</p>
        </div>

        <div>

          <h3 className="font-semibold md:font-bold text-lg mb-2 md:mb-4">
            Quick Links
          </h3>

          <div className="flex flex-col md:gap-2">

            <Link
              to="/"
              className="text-sm md:text-base hover:text-gray-300"
            >
              Home
            </Link>

            <Link
              to="/cart"
              className="text-sm md:text-base hover:text-gray-300"
            >
              Cart
            </Link>

            <Link
              to="/wishlist"
              className="text-sm md:text-base hover:text-gray-300"
            >
              Wishlist
            </Link>

            <Link
              to="/login"
              className="text-sm md:text-base hover:text-gray-300"
            >
              Login
            </Link>

          </div>

        </div>

        <div>

          <h3 className="font-semibold md:font-bold text-lg mb-2 md:mb-4">
            Newsletter
          </h3>

          <input
            className="text-sm md:text-base border border-gray-500 rounded px-1.5 md:px-3 py-1 md:py-2 w-full bg-gray-800 text-white placeholder-gray-400"
            placeholder="Enter your email"
          />

          <button className="text-sm md:text-base bg-white text-black px-1.5 md:px-4 py-1 md:py-2 rounded mt-2 cursor-pointer">
            Subscribe
          </button>

        </div>

        <div>

          <h3 className="font-semibold md:font-bold text-lg mb-2 md:mb-4">
            Contact
          </h3>

          <p className="text-sm md:text-base">
            support@shopsphere.com
          </p>

          <p className="text-sm md:text-base">
            +91 98765 43210
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer