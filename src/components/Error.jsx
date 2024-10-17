import { useRouteError } from "react-router-dom";

const Error = () => {
  const errorData = useRouteError();

  return (
    <div className="font-montserrat bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto mt-24">
      <h2 className="font-bold text-lg mb-2">Oops! Something went wrong.</h2>
      <p className="mb-1">
        {errorData.status ? (
          <>
            <span className="font-semibold">{errorData.status} - </span>
            {errorData.statusText || errorData.message}
          </>
        ) : (
          "An unexpected error occurred."
        )}
      </p>
      {errorData.error && (
        <p className="text-sm italic">{errorData.error.message}</p>
      )}
    </div>
  );
};

export default Error;
