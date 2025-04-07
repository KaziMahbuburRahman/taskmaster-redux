import { Link } from "react-router-dom";

const ComingSoon = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center px-4 md:px-0">
      <h1 className="text-xl md:text-3xl font-bold mb-3 md:mb-4 text-center">Coming Soon InShaAllah!</h1>
      <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 text-center">We are working on it.</p>
      <Link
        to="/"
        className="px-4 md:px-6 py-2 bg-primary text-white text-sm md:text-base rounded-md hover:bg-primary/80 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
};

export default ComingSoon;
