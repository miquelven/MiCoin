import { useQuery } from "@tanstack/react-query";
import { API } from "../services/api";

/**
 * Hook para buscar criptomoedas com base em um texto de pesquisa
 * @param {string} textSearch - Texto para pesquisa
 * @returns {Object} - Resultado da consulta
 */
const useGetSearchItens = (textSearch) => {
  return useQuery({
    queryKey: ["search-data", textSearch],
    queryFn: () => API.getSearchItems(textSearch),
    staleTime: 2 * 60 * 1000, // 2 minutos
    refetchOnWindowFocus: false,
    enabled: !!textSearch && textSearch.length > 1, // Só executa se tiver pelo menos 2 caracteres
  });
};

export default useGetSearchItens;
