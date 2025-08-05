import { useQuery } from "@tanstack/react-query";
import { API } from "../services/api";

/**
 * Hook para obter dados de múltiplas criptomoedas
 * @param {Array} coins - Lista de IDs das criptomoedas
 * @param {string} currency - Moeda para conversão (ex: usd, eur)
 * @param {string} sortBy - Critério de ordenação
 * @returns {Object} - Resultado da consulta
 */
const useGetCoinsData = (coins, currency, sortBy) => {
  return useQuery({
    queryKey: ["coins-data", coins, currency, sortBy],
    queryFn: () => API.getCoinsData(coins, currency, sortBy),
    staleTime: 3 * 60 * 1000, // 3 minutos
    refetchOnWindowFocus: false,
    enabled: !!coins && coins.length > 0, // Só executa se houver moedas para buscar
  });
};

export default useGetCoinsData;
