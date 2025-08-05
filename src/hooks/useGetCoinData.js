import { useQuery } from "@tanstack/react-query";
import { API } from "../services/api";

/**
 * Hook para obter dados detalhados de uma criptomoeda específica
 * @param {string} coinId - ID da criptomoeda
 * @returns {Object} - Resultado da consulta
 */
const useGetCoinData = (coinId) => {
  return useQuery({
    queryKey: ["coin-data", coinId],
    queryFn: () => API.getCoinData(coinId),
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: false,
    enabled: !!coinId, // Só executa se coinId for fornecido
  });
};

export default useGetCoinData;
