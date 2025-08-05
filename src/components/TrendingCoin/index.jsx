import TrendingComponent from "./TrendingComponent";
import useGetTrending from "../../hooks/useGetTrending";

export default function TrendingCoin() {
  const { data: trendingData, isPending } = useGetTrending();

  return (
    <section
      className="py-24 w-full bg-light-200 dark:bg-dark-200"
      id="trending"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col items-center mb-12">
          <span className="px-4 py-2 bg-primary-500/10 dark:bg-primary-500/20 rounded-full text-primary-700 dark:text-primary-300 font-medium flex items-center gap-2 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
            Tendências
          </span>
          
          <h2
            data-aos="fade-up"
            className="text-4xl font-bold text-dark-100 dark:text-light-100 mb-4 max-sm:text-3xl text-center"
          >
            Criptomoedas em Alta
          </h2>
          
          <p className="text-center text-dark-300 dark:text-light-400 max-w-2xl mb-8">
            Descubra as criptomoedas que estão em tendência de alta no mercado e fique por dentro das oportunidades
          </p>
        </div>
        
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="w-full overflow-hidden min-h-[60vh] relative py-8 grid grid-cols-2 gap-6 rounded-xl shadow-card dark:shadow-none bg-white dark:bg-dark-300 max-md:grid-cols-1"
        >
          {!isPending ? (
            trendingData.map((trending) => (
              <TrendingComponent key={trending.item.id} data={trending.item} />
            ))
          ) : (
            <div
              data-aos="zoom-in"
              data-aos-delay="500"
              className="w-full absolute inset-0 bg-white/50 dark:bg-dark-300/50 min-h-[60vh] flex justify-center items-center"
            >
              <div
                className="w-8 h-8 border-4 border-primary-500 rounded-full border-b-transparent animate-spin"
                role="status"
              ></div>
              <span className="ml-4 font-medium text-dark-300 dark:text-light-400">
                Carregando...
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
