import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Container({ children }) {
  useEffect(() => {
    Aos.init();
  }, []);

  return <div className="max-w-6xl m-auto px-5 ">{children}</div>;
}
