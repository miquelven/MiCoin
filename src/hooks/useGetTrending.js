import { useQuery } from "@tanstack/react-query";

const getTreding = async () => {
  try {
    const data = await fetch(`https://api.coingecko.com/api/v3/search/trending`)
      .then((res) => res.json())
      .then((json) => json);

    return data.coins;
  } catch (e) {
    toast.error("An error occurred. Please wait a moment and try again");
  }
};

const useGetTrending = () => {
  return useQuery({
    queryKey: ["trending-data"],
    queryFn: () => getTreding(),
  });
};

export default useGetTrending;
