import { Outlet } from "react-router-dom";
import Favorites from "../components/Favorites";
import { Helmet } from "react-helmet";

export default function FavoritesPage() {
  return (
    <>
      <Helmet>
        <title>MiCoin - Favoritos</title>
        <meta
          name="description"
          content="Explore e gerencie suas criptomoedas favoritas na MiCoin. Acompanhe preços, tendências e notícias para seus ativos digitais selecionados. Personalize seu portfólio e mantenha-se informado sobre as criptomoedas que mais importam para você. Comece a gerenciar seus favoritos hoje e mantenha-se à frente no mundo dinâmico das criptomoedas."
        ></meta>
        <meta
          name="keywords"
          content="criptomoedas favoritas, favoritos de criptomoedas, portfólio de cripto, ativos digitais, preços de cripto, tendências de criptomoedas, notícias de cripto, gerenciamento de criptomoedas"
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
