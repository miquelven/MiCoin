import { ChevronUp } from "lucide-react";
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
      aria-label="Voltar ao topo"
      className={`transition-all duration-300 h-12 w-12 shadow-lg rounded-full flex justify-center items-center fixed bottom-8 right-8 bg-gradient-to-br from-primary-500 to-primary-600 text-white hover:shadow-primary-500/20 hover:scale-105 active:scale-95
        ${showScroll ? "z-10 opacity-100" : "z-[-1] opacity-0"}
      `}
    >
      <ChevronUp size={24} strokeWidth={2.5} />
    </button>
  );
}
