import { FiAlertCircle } from "react-icons/fi";

function ErrorState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <FiAlertCircle className="text-5xl md:text-6xl text-red-500 mb-4" />

      <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-coal)]">
        Something went wrong
      </h2>

      <p className="mt-2 text-sm md:text-base text-[var(--color-slate)]">
        {message}
      </p>
    </div>
  );
}

export default ErrorState;