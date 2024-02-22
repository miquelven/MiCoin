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

  const closeMenu = () => {
    menuBar.current.style.top = "-185px";
    menuBar.current.style.opacity = "0";
    closeMenuBtn.current.style.display = "none";
    openMenuBtn.current.style.display = "block";
  };

  const openMenu = () => {
    menuBar.current.style.top = "80px";
    setTimeout(() => (menuBar.current.style.opacity = "1"), 200);
    // menuBar.current.style.opacity = "1";
    closeMenuBtn.current.style.display = "block";
    openMenuBtn.current.style.display = "none";
  };

  const redirectAnchor = (to) => {
    closeMenu();
    window.location.href = `${to}`;
  };

  return (
    <nav className="">
      <ul className="max-md:hidden flex mr-3">
        {headerLinks.map((link) => (
          <li
            key={link.name}
            onClick={() => redirectAnchor(link.to)}
            className="py-5 cursor-pointer transition duration-300 ease-in border-b-2 border-transparent hover:border-blue-500 hover:opacity-70 "
          >
            <button className="px-6 capitalize">{link.name}</button>
          </li>
        ))}
      </ul>
      <div ref={content} className="hidden max-md:flex">
        <button ref={openMenuBtn} onClick={openMenu}>
          <AlignJustify />
        </button>
        <button ref={closeMenuBtn} className="hidden" onClick={closeMenu}>
          <X />
        </button>
        <ul
          ref={menuBar}
          className="flex absolute transition-all  duration-500 ease-in opacity-0 -top-[185px] left-0 right-0 flex-col items-center divide-y-2 divide-zinc-300 dark:divide-zinc-800"
        >
          {headerLinks.map((link) => (
            <li
              key={link.name}
              className="hover:bg-zinc-200 hover:text-zinc-500 font-semibold dark:hover:bg-zinc-800 w-full text-center py-3 dark:text-zinc-100"
            >
              <button
                onClick={() => redirectAnchor(link.to)}
                className="px-10 capitalize  transition-all  dark:hover:text-zinc-400"
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
