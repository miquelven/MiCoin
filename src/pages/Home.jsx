import DetailText from "../components/DetailText";
import Table from "../components/Table";
import banner from "../assets/images/banner.webp";
import bannerLittle from "../assets/images/banner2.webp";
import FilterTable from "../components/Table/FilterTable";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    const isCoin = localStorage.getItem("coin") || [];
    if (isCoin.length > 0) return;

    localStorage.setItem("coin", JSON.stringify([]));
  }, []);

  return (
    <>
      <section className="flex  h-96 mt-28 mb-32 max-md:flex-col max-md:gap-8 max-md:mt-0">
        <div className="flex-1 relative flex flex-col justify-around text-justify max-md:flex-col gap-12  max-md:text-center max-md:mb-14 max-md:gap-6">
          <h1
            data-aos="fade-right"
            data-aos-delay="100"
            className="text-5xl font-bold max-lg:text-4xl max-md:text-5xl max-sm:text-3xl max-[390px]:text-2xl"
          >
            Welcome to <DetailText>Mi</DetailText>
            Coin
          </h1>
          <p
            data-aos="fade-right"
            data-aos-delay="300"
            className=" dark:text-zinc-300 mt-10 text-lg font-light leading-8 max-md:max-w-[380px] max-md:mx-auto max-sm:leading-9 max-sm:text-sm max-[390px]:text-xs "
          >
            Your comprehensive hub for exploring the exciting world of digital
            currencies. With <DetailText>real-time </DetailText>
            prices, customizable
            <DetailText> favorites</DetailText>, and the{" "}
            <DetailText> latest news</DetailText>, we're here to help you
            navigate the cryptocurrency universe. Join us and dive into the
            future of finance.
          </p>
          <div
            data-aos="fade-right"
            data-aos-delay="500"
            className="flex items-end max-md:justify-center"
          >
            <img src={bannerLittle} className="w-[50%] mt-10" />
          </div>
        </div>
        <div
          data-aos="zoom-in"
          data-aos-delay="700"
          className="flex-1 self-center max-md:absolute max-md:top-0 max-md:left-0 max-md:w-full"
        >
          <div className="flex flex-col items-end justify-center  transition duration-300 ease-in-out max-md:justify-center max-md:items-center max-md:opacity-10">
            <img
              src={banner}
              alt="Imagem do banner"
              className=" w-[80%] my-20 transition-all duration-300 shadow-2xl dark:shadow-zinc-950 dark:opacity-90 rounded-2xl hover:opacity-100 brightness-105 hover:brightness-75 shadow-zinc-400 dark:brightness-100 dark:hover:brightness-110 "
            />
          </div>
        </div>
      </section>
      <section className="flex flex-col justify-center items-center my-10 max-md:my-36">
        <h3
          data-aos="fade-up"
          className="mb-10 text-4xl font-semibold max-sm:text-2xl"
        >
          Market Overview
        </h3>
        <FilterTable />
        <Table />
      </section>
      <Outlet />
    </>
  );
}

export default Home;
