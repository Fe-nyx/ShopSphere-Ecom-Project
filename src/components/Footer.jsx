import { Link } from "react-router-dom";
import { useState } from "react";

import Modal from "./Modal";

function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalType, setModalType] = useState(null);

  function openModal(type) {
    setModalType(type);
    setIsModalOpen(true);
  }

  return (
    <footer className="bg-[var(--color-coal)] text-[var(--color-beige)] mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 p-4 md:p-8">
        <div>
          <h3 className="font-semibold md:font-bold text-lg mb-2 md:mb-4">
            ShopSphere
          </h3>
          <p className="text-sm md:text-base">
            Your one-stop destination for online shopping.
          </p>
        </div>

        <div>
          <h3 className="font-semibold md:font-bold text-lg mb-2 md:mb-4">
            Quick Links
          </h3>

          <div className="flex flex-col md:gap-2">
            <Link to="/" className="text-sm md:text-base hover:text-[var(--color-cream)]">
              Home
            </Link>

            <Link
              to="/cart"
              className="text-sm md:text-base hover:text-[var(--color-cream)]"
            >
              Cart
            </Link>

            <Link
              to="/wishlist"
              className="text-sm md:text-base hover:text-[var(--color-cream)]"
            >
              Wishlist
            </Link>

            <Link
              to="/login"
              className="text-sm md:text-base hover:text-[var(--color-cream)]"
            >
              Login
            </Link>

            <button
              onClick={() => openModal("privacy")}
              className="
                text-left
                text-sm
                md:text-base
                hover:text-[var(--color-cream)]
                cursor-pointer
              "
            >
              Privacy Policy
            </button>

            <button
              onClick={() => openModal("terms")}
              className="
                text-left
                text-sm
                md:text-base
                hover:text-[var(--color-cream)]
                cursor-pointer
              "
            >
              Terms & Conditions
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-semibold md:font-bold text-lg mb-2 md:mb-4">
            Newsletter
          </h3>

          <input
            className="
              input
              text-sm md:text-base
              px-1.5 md:px-3
              py-1 md:py-2
              w-full
              "
            placeholder="Enter your email"
          />

          <button
            className="
              text-sm md:text-base
              px-1.5 md:px-4
              py-1 md:py-2
              mt-2
              btn-secondary
              text-black
            "
          >
            Subscribe
          </button>
        </div>

        <div>
          <h3 className="font-semibold md:font-bold text-lg mb-2 md:mb-4">
            Contact
          </h3>

          <p className="text-sm md:text-base">support@shopsphere.com</p>

          <p className="text-sm md:text-base">+91 98765 43210</p>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          modalType === "privacy" ? "Privacy Policy" : "Terms & Conditions"
        }
      >
        {modalType === "privacy" ? (
          <>
            <p>Privacy Policy content...</p>
          </>
        ) : (
          <>
            <p>Terms and Conditions content...</p>
          </>
        )}
      </Modal>
    </footer>
  );
}

export default Footer;
