import { useQuery } from "@tanstack/react-query";

const getCoinsData = async (coins, currency, sortBy) => {
  try {
    const data = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coins.join(
        ","
      )}&order=${sortBy}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((json) => json);

    return data;
  } catch (e) {
    toast.error("An error occurred. Please wait a moment and try again");
  }
};

const useGetCoinsData = (coins, currency, sortBy) => {
  return useQuery({
    queryKey: ["coins-data", coins],
    queryFn: () => getCoinsData(coins, currency, sortBy),
  });
};

export default useGetCoinsData;
