import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";

function Home() {
  return (
    <div className="bg-zinc-100 dark:bg-zinc-950 min-h-screen text-slate-900 dark:text-zinc-200">
      <Header />
      <Main />
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
