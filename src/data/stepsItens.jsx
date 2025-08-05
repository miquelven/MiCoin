import stepFavorite1 from "../assets/images/stepImg1.png";
import stepFavorite2 from "../assets/images/stepImg2.png";
import stepFavorite3 from "../assets/images/stepImg3.png";

const stepsItens = [
  {
    id: 0,
    stepCounter: "Adicione aos favoritos",
    text: "Clique no ícone de estrela ao lado do ativo que você deseja adicionar aos favoritos. A estrela ficará preenchida indicando que o ativo foi adicionado com sucesso.",
    img: stepFavorite1,
    alt: "Imagem passo a passo de como favoritar um ativo",
  },
  {
    id: 1,
    stepCounter: "Acesse a página de favoritos",
    text: "Navegue até a aba 'Favoritos' no menu principal para visualizar todos os seus ativos favoritos em um só lugar.",
    img: stepFavorite2,
    alt: "Imagem passo a passo de como acessar os favoritos",
  },
  {
    id: 2,
    stepCounter: "Gerencie seus favoritos",
    text: "Visualize informações detalhadas sobre seus ativos favoritos, incluindo preços atualizados, variações e dados de mercado. Você pode remover um ativo dos favoritos clicando novamente na estrela.",
    img: stepFavorite3,
    alt: "Imagem passo a passo de como gerenciar os favoritos",
  },
];

export default stepsItens;
