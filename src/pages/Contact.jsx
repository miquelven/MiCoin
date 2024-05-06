import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import bgContact from "../assets/images/backgroundContact.png";
import useTitle from "../hooks/useTitle";

export default function Contact() {
  useTitle("Contact");

  const createUserFormSchema = z.object({
    name: z
      .string()
      .nonempty("This field cannot be empty")
      .min(3, "This field must contain at least 3 characters"),
    email: z
      .string()
      .nonempty("This field cannot be empty")
      .email("Please enter a valid email address"),
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
    toast.success("Email sent");
  }

  return (
    <main>
      <section className="relative  flex flex-col w-full justify-center items-center ">
        <h3
          data-aos="zoom-in"
          data-aos-delay="100"
          className=" text-center text-4xl font-semibold mb-5 max-sm:text-3xl"
        >
          Contact Us
        </h3>

        <form
          data-aos="fade-up"
          data-aos-delay="300"
          onSubmit={handleSubmit(createUserData)}
          className="relative z-50 flex flex-col mt-10 gap-8 w-1/2 max-lg:w-8/12 max-sm:w-10/12 max-[390px]:w-11/12"
        >
          <div className="flex flex-col h-[94px] gap-2">
            <label
              htmlFor="name"
              className="text-lg font-bold text-zinc-700 dark:text-zinc-400"
            >
              Name:
            </label>
            <input
              {...register("name")}
              name="name"
              id="name"
              className={`transition-all duration-300 px-2 text-zinc-700 dark:text-zinc-300   rounded-md py-1 border-2 outline-none bg-zinc-200 dark:bg-zinc-900 max-[420px]:border dark:hover:bg-zinc-950 hover:bg-zinc-300 ${
                errors.name
                  ? "border-red-300 dark:border-red-700"
                  : "border-zinc-300 dark:border-zinc-700"
              }`}
            />
            {errors.name && (
              <span className=" text-red-400 dark:text-red-700 font-bold max-[420px]:text-xs">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex flex-col h-[94px] gap-2">
            <label
              htmlFor="email"
              className="text-lg font-bold text-zinc-700 dark:text-zinc-400"
            >
              Email:
            </label>
            <input
              {...register("email")}
              name="email"
              id="email"
              className={`transition-all duration-300 px-2 text-zinc-700 dark:text-zinc-300   rounded-md py-1 border-2 outline-none bg-zinc-200 dark:bg-zinc-900 max-[420px]:border dark:hover:bg-zinc-950 hover:bg-zinc-300 ${
                errors.email
                  ? "border-red-300 dark:border-red-700"
                  : "border-zinc-300 dark:border-zinc-700"
              }`}
            />
            {errors.email && (
              <span className="text-red-400 dark:text-red-700 font-bold max-[420px]:text-xs">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col h-[310px] gap-2">
            <label
              htmlFor="message"
              className="text-lg font-bold text-zinc-700 dark:text-zinc-400"
            >
              Message:
            </label>
            <textarea
              {...register("textArea")}
              name="message"
              id="message"
              cols="30"
              rows="10"
              className={`transition-all duration-300 px-2 text-zinc-700 dark:text-zinc-300  rounded-md py-1 border-2 outline-none bg-zinc-200 dark:bg-zinc-900 rouded-md resize-none max-[420px]:border dark:hover:bg-zinc-950 hover:bg-zinc-300 ${
                textAreaValue.trim().length < 4 && showError
                  ? "border-red-300 dark:border-red-700"
                  : "border-zinc-300 dark:border-zinc-700"
              }`}
              onChange={(e) => setTextAreaValue(e.target.value)}
              value={textAreaValue}
            ></textarea>
            {showError && (
              <span className="text-red-400 dark:text-red-700 font-bold max-[420px]:text-xs">
                {textAreaValue.trim().length == 0 ? (
                  <>This field cannot be empty</>
                ) : (
                  <>
                    {textAreaValue.trim().length < 4 &&
                      textAreaValue.trim().length > 0 && (
                        <>This field must contain at least 5 characters</>
                      )}
                  </>
                )}
              </span>
            )}
          </div>
          <button
            type="submit"
            onClick={() => setShowError(true)}
            className=" bg-blue-600 text-zinc-100 dark:text-zinc-300 dark:hover:text-zinc-100 dark:bg-blue-900  py-2 rounded-md border-2 border-transparent font-bold max-[420px]:py-1 transition-all duration-300 hover:bg-transparent hover:border-zinc-300 dark:hover:border-zinc-700  dark:hover:bg-[#09090b] hover:bg-zinc-400"
          >
            Send
          </button>
        </form>
        <img
          src={bgContact}
          alt="Imagem de fundo"
          className="absolute top-36 left-0 right-0 z-20 dark:blur-2xl blur-2xl opacity-15 dark:opacity-10 scale-150"
        />
      </section>
    </main>
  );
}
