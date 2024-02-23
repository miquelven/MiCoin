import Container from "../Container";
import Menu from "./Menu";
import ChangeTheme from "./ChangeTheme";

import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Header() {
  useEffect(() => {
    Aos.init({
      once: true,
    });
  }, []);
  return (
    <header id="top" className="bg-zinc-200 dark:bg-zinc-900/30 relative z-40">
      <Container>
        <div
          data-aos="fade-down"
          data-aos-duration="1000"
          className="flex justify-between items-center "
        >
          <div
            onClick={() => (window.location.href = "/")}
            className="text-blue-500/80 cursor-pointer font-semibold text-2xl transition-all duration-300 ease-in-out hover:brightness-125 "
          >
            <span>Mi</span>
            <span className="ml-1 text-slate-800 dark:text-zinc-50 text-xl">
              Coin
            </span>
          </div>

          <div className="flex items-center gap-10 max-md:flex-row-reverse">
            {/* navigation */}
            <Menu />
            {/* light/dark */}
            <ChangeTheme />
          </div>
        </div>
      </Container>
    </header>
  );
}
