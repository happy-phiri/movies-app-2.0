import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="font-montserrat max-container small-screen-padding pt-28">
      <h1 className="text-8xl max-sm:text-2xl">404 Error</h1>
      <h2 className="text-4xl max-sm:text-xl mb-4">
        Sorry, the page you are looking for was not found
      </h2>
      <Link
        to=".."
        className="py-1 px-3 font-montserrat font-normal tracking-wide text-[#90cea1] border border-[#90cea1] hover:text-white hover:theme-gradient">
        Back
      </Link>
    </div>
  );
};

export default PageNotFound;
