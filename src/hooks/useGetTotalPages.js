import { useQuery } from "@tanstack/react-query";

const getTotalPages = async () => {
  try {
    const data = await fetch(`https://api.coingecko.com/api/v3/coins/list`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => json);

    return data.length;
  } catch (e) {
    toast.error("An error occurred. Please wait a moment and try again");
  }
};

const useGetTotalPages = () => {
  return useQuery({
    queryKey: ["total-pages"],
    queryFn: () => getTotalPages(),
  });
};

export default useGetTotalPages;
