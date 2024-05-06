import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
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
    <div className="flex items-center max-[470px]:flex-col max-[470px]:gap-7 max-[470px]:pt-10">
      <ul className="flex items-center justify-end text-sm">
        <li className="flex items-center">
          <button className="outline-0  w-8" onClick={prev}>
            <ArrowLeftCircle className="text-blue-400 hover:text-blue-500 dark:text-blue-700 dark:hover:text-blue-500" />
          </button>
        </li>

        {cryptoStoreData.cryptoParams.pageSelected > 2 && (
          <li>
            <button
              onClick={() => setPageSelected(1)}
              className="outline-0 hover:text-blue-500 rounded-full w-8 h-8 flex items-center justify-center bg-zinc-300 dark:bg-zinc-800 mx-1.5"
            >
              1
            </button>
          </li>
        )}

        {cryptoStoreData.cryptoParams.pageSelected > 3 && (
          <li>
            <button
              onClick={() => setPageSelected(pageSelected - 3)}
              className="outline-0 hover:text-blue-500 rounded-full w-8 h-8 flex items-center justify-center mx-1.5 "
            >
              ...
            </button>
          </li>
        )}
        {cryptoStoreData.cryptoParams.pageSelected !== 1 && (
          <li>
            <button
              onClick={prev}
              className="outline-0 hover:text-blue-500 rounded-full w-8 h-8 flex items-center justify-center bg-zinc-300 dark:bg-zinc-800 mx-1.5"
            >
              {cryptoStoreData.cryptoParams.pageSelected - 1}
            </button>
          </li>
        )}
        <li>
          <button
            disabled
            className="outline-0 hover:text-blue-100 dark:hover:text-blue-500 rounded-full w-8 h-8 flex items-center justify-center bg-blue-400 dark:bg-blue-700 mx-1.5 "
          >
            {cryptoStoreData.cryptoParams.pageSelected}
          </button>
        </li>

        {cryptoStoreData.cryptoParams.pageSelected !== TotalPages && (
          <li>
            <button
              onClick={next}
              className="outline-0  dark:hover:text-blue-500 rounded-full w-8 h-8 flex items-center justify-center bg-zinc-300 hover:bg-zinc-400  dark:bg-zinc-800 mx-1.5"
            >
              {cryptoStoreData.cryptoParams.pageSelected + 1}
            </button>
          </li>
        )}

        {cryptoStoreData.cryptoParams.pageSelected < TotalPages - 2 && (
          <li>
            <button
              onClick={() => setPageSelected(pageSelected + 3)}
              className="outline-0 font-bold dark:font-normal dark:hover:text-blue-500 rounded-full w-8 h-8 flex items-center justify-center mx-1.5 "
            >
              ...
            </button>
          </li>
        )}

        {cryptoStoreData.cryptoParams.pageSelected < TotalPages - 1 && (
          <li>
            <button
              onClick={() => setPageSelected(TotalPages)}
              className="outline-0  dark:hover:text-blue-500 rounded-full w-8 h-8 flex items-center justify-center bg-zinc-300 hover:bg-zinc-400  dark:bg-zinc-800 mx-1.5"
            >
              {TotalPages}
            </button>
          </li>
        )}

        <li>
          <button className="outline-0  w-8" onClick={next}>
            <ArrowRightCircle className="text-blue-400 hover:text-blue-500 dark:text-blue-700 dark:hover:text-blue-500" />
          </button>
        </li>
      </ul>
    </div>
  );
}
