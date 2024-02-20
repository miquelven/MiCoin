import Container from "../Container";
import Menu from "./Menu";
import ChangeTheme from "./ChangeTheme";

export default function Header() {

  return (
    <header className="bg-zinc-200 dark:bg-zinc-900/30 ">
      <Container>
        <div className="flex justify-between items-center ">
          
          <div onClick={()=> window.location.href = "/"}  className="text-blue-500/80 cursor-pointer font-semibold text-2xl transition-all duration-300 ease-in-out hover:brightness-125 ">
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
