function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center py-24 md:py-48">
      <div
        className="
          w-8 md:w-16
          h-8 md:h-16
          border-2 md:border-4
          border-[var(--color-beige)]
          border-t-[var(--color-coal)]
          rounded-full
          animate-spin
        "
      />

      <p className="mt-4 text-sm md:text-base text-[var(--color-slate)]">
        Loading...
      </p>
    </div>
  );
}

export default LoadingSpinner;