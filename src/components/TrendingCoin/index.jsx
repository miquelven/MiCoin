import TrendingComponent from "./TrendingComponent";
import useGetTrending from "../../hooks/useGetTrending";

export default function TrendingCoin() {
  const { data: trendingData, isPending } = useGetTrending();

  return (
    <section
      className=" w-full h-full items-center flex flex-col  mb-24 relative"
      id="trending"
    >
      <div>
        <h2
          data-aos="zoom-in"
          data-aos-delay="1000"
          className="text-4xl text-center my-10 font-semibold max-sm:text-2xl"
        >
          See some assets that are on the rise
        </h2>

        <h3
          data-aos="zoom-in"
          data-aos-delay="1200"
          className="font-semibold text-zinc-600 dark:text-zinc-400 mb-10 text-center text-sm sm:text-base "
        >
          This is the place where you can find the assets that are trending the
          most.
        </h3>
      </div>
      <div
        data-aos="zoom-in"
        data-aos-delay="1500"
        className="w-full overflow-hidden min-h-[60vh] relative py-8 grid grid-cols-2  mt-9 border-2  dark:border-zinc-700 border-zinc-400 rounded-2xl shadow-lg shadow-zinc-300 dark:shadow-transparent max-md:grid-cols-1 "
      >
        {!isPending ? (
          trendingData.map((trending) => (
            <TrendingComponent key={trending.item.id} data={trending.item} />
          ))
        ) : (
          <div
            data-aos="zoom-in"
            data-aos-delay="1500"
            className="w-full absolute inset-0 bg-zinc-300 dark:bg-transparent dark:text-gray-100  min-h-[60vh] flex justify-center items-center "
          >
            <div
              className="w-8 h-8 border-4 border-blue-600 rounded-full border-b-transparent animate-spin"
              role="status"
            ></div>
            <span className="ml-4 font-bold text-zinc-700 dark:text-zinc-300">
              Searching...
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
