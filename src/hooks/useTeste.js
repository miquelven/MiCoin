import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const test = async ({
  currency = "usd",
  coinSelected = "",
  sortBy = "market_cap_desc",
  per_page = 10,
  pageSelected = 1,
} = params) => {
  try {
    const data = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSelected}&order=${sortBy}&per_page=${per_page}&page=${pageSelected}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((json) => json);
    console.log("USETEST " + data);
    return data;
  } catch (e) {
    toast.error("An error occurred. Please wait a moment and try again");
  }
};

const useTest = (params) => {
  return useQuery({
    queryKey: ["test", params],
    queryFn: () => test(params),
  });
};

export default useTest;
