import { useQuery } from "@tanstack/react-query";
import { API } from "../services/api";

/**
 * Hook para obter dados de criptomoedas com base nos parâmetros fornecidos
 * @param {Object} params - Parâmetros para a consulta
 * @returns {Object} - Resultado da consulta
 */
const useGetCryptoCurrency = (params) => {
  return useQuery({
    queryKey: ["crypto-currency", params],
    queryFn: () => API.getCryptoCurrency(params),
    staleTime: 2 * 60 * 1000, // 2 minutos
    refetchOnWindowFocus: false,
  });
};

export default useGetCryptoCurrency;
