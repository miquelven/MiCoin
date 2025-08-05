import featuresItens from "../../data/featuresItens";
import { Sparkles } from "lucide-react";

export default function FeaturesArea() {
  return (
    <section className="py-24 px-4 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-light-100 to-white dark:from-dark-200 dark:to-dark-100 -z-10"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-primary-100/20 to-transparent dark:from-primary-900/10 dark:to-transparent opacity-70 -z-10"></div>
      
      {/* Section header */}
      <div className="container mx-auto mb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-light-300 dark:bg-dark-400 px-4 py-2 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-primary-500" />
          <span className="text-sm font-medium text-dark-300 dark:text-light-400">Recursos exclusivos</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-dark-100 dark:text-light-100 mb-4">Por que escolher MiCoin?</h2>
        <p className="text-dark-300 dark:text-light-400 max-w-2xl mx-auto">Descubra as ferramentas e recursos que tornam nossa plataforma a escolha ideal para acompanhar o mercado de criptomoedas.</p>
      </div>
      
      {/* Features grid */}
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {featuresItens.map((item, index) => (
            <div
              data-aos="fade-up"
              data-aos-delay={index * 100}
              key={item.id}
              className="bg-white dark:bg-dark-300 rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300 shadow-card hover:shadow-card-hover group"
            >
              <div className="w-14 h-14 flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 rounded-full mb-6 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-dark-100 dark:text-light-100 mb-3">{item.title}</h3>
              <p className="text-dark-300 dark:text-light-400">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
