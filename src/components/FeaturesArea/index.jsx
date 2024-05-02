import featuresItens from "../../data/featuresItens";

export default function FeaturesArea() {
  return (
    <section className=" min-h-80  flex justify-center items-center md:mt-20 md:mb-32">
      <div className="rounded-lg bg-zinc-200 dark:bg-zinc-900/30  w-screen p-10 grid   md:grid-cols-2 xl:grid-cols-4 gap-10 ">
        {featuresItens.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-center items-center gap-10 px-10 h-full dark:even:bg-[#09090b] even:bg-[#f4f4f5] rounded-lg py-4"
          >
            <span>{item.icon}</span>
            <p className="text-sm md:text-md text-center">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
