import { Menu as MenuIcon, X } from "lucide-react";
import { useRef } from "react";
export default function Menu() {
  const headerLinks = [
    {
      name: "início",
      to: "/",
    },
    {
      name: "favoritos",
      to: "/favorites",
    },
    {
      name: "tendências",
      to: "/trending",
    },
    {
      name: "contato",
      to: "/contact",
    },
  ];

  const content = useRef(null);
  const menuBar = useRef(null);
  const closeMenuBtn = useRef(null);
  const openMenuBtn = useRef(null);
  const menuIsOpen = useRef(false);

  const firstClick = useRef(0);

  const closeMenu = () => {
    menuBar.current.style.top = "-685px";
    menuBar.current.style.backDrop = "blur(0px)";
    menuBar.current.style.opacity = "0";
    closeMenuBtn.current.style.display = "none";
    openMenuBtn.current.style.display = "block";
    menuIsOpen.value = false;
  };

  document.addEventListener("click", () => {
    // serve para que ele não feche o menu logo quando ele abre
    firstClick.value++;
    if (menuIsOpen.value && firstClick.value !== 1) {
      closeMenu();
    }
  });

  const openMenu = () => {
    firstClick.value = 0;
    menuBar.current.style.top = "94px";
    menuBar.current.style.backDrop = "blur(64px)";
    setTimeout(() => (menuBar.current.style.opacity = "1"), 200);
    closeMenuBtn.current.style.display = "block";
    openMenuBtn.current.style.display = "none";

    menuIsOpen.value = true;
  };

  const redirectAnchor = (to) => {
    closeMenu();
    window.location.href = `${to}`;
  };

  return (
    <nav>
      {/* menu desktop */}
      <ul className="max-md:hidden flex mr-3">
        {headerLinks.map((link) => (
          <li
            key={link.name}
            onClick={() => redirectAnchor(link.to)}
            className="relative cursor-pointer transition-all duration-300 ease-in-out group"
          >
            <button className="px-5 py-2 capitalize font-medium text-dark-200 dark:text-light-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 flex items-center">
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300 ease-in-out"></span>
            </button>
          </li>
        ))}
      </ul>
      <div ref={content} className="hidden max-md:flex">
        <button
          ref={openMenuBtn}
          onClick={openMenu}
          aria-label="Abrir menu"
          className="p-2 text-dark-200 dark:text-light-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900/30"
        >
          <MenuIcon className="h-5 w-5" strokeWidth={2.5} />
        </button>
        <button
          ref={closeMenuBtn}
          onClick={closeMenu}
          aria-label="Fechar menu"
          className="hidden p-2 text-dark-200 dark:text-light-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900/30"
        >
          <X className="h-5 w-5" strokeWidth={2.5} />
        </button>
        <ul
          ref={menuBar}
          className="flex w-full py-4 absolute transition-all duration-500 ease-in-out opacity-0 top-[-685px] left-0 flex-col items-center divide-y divide-light-400 dark:divide-dark-300 bg-light-200/95 dark:bg-dark-200/95 z-[99] backdrop-blur-lg shadow-xl rounded-b-xl border-t border-light-400 dark:border-dark-300"
        >
          {headerLinks.map((link) => (
            <button
              onClick={() => redirectAnchor(link.to)}
              key={link.name}
              className="w-full text-center py-4 text-dark-200 dark:text-light-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-light-300 dark:hover:bg-dark-300 transition-all duration-300"
            >
              <li className="px-10 capitalize font-medium">
                {link.name}
              </li>
            </button>
          ))}
        </ul>
      </div>
    </nav>
  );
}
