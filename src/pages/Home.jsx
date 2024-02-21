import DetailText from "../components/DetailText";
import Table from "../components/Table";
import banner from "../assets/images/banner.png";
import FilterTable from "../components/Table/FilterTable";

function Home() {
  return (
    <>
      <section className="flex h-96 ">
        <div className="flex-1 flex flex-col justify-around text-justify">
          <h1 className="text-5xl">
            Welcome to <DetailText>Mi</DetailText>
            Coin
          </h1>
          <p className=" dark:text-zinc-300 text-lg leading-8">
            Your comprehensive hub for exploring the exciting world of digital
            currencies. With <DetailText>real-time </DetailText>
            prices, customizable
            <DetailText> favorites</DetailText>, and the{" "}
            <DetailText> latest news</DetailText>, we're here to help you
            navigate the cryptocurrency universe. Join us and dive into the
            future of finance.
          </p>
        </div>
        <div className="flex-1 self-center">
          <div className="flex justify-end  transition duration-300 ease-in-out brightness-105 hover:brightness-75 invert-[1] dark:invert-[1] dark:contrast-125 dark:brightness-90 dark:hover:brightness-75 ">
            <img src={banner} alt="Imagem do banner" className=" w-[80%]" />
          </div>
        </div>
      </section>
      <section className="flex flex-col justify-center items-center mb-10">
        <h2 className="mb-10 text-4xl font-bold">Market Overview</h2>
        <FilterTable />
        <Table />
      </section>
    </>
  );
}

export default Home;
