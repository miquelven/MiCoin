import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `MiCoin - ${title}`;
  }, []);
};

export default useTitle;
