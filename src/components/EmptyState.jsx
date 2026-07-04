import { Link } from "react-router-dom";

function EmptyState({
  illustration,
  title,
  description,
  buttonText,
  to,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 md:py-20 px-4">
      {illustration}

      <h2 className="mt-6 text-2xl md:text-3xl font-bold text-[var(--color-coal)]">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-sm md:text-base text-[var(--color-slate)]">
        {description}
      </p>

      <Link
        to={to}
        className="text-sm md:text-base mt-6 px-3 md:px-5 py-1.5 md:py-2 btn-primary"
      >
        {buttonText}
      </Link>
    </div>
  );
}

export default EmptyState;