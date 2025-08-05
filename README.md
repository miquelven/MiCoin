<div align="center">
  <h1>🪙 MiCoin</h1>
  <p><strong>Plataforma completa para monitoramento de criptomoedas em tempo real</strong></p>
  
  ![ezgif com-animated-gif-maker (6)](https://github.com/miquelven/miDrinks/assets/67767211/a2acf266-152d-41aa-a5a2-bce37e7cd6a3)
  
  <p>
    <img src="https://img.shields.io/badge/React-18.2.0-blue?style=flat-square&logo=react" alt="React">
    <img src="https://img.shields.io/badge/Vite-5.1.0-646CFF?style=flat-square&logo=vite" alt="Vite">
    <img src="https://img.shields.io/badge/TailwindCSS-3.4.1-38B2AC?style=flat-square&logo=tailwind-css" alt="Tailwind">
    <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License">
  </p>
</div>

## 📋 Sobre o Projeto

O **MiCoin** é uma aplicação web moderna e responsiva desenvolvida para o monitoramento completo do mercado de criptomoedas. Com uma interface elegante e intuitiva, oferece aos usuários uma experiência completa para acompanhar preços, tendências e dados detalhados de mais de 10.000 criptomoedas em tempo real.

### 🎯 Objetivo

Fornecer uma plataforma centralizada e fácil de usar para investidores e entusiastas de criptomoedas acompanharem o mercado digital com dados precisos e atualizados.




## 🚀 Funcionalidades Principais

### 📊 Dashboard Completo
- **Listagem de Criptomoedas**: Visualize mais de 10.000 criptomoedas com dados em tempo real
- **Pesquisa Avançada**: Encontre rapidamente qualquer criptomoeda por nome ou símbolo
- **Filtros e Ordenação**: Organize dados por preço, capitalização de mercado, volume e variação
- **Paginação Inteligente**: Navegue facilmente através de grandes volumes de dados

### 📈 Análise Detalhada
- **Modal de Detalhes**: Informações completas sobre cada criptomoeda
- **Gráficos Interativos**: Visualize histórico de preços com diferentes períodos (7d, 14d, 30d)
- **Métricas Avançadas**: Cap. de mercado, volume de negociação, fornecimento circulante
- **Indicadores de Sentimento**: Análise de sentimento do mercado

### ⭐ Gestão de Favoritos
- **Lista Personalizada**: Adicione suas criptomoedas favoritas
- **Monitoramento Rápido**: Acesso rápido aos seus ativos preferidos
- **Sincronização Local**: Dados salvos no navegador

### 🎨 Interface e Experiência
- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Tema Escuro/Claro**: Alternância entre temas para melhor experiência
- **Animações Suaves**: Transições e efeitos visuais elegantes
- **Performance Otimizada**: Carregamento rápido e navegação fluida

## 🛠️ Tecnologias e Ferramentas

### Frontend
- **[React 18.2.0](https://reactjs.org/)** - Biblioteca para construção de interfaces
- **[Vite 5.1.0](https://vitejs.dev/)** - Build tool e dev server ultra-rápido
- **[Tailwind CSS 3.4.1](https://tailwindcss.com/)** - Framework CSS utility-first
- **[React Router DOM 6.22.0](https://reactrouter.com/)** - Roteamento para aplicações React

### Gerenciamento de Estado
- **[Zustand 4.5.2](https://github.com/pmndrs/zustand)** - Gerenciamento de estado leve e flexível
- **[React Query 5.32.1](https://tanstack.com/query)** - Gerenciamento de estado do servidor

### Formulários e Validação
- **[React Hook Form 7.50.1](https://react-hook-form.com/)** - Formulários performáticos
- **[Zod 3.22.4](https://zod.dev/)** - Validação de esquemas TypeScript-first
- **[@hookform/resolvers 3.3.4](https://github.com/react-hook-form/resolvers)** - Resolvers para validação

### UI e Experiência
- **[Lucide React 0.330.0](https://lucide.dev/)** - Ícones SVG modernos
- **[Recharts 2.12.0](https://recharts.org/)** - Biblioteca de gráficos para React
- **[React Toastify 10.0.4](https://fkhadra.github.io/react-toastify/)** - Notificações elegantes
- **[AOS 2.3.4](https://michalsnik.github.io/aos/)** - Animações on scroll

### Utilitários
- **[Lodash 4.17.21](https://lodash.com/)** - Biblioteca de utilitários JavaScript
- **[@uidotdev/usehooks 2.4.1](https://usehooks.com/)** - Hooks customizados para React



## 📁 Estrutura do Projeto

```
MiCoin/
├── public/                 # Arquivos estáticos
│   ├── favicon.ico
│   └── ...
├── src/
│   ├── components/         # Componentes reutilizáveis
│   │   ├── Banner/         # Banner principal
│   │   ├── CryptoModal/    # Modal de detalhes da crypto
│   │   ├── Header/         # Cabeçalho da aplicação
│   │   ├── TableArea/      # Área da tabela de cryptos
│   │   └── ...
│   ├── hooks/              # Custom hooks
│   │   ├── useGetCoinData.js
│   │   ├── useGetCoinsData.js
│   │   └── ...
│   ├── pages/              # Páginas da aplicação
│   │   ├── Home.jsx
│   │   ├── FavoritesPage.jsx
│   │   └── ...
│   ├── services/           # Serviços e APIs
│   │   └── api.js
│   ├── stores/             # Gerenciamento de estado
│   │   ├── cryptoStore.js
│   │   └── favoriteCryptoStore.js
│   └── ...
├── package.json
└── README.md
```

## 🌐 API Utilizada

O MiCoin utiliza a **[CoinGecko API](https://www.coingecko.com/en/api)** para obter dados em tempo real sobre criptomoedas:

- **Dados de Mercado**: Preços, capitalização, volume de negociação
- **Informações Detalhadas**: Histórico de preços, estatísticas avançadas
- **Trending**: Criptomoedas em alta no momento
- **Pesquisa**: Busca por nome ou símbolo

> ⚠️ **Limitação**: A API possui limite de requisições. Em caso de muitas consultas simultâneas, algumas funcionalidades podem ter delay.


## ⚡ Performance e Otimizações

- **Cache Inteligente**: Implementação de cache para reduzir requisições desnecessárias
- **Rate Limiting**: Controle de taxa de requisições para evitar bloqueios da API
- **Lazy Loading**: Carregamento sob demanda de componentes e dados
- **Debounce**: Otimização de pesquisas em tempo real
- **Memoização**: Uso de React.memo e useMemo para otimizar re-renderizações

## 🚀 Instalação e Execução

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 16.0 ou superior)
- **npm** ou **yarn** (gerenciador de pacotes)
- **Git** (para clonar o repositório)

### Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/miquelven/MiCoin.git
   ```

2. **Navegue até o diretório**
   ```bash
   cd MiCoin
   ```

3. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

4. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. **Acesse a aplicação**
   
   Abra seu navegador e acesse: [http://localhost:5173](http://localhost:5173)

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção localmente

### Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Existem várias formas de contribuir com o projeto:

### Como Contribuir

1. **Fork** o projeto
2. **Clone** seu fork localmente
3. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
4. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
5. **Push** para a branch (`git push origin feature/AmazingFeature`)
6. **Abra** um Pull Request

### Tipos de Contribuição

- 🐛 **Bug Reports**: Encontrou um bug? Abra uma issue!
- 💡 **Feature Requests**: Tem uma ideia? Compartilhe conosco!
- 📖 **Documentação**: Ajude a melhorar a documentação
- 🎨 **Design**: Sugestões de melhorias na UI/UX
- 🧪 **Testes**: Adicione ou melhore testes existentes

### Diretrizes

- Mantenha o código limpo e bem documentado
- Siga os padrões de código existentes
- Teste suas alterações antes de enviar
- Descreva claramente suas mudanças no PR

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Miquel Ventura**
- GitHub: [@miquelven](https://github.com/miquelven)
- LinkedIn: [Miquel Ventura](https://linkedin.com/in/miquelven)

## 🙏 Agradecimentos

- [CoinGecko](https://www.coingecko.com/) pela API gratuita e confiável
- [React](https://reactjs.org/) pela excelente biblioteca
- [Tailwind CSS](https://tailwindcss.com/) pelo framework CSS incrível
- Comunidade open source por todas as bibliotecas utilizadas

---

<div align="center">
  <p>⭐ Se este projeto te ajudou, considere dar uma estrela!</p>
  <p>Feito com ❤️ por <a href="https://github.com/miquelven">Miquel Ventura</a></p>
</div>
