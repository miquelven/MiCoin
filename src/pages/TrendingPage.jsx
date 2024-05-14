import TrendingCoin from "../components/TrendingCoin";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function TrendingPage() {
  return (
    <>
      <Helmet>
        <title>MiCoin - Trending</title>
        <meta
          name="description"
          content="Discover the hottest trends in the cryptocurrency market on MiCoin. Stay updated with real-time data on trending digital assets, price movements, and market sentiment. Explore the latest insights and identify emerging opportunities in the dynamic world of crypto. Start exploring the trends today and stay ahead of the curve."
        ></meta>
        <meta
          name="keywords"
          content="cryptocurrency trends, trending cryptocurrencies, crypto market trends, digital asset trends, cryptocurrency price movements, market sentiment, crypto insights"
        ></meta>
        <meta name="author" content="MiCoin" />
      </Helmet>
      <main>
        <TrendingCoin />
        <Outlet />
      </main>
    </>
  );
}
