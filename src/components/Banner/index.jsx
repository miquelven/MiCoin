import { TrendingUp, ChevronDown } from 'lucide-react';
import DetailText from "../DetailText";
import banner from "../../assets/images/banner.webp";
import bannerLittle from "../../assets/images/banner2.webp";

export default function Banner() {
  return (
    <section
      id="home"
      className="w-full h-[calc(100vh-80px)] flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-light-100 to-light-300 dark:from-dark-100 dark:to-dark-300"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzMjMyMzIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoLTZ2LTZoNnptLTYtMTJ2Nmg2di02aC02em0xMiA2djZoNnYtNmgtNnptLTYgMTJ2Nmg2di02aC02em0xMiAwdjZoNnYtNmgtNnptLTEyLTI0djZoNnYtNmgtNnptMTIgMHY2aDZ2LTZoLTZ6bS02IDEydjZoNnYtNmgtNnptLTYtNnY2aDZ2LTZoLTZ6bS02IDB2Nmg2di02aC02em0xMiAxMnY2aDZ2LTZoLTZ6bS0xMiAwdjZoNnYtNmgtNnptLTYgMHY2aDZ2LTZoLTZ6bTYgNnY2aDZ2LTZoLTZ6bS02IDZ2Nmg2di02aC02em0xMiAwdjZoNnYtNmgtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30 dark:opacity-10"></div>
      
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-radial from-primary-400/20 via-transparent to-transparent dark:from-primary-600/10 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-secondary-400/30 via-transparent to-transparent dark:from-secondary-600/10 blur-3xl"></div>
      
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        className="w-full max-w-[1200px] mx-auto flex flex-col items-center justify-center gap-8 px-6 z-10"
      >
        <div className="flex items-center justify-center mb-2">
          <span className="px-4 py-2 bg-primary-500/10 dark:bg-primary-500/20 rounded-full text-primary-700 dark:text-primary-300 font-medium flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Monitore o mercado em tempo real
          </span>
        </div>
        
        <h1 className="text-6xl max-md:text-5xl max-sm:text-4xl font-bold text-center text-dark-100 dark:text-light-100 leading-tight">
          Bem-vindo ao <span className="text-primary-600 dark:text-primary-400"><DetailText>Mi</DetailText>Coin</span>
        </h1>
        
        <p className="text-xl max-md:text-lg max-sm:text-base text-center text-dark-200 dark:text-light-300 max-w-2xl">
          Seu hub abrangente para explorar o emocionante mundo das moedas
          digitais. Com <DetailText>preços em tempo real</DetailText>,
          <DetailText> favoritos personalizáveis</DetailText> e as{" "}
          <DetailText> últimas notícias</DetailText>, estamos aqui para ajudá-lo a navegar
          no universo das criptomoedas.
        </p>
        
        <a
          href="#table"
          className="mt-4 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-button hover:shadow-button-hover flex items-center gap-2 group"
        >
          Explorar agora
          <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
        </a>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
        <a href="#features" className="text-dark-300 dark:text-light-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300">
          <ChevronDown className="w-6 h-6" />
        </a>
      </div>
    </section>
  );
}
