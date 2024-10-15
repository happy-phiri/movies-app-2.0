import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="font-montserrat flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-container small-screen-padding grid place-items-center">
        <h1 className="text-9xl font-bold mb-4">404</h1>
        <h2 className="text-2xl md:text-4xl mb-6 max-w-xl text-center">
          Oops! The page you are looking for is not here.
        </h2>
        <p className="text-gray-400 mb-10 max-w-md text-center">
          It might have been moved or deleted. Do not worry, you can always
          return to the homepage.
        </p>
        <Link
          to="/"
          className="px-6 py-3 font-medium text-lg theme-gradient text-gray-900  shadow-lg hover:bg-[#72a585] hover:text-white transition-all duration-300">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
