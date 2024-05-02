import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ToTopButton() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", checkScrollTop);

    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [showScroll]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollTop}
      className={`transition-all duration-300 h-10 w-10 border-2 dark:text-zinc-400 border-zinc-500 rounded-full  text-zinc-500  flex justify-center items-center fixed bottom-10 right-10 hover:scale-110 bg-transparent dark:hover:bg-white/10  hover:bg-white/10 hover:text-zinc-700 hover:text-zinc-300
        ${showScroll ? "z-10 opacity-100" : "z-[-1] opacity-0"}
      `}
    >
      <ArrowUp />
    </button>
  );
}
