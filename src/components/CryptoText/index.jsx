import manyCryptoCurrencyImg from "../../assets/images/manycryptocurrency.webp";

export default function CryptoText() {
  return (
    <section
      className="min-h-40 rounded-lg py-10 px-10 shadow-md shadow-zinc-400 dark:shadow-black brightness-200 dark:brightness-100 text-white"
      style={{
        background: `url(${manyCryptoCurrencyImg})`,
      }}
    >
      <div className="flex flex-col gap-3">
        <p className="w-full text-center dark:font-semibold text-xl leading-10 ">
          Don't miss out on the latest updates about asset changes! Subscribe to
          our newsletter and stay informed to make smart decisions and maximize
          your investments.
        </p>

        <div className="flex justify-between items-center gap-20 w-full text-center mt-20">
          <h4 className="font-semibold text-xl">Sign Up For Newsletter</h4>
          <form className="flex-1 flex gap-4 ">
            <input
              type="text"
              placeholder="Email"
              className="transition-all duration-300 flex-1 placeholder:text-black text-black bg-zinc-200 dark:bg-[#09090b] dark:text-white font-bold dark:font-normal dark:placeholder:text-white/80 px-3 py-4 rounded-md outline-none dark:hover:bg-[#1a1a1d] hover:bg-zinc-600"
            />
            <button className="transition-all duration-300 text-black dark:text-white font-bold dark:font-normal dark:bg-[#09090b]  rounded-md p-2 bg-zinc-400 dark:hover:bg-[#1a1a1d] hover:bg-zinc-600">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
