import { memo } from "react";

import FavoriteComponent from "./FavoriteComponent";
import stepsItens from "../../data/stepsItens";
import StepFavoriteItem from "./FavoriteComponent/StepFavoriteItem";
import useGetCoinsData from "../../hooks/useGetCoinsData";
import favoriteCryptoStore from "../../stores/favoriteCryptoStore";
import cryptoStore from "../../stores/cryptoStore";
function Favorites() {
  const favoriteCrypto = favoriteCryptoStore((state) => state.favoriteCrypto);
  const cryptoData = cryptoStore();
  const { data: savedCoins, isPending: savedCoinsLoading } = useGetCoinsData(
    favoriteCrypto.length > 0 ? favoriteCrypto : null,
    cryptoData.cryptoParams.currency,
    cryptoData.cryptoParams.sortBy
  );

  return (
    <section
      className="w-full py-24 bg-light-200 dark:bg-dark-200 relative"
      id="favorites"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col items-center mb-12">
          <span 
            data-aos="fade-up" 
            data-aos-delay="100"
            className="bg-light-300 dark:bg-dark-300 text-secondary-700 dark:text-secondary-300 font-medium py-1 px-4 rounded-full text-sm mb-4 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Favoritos
          </span>
          
          <h2
            data-aos="zoom-in"
            data-aos-delay="200"
            className="text-4xl font-bold text-dark-100 dark:text-light-100 mb-4 max-sm:text-3xl text-center"
          >
            Seus ativos favoritos
          </h2>

          <p
            data-aos="fade-up"
            data-aos-delay="300"
            className="text-center text-dark-400 dark:text-light-400 max-w-2xl mb-8"
          >
            Acompanhe seus ativos favoritos! Aqui, você pode acessar rapidamente as criptomoedas 
            que mais importam para você. Mantenha-se atualizado e tome decisões informadas para 
            alcançar seus objetivos financeiros.
          </p>
        </div>
        
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="rounded-xl shadow-card dark:shadow-none bg-white dark:bg-dark-300 overflow-hidden"
        >
        {favoriteCrypto.length === 0 ? (
          <div
            className="w-full bg-white dark:bg-dark-300 min-h-[60vh] flex flex-col justify-center items-center p-8"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-light-400 dark:text-dark-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span className="font-medium text-dark-200 dark:text-light-200 text-xl mb-2">
              Nenhum favorito encontrado
            </span>
            <p className="text-dark-400 dark:text-light-400 text-center max-w-md">
              Adicione criptomoedas aos seus favoritos clicando no ícone de estrela na tabela de mercado.
            </p>
          </div>
        ) : savedCoinsLoading ? (
          <div
            className="w-full bg-white dark:bg-dark-300 min-h-[60vh] flex justify-center items-center"
          >
            <div
              className="w-8 h-8 border-4 border-primary-500 rounded-full border-b-transparent animate-spin"
              role="status"
            ></div>
            <span className="ml-4 font-medium text-dark-300 dark:text-light-300">
              Carregando...
            </span>
          </div>
        ) : savedCoins && savedCoins.length > 0 ? (
          <table
            className="table-auto w-full"
          >
            <thead className="capitalize text-sm text-dark-200 dark:text-light-300 font-medium border-b border-light-300 dark:border-dark-400">
              <tr className="max-[470px]:text-sm">
                <th className="py-3 px-4 text-left">Ativo</th>
                <th className="py-3 px-4 text-left">Nome</th>
                <th className="py-3 px-4 text-right">Preço</th>
                <th className="py-3 px-4 text-right max-[370px]:hidden">1H</th>
                <th className="py-3 px-4 text-right max-[470px]:hidden">24H</th>
                <th className="py-3 px-4 text-right max-[540px]:hidden">7D</th>
                <th className="py-3 px-4 text-right max-md:hidden">Variação Cap. Mercado</th>
                <th className="py-3 px-4 text-right max-lg:hidden">Volume Total</th>
              </tr>
            </thead>
            <tbody>
              {savedCoins.map((crypto) => (
                <FavoriteComponent key={crypto} data={crypto} />
              ))}
            </tbody>
          </table>
        ) : (
          <div
            className="w-full bg-white dark:bg-dark-300 min-h-[60vh] flex flex-col justify-center items-center p-8"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-light-400 dark:text-dark-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span className="font-medium text-dark-200 dark:text-light-200 text-xl mb-2">
              Erro ao carregar favoritos
            </span>
            <p className="text-dark-400 dark:text-light-400 text-center max-w-md">
              Ocorreu um problema ao carregar seus favoritos. Tente novamente.
            </p>
          </div>
        )}
        </div>
        {favoriteCrypto.length === 0 && (
          <div className="mt-32 mb-16">
            <div className="flex flex-col items-center mb-16">
              <span 
                data-aos="fade-up" 
                data-aos-delay="100"
                className="bg-light-300 dark:bg-dark-300 text-primary-700 dark:text-primary-300 font-medium py-1 px-4 rounded-full text-sm mb-4 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Tutorial
              </span>
              
              <h3
                data-aos="zoom-in"
                data-aos-delay="200"
                className="text-4xl font-bold text-dark-100 dark:text-light-100 mb-4 max-sm:text-3xl text-center"
              >
                Como favoritar um ativo
              </h3>
              
              <p
                data-aos="fade-up"
                data-aos-delay="300"
                className="text-center text-dark-400 dark:text-light-400 max-w-2xl"
              >
                Siga este guia passo a passo para adicionar e gerenciar seus ativos favoritos
              </p>
            </div>
            
            <ul className="flex flex-col gap-24 sm:gap-32 max-w-4xl mx-auto">
              {stepsItens.map((dataItem) => (
                <StepFavoriteItem dataItem={dataItem} key={dataItem.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export default memo(Favorites);
