import { useQuery } from "@tanstack/react-query";

const getCoinData = async (coinId) => {
  try {
    const data = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`,
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

const useGetCoinData = (coinId) => {
  return useQuery({
    queryKey: ["coin-data", coinId],
    queryFn: () => getCoinData(coinId),
  });
};

export default useGetCoinData;
