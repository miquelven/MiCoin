import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { useContext } from "react";
import { CryptoContext } from "../../../../context/CryptoContext";

export default function Pagination() {
  const { pageSelected, setPageSelected, totalPages, per_page } =
    useContext(CryptoContext);

  const TotalPages = Math.ceil(totalPages / per_page);

  const next = () => {
    if (pageSelected == TotalPages) {
      return null;
    } else {
      setPageSelected(pageSelected + 1);
    }
  };

  const prev = () => {
    if (pageSelected == 1) {
      return null;
    } else {
      setPageSelected(pageSelected - 1);
    }
  };

  return (
    <div className="flex items-center ">
      <ul className="flex items-center justify-end text-sm">
        <li className="flex items-center">
          <button className="outline-0  w-8" onClick={prev}>
            <ArrowLeftCircle className="text-blue-700 hover:text-blue-500" />
          </button>
        </li>

        {pageSelected > 2 && (
          <li>
            <button
              onClick={() => setPageSelected(1)}
              className="outline-0 hover:text-blue-500 rounded-full w-8 h-8 flex items-center justify-center bg-zinc-800 mx-1.5"
            >
              1
            </button>
          </li>
        )}

        {pageSelected > 3 && (
          <li>
            <button
              onClick={() => setPageSelected(pageSelected - 3)}
              className="outline-0 hover:text-blue-500 rounded-full w-8 h-8 flex items-center justify-center mx-1.5 "
            >
              ...
            </button>
          </li>
        )}
        {pageSelected !== 1 && (
          <li>
            <button
              onClick={prev}
              className="outline-0 hover:text-blue-500 rounded-full w-8 h-8 flex items-center justify-center bg-zinc-800 mx-1.5"
            >
              {pageSelected - 1}
            </button>
          </li>
        )}
        <li>
          <button
            disabled
            className="outline-0 hover:text-blue-500 rounded-full w-8 h-8 flex items-center justify-center bg-blue-700 mx-1.5 "
          >
            {pageSelected}
          </button>
        </li>

        {pageSelected !== TotalPages && (
          <li>
            <button
              onClick={next}
              className="outline-0 hover:text-blue-500 rounded-full w-8 h-8 flex items-center justify-center bg-zinc-800 mx-1.5"
            >
              {pageSelected + 1}
            </button>
          </li>
        )}

        {pageSelected < TotalPages - 2 && (
          <li>
            <button
              onClick={() => setPageSelected(pageSelected + 3)}
              className="outline-0 hover:text-blue-500 rounded-full w-8 h-8 flex items-center justify-center mx-1.5 "
            >
              ...
            </button>
          </li>
        )}

        {pageSelected < TotalPages - 1 && (
          <li>
            <button
              onClick={() => setPageSelected(TotalPages)}
              className="outline-0 hover:text-blue-500 rounded-full w-8 h-8 flex items-center justify-center bg-zinc-800 mx-1.5"
            >
              {TotalPages}
            </button>
          </li>
        )}

        <li>
          <button className="outline-0  w-8" onClick={next}>
            <ArrowRightCircle className="text-blue-700 hover:text-blue-500" />
          </button>
        </li>
      </ul>
    </div>
  );
}
