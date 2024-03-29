import { AlignJustify, X } from "lucide-react";
import { useRef } from "react";
export default function Menu() {
  const headerLinks = [
    {
      name: "favorites",
      to: "/favorites",
    },
    {
      name: "trending",
      to: "/trending",
    },
    {
      name: "contact",
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
    <nav className="">
      {/* menu desktop */}
      <ul className="max-md:hidden flex mr-3 ">
        {headerLinks.map((link) => (
          <li
            key={link.name}
            onClick={() => redirectAnchor(link.to)}
            className="py-4 relative  cursor-pointer transition duration-300 ease-in before:content[''] before:w-full before:h-[2px] before:bg-transparent before:absolute before:transition-all before:duration-300 before:-bottom-0.5 hover:text-zinc-500 hover:before:bg-[#f4f4f5] dark:hover:before:bg-zinc-300  "
          >
            <button className="px-6 capitalize">{link.name}</button>
          </li>
        ))}
      </ul>
      <div ref={content} className="hidden max-md:flex">
        <button
          ref={openMenuBtn}
          onClick={openMenu}
          className="py-3 px-2 relative before:content-['']  before:w-full before:h-[2px] before:bg-transparent before:absolute before:transition-all before:duration-300 before:left-0  before:-bottom-0.5 hover:before:bg-[#f4f4f5] dark:hover:before:bg-zinc-300"
        >
          <AlignJustify />
        </button>
        <button
          ref={closeMenuBtn}
          onClick={closeMenu}
          className="hidden py-3 px-2 relative before:content-['']  before:w-full before:h-[2px] before:bg-transparent before:absolute before:transition-all before:duration-300 before:left-0  before:-bottom-0.5 hover:before:bg-[#f4f4f5] dark:hover:before:bg-zinc-300"
        >
          <X />
        </button>
        <ul
          ref={menuBar}
          className="flex w-[100vw] py-2  absolute transition-all  duration-700 ease-in opacity-0 top-[-685px] -left-0 h-[35vh] flex-col items-center divide-y-2 divide-zinc-300 dark:divide-zinc-900 dark:bg-zinc-900/30 z-[99] backdrop-blur-3xl "
        >
          {headerLinks.map((link) => (
            <button
              onClick={() => redirectAnchor(link.to)}
              key={link.name}
              className="hover:bg-zinc-200 hover:text-zinc-500 font-semibold dark:hover:bg-zinc-800 w-full text-center py-6 dark:text-zinc-100"
            >
              <li className="px-10 capitalize  transition-all  dark:hover:text-zinc-400">
                {link.name}
              </li>
            </button>
          ))}
        </ul>
      </div>
    </nav>
  );
}
