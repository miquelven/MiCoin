export default function StepFavoriteItem({ dataItem }) {
  return (
    <li
      data-aos={dataItem.id % 2 == 0 ? "fade-left" : "fade-right"}
      data-aos-delay={100 * dataItem.id}
      className="relative w-full h-full text-zinc-600 dark:text-zinc-400"
    >
      <p className="mb-5">
        <span className="text-zinc-700 dark:text-zinc-300 font-semibold text-lg sm:text-xl">
          {dataItem.stepCounter}
        </span>
        <span className=" text-base sm:text-lg">{dataItem.text}</span>
      </p>
      <img
        src={dataItem.img}
        alt={dataItem.alt}
        width={"100%"}
        className="invert-0 dark:invert"
      />
    </li>
  );
}
