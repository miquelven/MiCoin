import { Sun, Moon } from 'lucide-react';

export default function Theme() {
  const toggleTheme = () => {
    const htmlEl = document.documentElement;
    if (htmlEl.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("dark-mode", false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("dark-mode", true);
    }
  };

  return (
    <div className="flex items-center ml-3">
      <button 
        id="theme-toggle" 
        onClick={toggleTheme}
        className="p-2 rounded-full bg-light-300 dark:bg-dark-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-all duration-300 shadow-sm hover:shadow-md"
        aria-label="Alternar tema"
      >
        <Sun className="w-5 h-5 text-primary-600 dark:text-primary-400 hidden dark:block transition-transform duration-300 hover:rotate-45" />
        <Moon className="w-5 h-5 text-primary-600 dark:text-primary-400 block dark:hidden transition-transform duration-300 hover:rotate-12" />
      </button>
    </div>
  );
}
