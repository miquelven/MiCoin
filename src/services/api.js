import { toast } from "react-toastify";

// Configuração para controle de taxa de requisições
const API_RATE_LIMIT = {
  maxRequests: 50, // Número máximo de requisições permitidas
  timeWindow: 60 * 1000, // Janela de tempo em milissegundos (1 minuto)
  requestCount: 0, // Contador de requisições
  lastReset: Date.now(), // Último reset do contador
};

// Cache para armazenar respostas da API
const apiCache = new Map();

// Tempo de expiração do cache em milissegundos (5 minutos)
const CACHE_EXPIRATION = 5 * 60 * 1000;

/**
 * Verifica se o limite de requisições foi atingido
 * @returns {boolean} - true se o limite foi atingido, false caso contrário
 */
const isRateLimitExceeded = () => {
  const now = Date.now();
  
  // Reseta o contador se a janela de tempo expirou
  if (now - API_RATE_LIMIT.lastReset > API_RATE_LIMIT.timeWindow) {
    API_RATE_LIMIT.requestCount = 0;
    API_RATE_LIMIT.lastReset = now;
  }
  
  return API_RATE_LIMIT.requestCount >= API_RATE_LIMIT.maxRequests;
};

/**
 * Incrementa o contador de requisições
 */
const incrementRequestCount = () => {
  API_RATE_LIMIT.requestCount += 1;
};

/**
 * Gera uma chave de cache para a URL e parâmetros
 * @param {string} url - URL da requisição
 * @param {Object} params - Parâmetros da requisição
 * @returns {string} - Chave de cache
 */
const generateCacheKey = (url, params = {}) => {
  return `${url}?${Object.entries(params)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([key, value]) => `${key}=${value}`)
    .join("&")}`;
};

/**
 * Verifica se há uma resposta em cache válida
 * @param {string} cacheKey - Chave de cache
 * @returns {Object|null} - Resposta em cache ou null se não houver
 */
const getFromCache = (cacheKey) => {
  if (!apiCache.has(cacheKey)) {
    return null;
  }
  
  const cachedData = apiCache.get(cacheKey);
  const now = Date.now();
  
  // Verifica se o cache expirou
  if (now - cachedData.timestamp > CACHE_EXPIRATION) {
    apiCache.delete(cacheKey);
    return null;
  }
  
  return cachedData.data;
};

/**
 * Armazena uma resposta no cache
 * @param {string} cacheKey - Chave de cache
 * @param {Object} data - Dados a serem armazenados
 */
const saveToCache = (cacheKey, data) => {
  apiCache.set(cacheKey, {
    data,
    timestamp: Date.now(),
  });
};

/**
 * Realiza uma requisição à API com controle de taxa e cache
 * @param {string} url - URL da requisição
 * @param {Object} options - Opções da requisição
 * @param {boolean} useCache - Indica se deve usar cache
 * @returns {Promise<Object>} - Resposta da API
 */
export const fetchWithRateLimit = async (url, options = {}, useCache = true) => {
  try {
    // Gera a chave de cache
    const cacheKey = generateCacheKey(url, options);
    
    // Verifica se há uma resposta em cache
    if (useCache) {
      const cachedData = getFromCache(cacheKey);
      if (cachedData) {
        return cachedData;
      }
    }
    
    // Verifica se o limite de requisições foi atingido
    if (isRateLimitExceeded()) {
      toast.warning("API rate limit reached. Using cached data or waiting for reset.");
      
      // Tenta retornar dados em cache mesmo que estejam expirados
      if (apiCache.has(cacheKey)) {
        return apiCache.get(cacheKey).data;
      }
      
      // Espera um tempo antes de tentar novamente
      await new Promise(resolve => setTimeout(resolve, 2000));
      return fetchWithRateLimit(url, options, useCache);
    }
    
    // Incrementa o contador de requisições
    incrementRequestCount();
    
    // Realiza a requisição
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    // Armazena a resposta no cache
    if (useCache) {
      saveToCache(cacheKey, data);
    }
    
    return data;
  } catch (error) {
    console.error("API request error:", error);
    toast.error("An error occurred. Please wait a moment and try again");
    throw error;
  }
};

// Endpoints da API
const API_BASE_URL = "https://api.coingecko.com/api/v3";

export const API = {
  /**
   * Obtém dados de mercado de uma moeda
   * @param {Object} params - Parâmetros da requisição
   * @returns {Promise<Object>} - Dados da moeda
   */
  getCryptoCurrency: async (params) => {
    const { currency = "usd", coinSelected = "", sortBy = "market_cap_desc", per_page = 10, pageSelected = 1 } = params;
    
    const url = `${API_BASE_URL}/coins/markets?vs_currency=${currency}&ids=${coinSelected}&order=${sortBy}&per_page=${per_page}&page=${pageSelected}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`;
    
    return fetchWithRateLimit(url);
  },
  
  /**
   * Obtém dados detalhados de uma moeda
   * @param {string} coinId - ID da moeda
   * @returns {Promise<Object>} - Dados detalhados da moeda
   */
  getCoinData: async (coinId) => {
    const url = `${API_BASE_URL}/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`;
    
    return fetchWithRateLimit(url);
  },
  
  /**
   * Obtém dados de mercado de várias moedas
   * @param {Array<string>} coins - IDs das moedas
   * @param {string} currency - Moeda de referência
   * @param {string} sortBy - Ordenação
   * @returns {Promise<Object>} - Dados das moedas
   */
  getCoinsData: async (coins, currency, sortBy) => {
    const url = `${API_BASE_URL}/coins/markets?vs_currency=${currency}&ids=${coins.join(",")}&order=${sortBy}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`;
    
    return fetchWithRateLimit(url);
  },
  
  /**
   * Obtém moedas em tendência
   * @returns {Promise<Object>} - Moedas em tendência
   */
  getTrending: async () => {
    const url = `${API_BASE_URL}/search/trending`;
    
    const data = await fetchWithRateLimit(url);
    return data.coins;
  },
  
  /**
   * Obtém o número total de páginas
   * @returns {Promise<number>} - Número total de páginas
   */
  getTotalPages: async () => {
    const url = `${API_BASE_URL}/coins/list`;
    
    const data = await fetchWithRateLimit(url, {}, true);
    return data.length;
  },
  
  /**
   * Pesquisa moedas
   * @param {string} textSearch - Texto de pesquisa
   * @returns {Promise<Object>} - Resultados da pesquisa
   */
  getSearchItems: async (textSearch) => {
    if (!textSearch || textSearch.trim() === "") {
      return [];
    }
    
    const url = `${API_BASE_URL}/search?query=${textSearch}`;
    
    const data = await fetchWithRateLimit(url);
    return data.coins;
  },
  
  /**
   * Obtém dados de gráfico de uma moeda
   * @param {string} coinId - ID da moeda
   * @param {string} currency - Moeda de referência
   * @param {number} days - Número de dias
   * @returns {Promise<Object>} - Dados do gráfico
   */
  getChartData: async (coinId, currency = "usd", days = 7) => {
    const url = `${API_BASE_URL}/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}&interval=daily`;
    
    return fetchWithRateLimit(url);
  },
  

  


};