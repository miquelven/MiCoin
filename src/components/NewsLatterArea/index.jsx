import { useState } from "react";
import { toast } from "react-toastify";
import { Mail, Send } from "lucide-react";

export default function NewsLatterArea() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Por favor, insira um email válido");
      return;
    }

    setIsSubmitting(true);
    
    // Simulação de envio para API
    setTimeout(() => {
      toast.success("Inscrição realizada com sucesso!");
      setEmail("");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section
      data-aos="fade-up"
      data-aos-delay="200"
      className="py-20 px-4 md:py-24 relative overflow-hidden bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-900 dark:to-dark-100 rounded-2xl my-20 mx-4"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Fique por dentro das novidades</h2>
          
          <p className="text-white/80 text-lg mb-8">
            Não perca as últimas atualizações sobre mudanças nos ativos! Inscreva-se em
            nossa newsletter e mantenha-se informado para tomar decisões inteligentes e maximizar
            seus investimentos.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
            <div className="relative flex-1">
              <input
                type="email"
                placeholder="Seu melhor email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 px-5 rounded-full bg-white/10 text-white placeholder:text-white/60 border border-white/20 focus:border-white/40 outline-none transition-colors duration-300"
                required
              />
            </div>
            
            <button 
              type="submit"
              disabled={isSubmitting}
              className="h-14 px-8 rounded-full bg-white text-primary-700 font-medium hover:bg-white/90 transition-all duration-300 shadow-button hover:shadow-button-hover disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-primary-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <span>Inscrever-se</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
          
          <p className="text-white/60 text-sm mt-4">
            Prometemos não enviar spam. Você pode cancelar a inscrição a qualquer momento.
          </p>
        </div>
      </div>
    </section>
  );
}
