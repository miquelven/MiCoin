import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";

function Home() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen text-slate-900 dark:text-zinc-50 divide-y-2 divide-slate-300 dark:divide-zinc-900">
      <Header />
      <Main />
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
