import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";
import { TrendingProvider } from "../context/TrendingContext";
import { MonitoredProvider} from "../context/MonitoredContext";

function Home() {
  return (
<TrendingProvider>
    <MonitoredProvider>
    <div className="bg-zinc-100 dark:bg-zinc-950 min-h-screen text-slate-900 dark:text-zinc-200">
      <Header />
      <Main />
      {/* <Footer /> */}
      <Outlet />
    </div>
    </MonitoredProvider>
</TrendingProvider>

  );
}

export default Home;
