import TrendingCoin from "../components/TrendingCoin";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function TrendingPage() {
  return (
    <>
      <Helmet>
        <title>MiCoin - Tendências</title>
        <meta
          name="description"
          content="Descubra as tendências mais quentes do mercado de criptomoedas no MiCoin. Mantenha-se atualizado com dados em tempo real sobre ativos digitais em alta, movimentos de preços e sentimento do mercado. Explore os insights mais recentes e identifique oportunidades emergentes no mundo dinâmico das criptos. Comece a explorar as tendências hoje e fique à frente da curva."
        ></meta>
        <meta
          name="keywords"
          content="tendências de criptomoedas, criptomoedas em alta, tendências do mercado crypto, tendências de ativos digitais, movimentos de preços de criptomoedas, sentimento do mercado, insights crypto"
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
