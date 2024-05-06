import newsLatterImg from "../../assets/images/newsLatterImg.webp";

export default function NewsLatterArea() {
  return (
    <section
      data-aos="fade-up"
      className="min-h-40 rounded-lg py-10 px-10 shadow-md shadow-zinc-400 dark:shadow-black brightness-200 dark:brightness-100 text-white mt-20 xl:mt-0"
      style={{
        background: `url(${newsLatterImg})`,
      }}
    >
      <div className="flex flex-col sm:gap-3">
        <p className="w-full text-center dark:font-semibold  leading-7 text-zinc-300 text-base sm:text-xl sm:leading-10 ">
          Don't miss out on the latest updates about asset changes! Subscribe to
          our newsletter and stay informed to make smart decisions and maximize
          your investments.
        </p>

        <div className="flex flex-col justify-between items-center gap-7 w-full text-center mt-20 sm:flex-row sm:gap-20">
          <h4 className="font-semibold text-xl">Sign Up For Newsletter</h4>
          <form className="flex-1 flex flex-col gap-4 sm:flex-row ">
            <input
              type="text"
              placeholder="Email"
              className="transition-all duration-300 flex-1 placeholder:text-black text-black bg-zinc-200 dark:bg-[#09090b] dark:text-white font-bold dark:font-normal dark:placeholder:text-white/80  rounded-md outline-none dark:hover:bg-[#1a1a1d] hover:bg-zinc-600 px-2 py-3 sm:px-3 sm:py-4"
            />
            <button className="transition-all duration-300 text-black dark:text-white font-bold dark:font-normal dark:bg-[#09090b]  rounded-md p-2 bg-zinc-400 dark:hover:bg-[#1a1a1d] hover:bg-zinc-600 w-2/3 mx-auto sm:w-auto">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
