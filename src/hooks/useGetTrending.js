import { useQuery } from "@tanstack/react-query";
import { API } from "../services/api";

/**
 * Hook para obter as criptomoedas em tendência
 * @returns {Object} - Resultado da consulta
 */
const useGetTrending = () => {
  return useQuery({
    queryKey: ["trending"],
    queryFn: () => API.getTrending(),
    staleTime: 15 * 60 * 1000, // 15 minutos
    refetchOnWindowFocus: false,
  });
};

export default useGetTrending;
