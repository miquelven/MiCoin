import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";

export default function Contact() {
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

  function createUserData(data) {
    console.log(data);
    toast.success("Email sent!");

    // setFormValues(JSON.stringify(data, null, 2));
  }

  return (
    <section className="flex flex-col w-full justify-center items-center ">
      <h2 className=" text-center text-4xl font-bold mb-5">Contact Us</h2>

      <form
        onSubmit={handleSubmit(createUserData)}
        className="flex flex-col mt-10 gap-8 w-1/2"
      >
        <div className="flex flex-col gap-2">
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
            className={`px-2 text-zinc-700 dark:text-zinc-300   rounded-md py-1 border-2 outline-none bg-zinc-200 dark:bg-zinc-900 ${
              errors.name
                ? "border-red-300 dark:border-red-700"
                : "border-zinc-300 dark:border-zinc-700"
            }`}
          />
          {errors.name && (
            <span className=" text-red-400 dark:text-red-700 font-bold">
              {errors.name.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
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
            className={`px-2 text-zinc-700 dark:text-zinc-300   rounded-md py-1 border-2 outline-none bg-zinc-200 dark:bg-zinc-900 ${
              errors.email
                ? "border-red-300 dark:border-red-700"
                : "border-zinc-300 dark:border-zinc-700"
            }`}
          />
          {errors.email && (
            <span className="text-red-400 dark:text-red-700 font-bold">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
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
            className={`px-2 text-zinc-700 dark:text-zinc-300  rounded-md py-1 border-2 outline-none bg-zinc-200 dark:bg-zinc-900 rouded-md resize-none ${
              textAreaValue.trim().length < 4 && showError
                ? "border-red-300 dark:border-red-700"
                : "border-zinc-300 dark:border-zinc-700"
            }`}
            onChange={(e) => setTextAreaValue(e.target.value)}
            value={textAreaValue}
          ></textarea>
          {showError && (
            <span className="text-red-400 dark:text-red-700 font-bold">
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
          className="bg-blue-600 hover:bg-blue-700 text-zinc-100 dark:text-zinc-300 dark:hover:text-zinc-100 dark:bg-blue-900 dark:hover:bg-blue-700 py-2 rounded-md border-2 border-transparent font-bold transition-all duration-300 hover:bg-transparent "
        >
          Send
        </button>
      </form>
    </section>
  );
}
