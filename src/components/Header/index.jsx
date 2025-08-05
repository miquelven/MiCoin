import Container from "../Container";
import Menu from "./Menu";
import ChangeTheme from "./ChangeTheme";

import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { BarChart3 } from "lucide-react";

export default function Header() {
  useEffect(() => {
    Aos.init({
      once: true,
    });
  }, []);
  return (
    <header id="top" className="sticky top-0 pt-4 pb-2 relative z-40 bg-gradient-to-r from-light-300 to-light-200 dark:from-dark-300 dark:to-dark-200 shadow-md backdrop-blur-sm">
      <Container>
        <div className="flex justify-between items-center py-3" data-aos="fade-down" data-aos-duration="800">
          <div
            onClick={() => (window.location.href = "/")}
            className="flex items-center cursor-pointer transition-all duration-300 ease-in-out hover:scale-105"
            aria-label="Ir para página inicial"
          >
            <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-2 rounded-lg mr-3 shadow-lg hover:shadow-primary-500/20 transition-all duration-300">
              <BarChart3 className="text-white h-6 w-6" strokeWidth={2.5} />
            </div>
            <div className="flex items-baseline">
              <span className="text-primary-600 dark:text-primary-400 font-bold text-3xl">Mi</span>
              <span className="ml-1 text-dark-300 dark:text-light-100 text-xl font-semibold">
                Coin
              </span>
            </div>
          </div>

          <div className="bg-light-100 dark:bg-dark-100 shadow-lg rounded-full px-6 py-2 flex items-center gap-8 max-md:flex-row-reverse max-sm:px-4 max-sm:gap-4 border border-light-400 dark:border-dark-300">
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
