export default function StepFavoriteItem({ dataItem }) {
  return (
    <li
      data-aos={dataItem.id % 2 == 0 ? "fade-left" : "fade-right"}
      data-aos-delay={100 * dataItem.id}
      className="relative w-full h-full"
    >
      <div className={`flex flex-col ${dataItem.id % 2 !== 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
        <div className={`flex-1 ${dataItem.id % 2 !== 0 ? 'md:text-left' : 'md:text-right'}`}>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-500/10 text-primary-600 dark:bg-primary-500/20 dark:text-primary-400 font-bold text-xl mb-4">
            {dataItem.id + 1}
          </div>
          <h4 className="text-xl font-bold text-dark-100 dark:text-light-100 mb-3">
            {dataItem.stepCounter}
          </h4>
          <p className="text-dark-400 dark:text-light-400 text-base">
            {dataItem.text}
          </p>
        </div>
        <div className="flex-1 p-4 bg-white dark:bg-dark-300 rounded-xl shadow-card dark:shadow-none overflow-hidden">
          <img
            src={dataItem.img}
            alt={dataItem.alt}
            className="w-full h-auto rounded-lg border border-light-300 dark:border-dark-400"
          />
        </div>
      </div>
    </li>
  );
}
