import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const useScrollToTop = (id) => {
  const { pathname } = useLocation();
  const previousId = useRef(null);

  useEffect(() => {
    if (previousId.current === null || id !== previousId.current) {
      window.scrollTo(0, 0); // Scroll to the top only if the movie id changes
      previousId.current = id; // Update previous id with the current one
    }
  }, [pathname, id]); // Run when either the path or id changes
};

export default useScrollToTop;
