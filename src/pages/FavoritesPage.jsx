import { Outlet } from "react-router-dom";
import Favorites from "../components/Favorites";
import { Helmet } from "react-helmet";

export default function FavoritesPage() {
  return (
    <>
      <Helmet>
        <title>MiCoin - Favorites</title>
        <meta
          name="description"
          content="Explore and manage your favorite cryptocurrencies on MiCoin. Keep track of prices, trends, and news for your selected digital assets. Customize your portfolio and stay informed about the cryptocurrencies that matter most to you. Start managing your favorites today and stay ahead in the dynamic world of crypto."
        ></meta>
        <meta
          name="keywords"
          content="cryptocurrency favorites, favorite cryptocurrencies, crypto portfolio, digital assets, crypto prices, cryptocurrency trends, crypto news, cryptocurrency management"
        ></meta>
        <meta name="author" content="MiCoin" />
      </Helmet>
      <main>
        <Favorites />
        <Outlet />
      </main>
    </>
  );
}
