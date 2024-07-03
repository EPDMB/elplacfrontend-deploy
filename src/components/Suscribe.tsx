"use client"
import React from "react"
import { useState } from "react"
import "react-toastify/dist/ReactToastify.css"
import { notify } from "./Notifications/Notifications"

export const Suscribe = () => {
  const [email, setEmail] = useState("");

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (validateEmail(email)) {
      notify("ToastRedirect", "Gracias por suscribirte a nuestro Newsletter!")
    } else {
      notify("ToastError", "Por favor, introduce un correo electrónico válido")
    }
    setEmail("")
  }

  return (
    <div className=" bg-secondary-light flex flex-col md:flex-row w-full justify-around items-center p-4 sm:p-12">
      <div className="flex flex-col justify-center items-center text-center mb-4 md:mb-0">
        <div className="text-primary-darker font-semibold ">
          ¡Suscribite a nuestro Newsletter y{" "}
        </div>
        <div className="text-primary-darker font-semibold">
          enterate primero de las próximas ferias!
        </div>
      </div>

      <div className="flex flex-col">
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="sm:w-64 sm:h-12 w-32 h-8 bg-primary-lighter rounded-lg border border-primary-default p-2"
          />

          <button
            type="submit"
            className="ml-4 px-3 py-2 bg-primary-default text-white rounded-lg text-xs sm:text-base"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
