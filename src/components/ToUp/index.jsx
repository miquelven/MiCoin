import { ArrowUp } from "lucide-react";

export default function ToUp() {
  return (
    <a
      href="#top"
      className="absolute -right-32 bottom-20 rounded-full p-3 bg-blue-600 hover:bg-blue-500"
    >
      <ArrowUp></ArrowUp>
    </a>
  );
}
