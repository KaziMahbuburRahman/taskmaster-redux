import { Link } from "react-router-dom";

const ComingSoon = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Coming Soon InShaAllah!</h1>
      <p className="text-gray-600 mb-8">We are working on it.</p>
      <Link
        to="/"
        className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
};

export default ComingSoon;
