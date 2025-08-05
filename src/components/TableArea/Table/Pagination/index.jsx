import { ChevronLeft, ChevronRight } from "lucide-react";
import useGetTotalPages from "../../../../hooks/useGetTotalPages";
import cryptoStore from "../../../../stores/cryptoStore";

export default function Pagination() {
  const cryptoStoreData = cryptoStore();
  const { data: totalPages, isPending: totalPagesLoading } = useGetTotalPages();

  let TotalPages = 255;
  if (!totalPagesLoading) {
    TotalPages = Math.ceil(totalPages / cryptoStoreData.cryptoParams.perPage);
  }

  const next = () => {
    if (cryptoStoreData.cryptoParams.pageSelected == TotalPages) {
      return null;
    } else {
      cryptoStoreData.cryptoParams.pageSelected++;
      cryptoStoreData.updateCryptoParams(cryptoStoreData.cryptoParams);
    }
  };

  const prev = () => {
    if (cryptoStoreData.cryptoParams.pageSelected == 1) {
      return null;
    } else {
      cryptoStoreData.cryptoParams.pageSelected--;
      cryptoStoreData.updateCryptoParams(cryptoStoreData.cryptoParams);
    }
  };

  return (
    <div className="flex items-center max-[470px]:flex-col max-[470px]:gap-4 max-[470px]:pt-6">
      <nav aria-label="Pagination" className="flex items-center justify-end">
        <ul className="flex items-center gap-1">
          <li>
            <button 
              className="flex items-center justify-center w-10 h-10 rounded-lg text-dark-300 dark:text-light-400 hover:bg-light-300 dark:hover:bg-dark-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed" 
              onClick={prev}
              disabled={cryptoStoreData.cryptoParams.pageSelected === 1}
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </li>

          {cryptoStoreData.cryptoParams.pageSelected > 2 && (
            <li>
              <button
                onClick={() => {
                  cryptoStoreData.cryptoParams.pageSelected = 1;
                  cryptoStoreData.updateCryptoParams(cryptoStoreData.cryptoParams);
                }}
                className="flex items-center justify-center w-10 h-10 rounded-lg text-dark-300 dark:text-light-400 hover:bg-light-300 dark:hover:bg-dark-400 transition-colors duration-200"
                aria-label="Go to page 1"
              >
                1
              </button>
            </li>
          )}

          {cryptoStoreData.cryptoParams.pageSelected > 3 && (
            <li>
              <button
                onClick={() => {
                  cryptoStoreData.cryptoParams.pageSelected = cryptoStoreData.cryptoParams.pageSelected - 3;
                  cryptoStoreData.updateCryptoParams(cryptoStoreData.cryptoParams);
                }}
                className="flex items-center justify-center w-10 h-10 rounded-lg text-dark-300 dark:text-light-400 hover:bg-light-300 dark:hover:bg-dark-400 transition-colors duration-200"
                aria-label="Go to previous pages"
              >
                ...
              </button>
            </li>
          )}
          
          {cryptoStoreData.cryptoParams.pageSelected !== 1 && (
            <li>
              <button
                onClick={prev}
                className="flex items-center justify-center w-10 h-10 rounded-lg text-dark-300 dark:text-light-400 hover:bg-light-300 dark:hover:bg-dark-400 transition-colors duration-200"
                aria-label={`Go to page ${cryptoStoreData.cryptoParams.pageSelected - 1}`}
              >
                {cryptoStoreData.cryptoParams.pageSelected - 1}
              </button>
            </li>
          )}
          
          <li>
            <button
              disabled
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-500 text-white font-medium transition-colors duration-200"
              aria-label={`Current page, page ${cryptoStoreData.cryptoParams.pageSelected}`}
              aria-current="page"
            >
              {cryptoStoreData.cryptoParams.pageSelected}
            </button>
          </li>

          {cryptoStoreData.cryptoParams.pageSelected !== TotalPages && (
            <li>
              <button
                onClick={next}
                className="flex items-center justify-center w-10 h-10 rounded-lg text-dark-300 dark:text-light-400 hover:bg-light-300 dark:hover:bg-dark-400 transition-colors duration-200"
                aria-label={`Go to page ${cryptoStoreData.cryptoParams.pageSelected + 1}`}
              >
                {cryptoStoreData.cryptoParams.pageSelected + 1}
              </button>
            </li>
          )}

          {cryptoStoreData.cryptoParams.pageSelected < TotalPages - 2 && (
            <li>
              <button
                onClick={() => {
                  cryptoStoreData.cryptoParams.pageSelected = cryptoStoreData.cryptoParams.pageSelected + 3;
                  cryptoStoreData.updateCryptoParams(cryptoStoreData.cryptoParams);
                }}
                className="flex items-center justify-center w-10 h-10 rounded-lg text-dark-300 dark:text-light-400 hover:bg-light-300 dark:hover:bg-dark-400 transition-colors duration-200"
                aria-label="Go to next pages"
              >
                ...
              </button>
            </li>
          )}

        {cryptoStoreData.cryptoParams.pageSelected < TotalPages - 1 && (
          <li>
            <button
              onClick={() => {
                cryptoStoreData.cryptoParams.pageSelected = TotalPages;
                cryptoStoreData.updateCryptoParams(cryptoStoreData.cryptoParams);
              }}
              className="flex items-center justify-center w-10 h-10 rounded-lg text-dark-300 dark:text-light-400 hover:bg-light-300 dark:hover:bg-dark-400 transition-colors duration-200"
              aria-label={`Go to last page, page ${TotalPages}`}
            >
              {TotalPages}
            </button>
          </li>
        )}

        <li>
          <button 
            className="flex items-center justify-center w-10 h-10 rounded-lg text-dark-300 dark:text-light-400 hover:bg-light-300 dark:hover:bg-dark-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed" 
            onClick={next}
            disabled={cryptoStoreData.cryptoParams.pageSelected === TotalPages}
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </li>
      </ul>
      </nav>
    </div>
  );
}
