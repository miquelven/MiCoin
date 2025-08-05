import { useQuery } from "@tanstack/react-query";
import { API } from "../services/api";

/**
 * Hook para obter o número total de criptomoedas disponíveis
 * @returns {Object} - Resultado da consulta com o número total de páginas
 */
const useGetTotalPages = () => {
  return useQuery({
    queryKey: ["total-pages"],
    queryFn: () => API.getTotalPages(),
    staleTime: 60 * 60 * 1000, // 1 hora (essa informação muda raramente)
    refetchOnWindowFocus: false,
  });
};

export default useGetTotalPages;
