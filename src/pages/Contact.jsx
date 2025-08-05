import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import bgContact from "../assets/images/backgroundContact.png";

export default function Contact() {
  const createUserFormSchema = z.object({
    name: z
      .string()
      .nonempty("Este campo não pode estar vazio")
      .min(3, "Este campo deve conter pelo menos 3 caracteres"),
    email: z
      .string()
      .nonempty("Este campo não pode estar vazio")
      .email("Por favor, insira um endereço de email válido"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createUserFormSchema),
  });

  const [textAreaValue, setTextAreaValue] = useState("");
  const [showError, setShowError] = useState(false);

  function createUserData() {
    toast.success("Mensagem enviada com sucesso!");
  }

  return (
    <>
      <Helmet>
        <title>MiCoin - Contato</title>
        <meta
          name="description"
          content="Entre em contato conosco na MiCoin para discutir dúvidas sobre criptomoedas, parcerias ou suporte técnico. Nossa equipe está aqui para ajudá-lo com qualquer pergunta que você possa ter sobre nossa plataforma ou assuntos relacionados a criptomoedas. Entre em contato hoje e vamos navegar juntos pelo mundo das criptomoedas."
        />
        <meta
          name="keywords"
          content="criptomoeda, cripto, bitcoin, blockchain, ethereum, moeda digital, mercado de criptomoedas, notícias de criptomoedas, preços de criptomoedas, negociação de criptomoedas"
        />
        <meta name="author" content="MiCoin" />
      </Helmet>

      <main>
        <section className="relative flex flex-col w-full justify-center items-center py-24 bg-light-200 dark:bg-dark-200">
          <div className="max-w-[1200px] mx-auto px-6 w-full">
            <div className="flex flex-col items-center mb-10">
              <span 
                data-aos="fade-up" 
                data-aos-delay="100"
                className="bg-light-300 dark:bg-dark-300 text-primary-500 font-medium py-1 px-4 rounded-full text-sm mb-4 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contato
              </span>
              <h3
                data-aos="zoom-in"
                data-aos-delay="200"
                className="text-center text-4xl font-bold mb-4 text-dark-100 dark:text-light-100 max-sm:text-3xl"
              >
                Entre em contato conosco
              </h3>
              <p 
                data-aos="fade-up"
                data-aos-delay="300"
                className="text-center text-dark-400 dark:text-light-400 max-w-2xl"
              >
                Tem alguma dúvida ou sugestão? Preencha o formulário abaixo e nossa equipe entrará em contato o mais breve possível.
              </p>
            </div>

          <form
            data-aos="fade-up"
            data-aos-delay="400"
            onSubmit={handleSubmit(createUserData)}
            className="relative z-50 flex flex-col gap-6 w-full max-w-2xl mx-auto bg-white dark:bg-dark-300 p-8 rounded-xl shadow-card dark:shadow-none"
          >
            <div className="flex flex-col gap-1">
              <label
                htmlFor="name"
                className="text-sm font-medium text-dark-300 dark:text-light-400"
              >
                Nome
              </label>
              <input
                {...register("name")}
                name="name"
                id="name"
                placeholder="Digite seu nome"
                className={`transition-all duration-300 px-4 py-3 text-dark-200 dark:text-light-200 rounded-lg outline-none bg-light-100 dark:bg-dark-400 focus:ring-2 ${
                  errors.name
                    ? "border border-red-500 focus:ring-red-500/20"
                    : "border border-light-300 dark:border-dark-500 focus:ring-primary-500/20"
                }`}
              />
              {errors.name && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-dark-300 dark:text-light-400"
              >
                Email
              </label>
              <input
                {...register("email")}
                name="email"
                id="email"
                placeholder="Digite seu email"
                className={`transition-all duration-300 px-4 py-3 text-dark-200 dark:text-light-200 rounded-lg outline-none bg-light-100 dark:bg-dark-400 focus:ring-2 ${
                  errors.email
                    ? "border border-red-500 focus:ring-red-500/20"
                    : "border border-light-300 dark:border-dark-500 focus:ring-primary-500/20"
                }`}
              />
              {errors.email && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="message"
                className="text-sm font-medium text-dark-300 dark:text-light-400"
              >
                Mensagem
              </label>
              <textarea
                {...register("textArea")}
                name="message"
                id="message"
                cols="30"
                rows="6"
                placeholder="Digite sua mensagem"
                className={`transition-all duration-300 px-4 py-3 text-dark-200 dark:text-light-200 rounded-lg outline-none bg-light-100 dark:bg-dark-400 focus:ring-2 resize-none ${
                  textAreaValue.trim().length < 4 && showError
                    ? "border border-red-500 focus:ring-red-500/20"
                    : "border border-light-300 dark:border-dark-500 focus:ring-primary-500/20"
                }`}
                onChange={(e) => setTextAreaValue(e.target.value)}
                value={textAreaValue}
              ></textarea>
              {showError && (
                <span className="text-red-500 text-xs mt-1">
                  {textAreaValue.trim().length == 0 ? (
                    <>Este campo não pode estar vazio</>
                  ) : (
                    <>
                      {textAreaValue.trim().length < 4 &&
                        textAreaValue.trim().length > 0 && (
                          <>Este campo deve conter pelo menos 5 caracteres</>
                        )}
                    </>
                  )}
                </span>
              )}
            </div>
            <button
              type="submit"
              onClick={() => setShowError(true)}
              className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 mt-2 focus:ring-2 focus:ring-primary-500/20 outline-none"
            >
              Enviar mensagem
            </button>
          </form>
          </div>
          <img
            src={bgContact}
            alt="Imagem de fundo"
            className="absolute top-0 left-0 right-0 w-full h-full object-cover z-10 opacity-5 dark:opacity-[0.03]"
          />
        </section>
      </main>
    </>
  );
}
