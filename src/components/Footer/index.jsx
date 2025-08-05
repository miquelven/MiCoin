import Container from "../../components/Container";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-light-200 dark:bg-dark-300 py-12 mt-20">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">Mi</span>
              </div>
              <span className="text-dark-100 dark:text-light-100 font-bold text-xl">MiCoin</span>
            </div>
            <p className="text-dark-300 dark:text-light-400 text-sm text-center md:text-left max-w-xs">
              Acompanhe o mercado de criptomoedas com facilidade e precisão. Dados em tempo real para investidores inteligentes.
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4">
              <a 
                href="https://github.com/miquelven" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-light-300 dark:bg-dark-400 flex items-center justify-center text-dark-300 dark:text-light-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://linkedin.com/in/miquelven" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-light-300 dark:bg-dark-400 flex items-center justify-center text-dark-300 dark:text-light-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://twitter.com/miquelven" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-light-300 dark:bg-dark-400 flex items-center justify-center text-dark-300 dark:text-light-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
            <span className="text-dark-300 dark:text-light-400 text-sm">
              © {currentYear} Desenvolvido por <a href="https://github.com/miquelven" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">Miquelven</a>
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
