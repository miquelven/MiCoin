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
        <title>MiCoin - Início</title>
        <meta
          name="description"
          content="Explore as últimas informações sobre criptomoedas no MiCoin. Mantenha-se atualizado com preços em tempo real, análise de mercado, notícias e muito mais. Fique um passo à frente nos mercados de criptomoedas com nossa plataforma abrangente e intuitiva. Comece sua jornada agora e mergulhe no emocionante mundo das criptomoedas."
        ></meta>
        <meta
          name="keywords"
          content="criptomoeda, crypto, bitcoin, blockchain, ethereum, moeda digital, mercado de criptomoedas, notícias de criptomoedas, preços de criptomoedas, trading de criptomoedas, finanças descentralizadas, NFTs"
        ></meta>
        <meta name="author" content="MiCoin" />
      </Helmet>
      <main>
        <Banner />
        <TableArea />
        <FeaturesArea />
        <Outlet />
      </main>
    </>
  );
}

export default Home;
