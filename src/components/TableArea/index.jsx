import Table from "../Table";
import FilterTable from "../Table/FilterTable";

export default function TableArea() {
  return (
    <section className="flex flex-col justify-center items-center  max-md:mt-36">
      <h2
        data-aos="fade-up"
        className="mb-10 text-4xl font-semibold max-sm:text-2xl"
      >
        Market Overview
      </h2>
      <FilterTable />
      <Table />
    </section>
  );
}
