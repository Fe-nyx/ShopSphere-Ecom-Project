function Modal({ isOpen, title, children, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="
            fixed
            inset-0
            bg-black/50
            flex
            items-center
            justify-center
            z-50
        "
      >
        <div
          className="
            bg-[var(--color-cream)]
            rounded-xl
            shadow-xl
            w-full
            max-w-2xl
            max-h-[80vh]
            overflow-y-auto
            mx-4
            p-3
            md:p-6
        "
        >
          <h2 className="text-[var(--color-coal)] text-xl md:text-2xl font-semibold md:font-bold mb-4">{title}</h2>
          <div className="text-sm md:text-base text-[var(--color-slate)] leading-relaxed">{children}</div>
          <div className="mt-6 flex justify-end">
            <button onClick={onClose} className="btn-primary px-3 md:px-5 py-1 md:py-2">
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
