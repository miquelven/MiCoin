import { ArrowUp } from "lucide-react";

export default function ToUp({ show }) {
  return (
    <a
      href="#top"
      className={`fixed right-10 bottom-16 rounded-full p-3 bg-blue-600 hover:bg-blue-500 transition-all duration-300 opacity-1 max-[450px]:p-1 ${
        show ? "opacity-1 z-10" : "opacity-0 z-[-1]"
      }`}
    >
      <ArrowUp></ArrowUp>
    </a>
  );
}
