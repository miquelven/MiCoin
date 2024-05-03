import { useQuery } from "@tanstack/react-query";

const getSearchData = async (textSearch) => {
  try {
    const data = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${textSearch}`
    )
      .then((res) => res.json())
      .then((json) => json);

    return data.coins;
  } catch (e) {
    toast.error("An error occurred. Please wait a moment and try again");
  }
};

const useGetSearch = (textSearch) => {
  return useQuery({
    queryKey: ["search-data", textSearch],
    queryFn: () => getSearchData(textSearch),
  });
};

export default useGetSearch;
