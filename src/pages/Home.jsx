import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Banner from "../components/Banner";
import TableArea from "../components/TableArea";
import FeaturesArea from "../components/FeaturesArea";
import NewsLatterArea from "../components/NewsLatterArea";
import { Helmet } from "react-helmet";

function Home() {
  useEffect(() => {
    const isCoin = localStorage.getItem("coin") || [];
    if (isCoin.length > 0) return;

    localStorage.setItem("coin", JSON.stringify([]));
  }, []);

  return (
    <>
      <Helmet>
        <title>MiCoin - Home</title>
        <meta
          name="description"
          content="Explore the latest cryptocurrency information on MiCoin. Stay updated with real-time prices, market analysis, breaking news, and more. Stay one step ahead in the cryptocurrency markets with our comprehensive and intuitive platform. Start your journey now and dive into the exciting world of cryptocurrencies."
        ></meta>
        <meta
          name="keywords"
          content="cryptocurrency, crypto, bitcoin, blockchain, ethereum, digital currency, cryptocurrency market, cryptocurrency news, cryptocurrency prices, cryptocurrency trading, decentralized finance, NFTs"
        ></meta>
        <meta name="author" content="MiCoin" />
      </Helmet>
      <main>
        <Banner />
        <TableArea />
        <FeaturesArea />
        <NewsLatterArea />
        <Outlet />
      </main>
    </>
  );
}

export default Home;
