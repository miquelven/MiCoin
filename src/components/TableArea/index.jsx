import Table from "./Table";
import FilterTable from "./Table/FilterTable";
import { LineChart } from "lucide-react";

export default function TableArea() {
  return (
    <section id="table" className="py-24 w-full bg-light-200 dark:bg-dark-200">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col items-center mb-12">
          <span className="px-4 py-2 bg-secondary-500/10 dark:bg-secondary-500/20 rounded-full text-secondary-700 dark:text-secondary-300 font-medium flex items-center gap-2 mb-4">
            <LineChart className="w-4 h-4" />
            Dados em tempo real
          </span>
          
          <h2
            data-aos="fade-up"
            className="text-4xl font-bold text-dark-100 dark:text-light-100 mb-4 max-sm:text-3xl text-center"
          >
            Visão Geral do Mercado
          </h2>
          
          <p className="text-center text-dark-300 dark:text-light-400 max-w-2xl mb-8">
            Acompanhe as principais criptomoedas do mercado, seus preços e variações em diferentes períodos
          </p>
          
          <FilterTable />
        </div>
        
        <div className="rounded-xl shadow-card dark:shadow-none bg-white dark:bg-dark-300 overflow-hidden">
          <Table />
        </div>
      </div>
    </section>
  );
}
