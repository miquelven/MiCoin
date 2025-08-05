import { Filter, Info, Star, ThumbsUp } from "lucide-react";

const featuresItens = [
  {
    id: 0,
    icon: <Star size={24} strokeWidth={2} />,
    title: "Favoritos",
    text: "Mantenha suas criptomoedas favoritas ao seu alcance. Marque-as facilmente com um clique para acesso rápido e fácil.",
  },
  {
    id: 1,
    icon: <ThumbsUp size={24} strokeWidth={2} />,
    title: "Tendências",
    text: "Descubra as criptomoedas com melhor desempenho. Veja as melhores opções de investimento rapidamente.",
  },
  {
    id: 2,
    icon: <Filter size={24} strokeWidth={2} />,
    title: "Filtros avançados",
    text: "Personalize sua busca. Use nossas opções de filtragem para encontrar criptomoedas que se adequem ao seu perfil de investimento.",
  },
  {
    id: 3,
    icon: <Info size={24} strokeWidth={2} />,
    title: "Dados detalhados",
    text: "Explore dados abrangentes. Obtenha informações detalhadas sobre cada criptomoeda, incluindo histórico de preços e análise de mercado.",
  },
];

export default featuresItens;
