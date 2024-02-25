import DetailText from "../components/DetailText";
import Table from "../components/Table";
import banner from "../assets/images/banner.webp";
import FilterTable from "../components/Table/FilterTable";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <>
      <section className="flex h-96 max-md:flex-col max-md:gap-8">
        <div
          data-aos="fade-right"
          data-aos-delay="1200"
          className="flex-1 flex flex-col justify-around text-justify max-md:flex-col gap-3  max-md:text-center max-md:mb-14 max-md:gap-6"
        >
          <h1 className="text-5xl max-lg:text-4xl max-md:text-5xl max-sm:text-3xl max-[390px]:text-2xl">
            Welcome to <DetailText>Mi</DetailText>
            Coin
          </h1>
          <p
            data-aos="fade-right"
            data-aos-delay="1500"
            className=" dark:text-zinc-300 text-lg leading-8 max-lg:text-base max-md:text-sm max-sm:leading-9 max-[390px]:text-xs"
          >
            Your comprehensive hub for exploring the exciting world of digital
            currencies. With <DetailText>real-time </DetailText>
            prices, customizable
            <DetailText> favorites</DetailText>, and the{" "}
            <DetailText> latest news</DetailText>, we're here to help you
            navigate the cryptocurrency universe. Join us and dive into the
            future of finance.
          </p>
        </div>
        <div
          data-aos="fade-left"
          data-aos-delay="1700"
          className="flex-1 self-center"
        >
          <div className="flex justify-end  transition duration-300 ease-in-out max-md:justify-center ">
            <img
              src={banner}
              alt="Imagem do banner"
              className=" w-[80%] transition-all duration-300 shadow-2xl dark:shadow-zinc-950 dark:opacity-90 rounded-2xl hover:opacity-100 brightness-105 hover:brightness-75 shadow-zinc-400 dark:brightness-100 dark:hover:brightness-110"
            />
          </div>
        </div>
      </section>
      <section className="flex flex-col justify-center items-center my-10 max-md:my-36">
        <h2
          data-aos="fade-up"
          className="mb-10 text-4xl font-bold max-sm:text-2xl"
        >
          Market Overview
        </h2>
        <FilterTable />
        <Table />
      </section>
      <Outlet />
    </>
  );
}

export default Home;
