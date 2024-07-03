import React from "react";
import Navbar from "./Navbar";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import Cloud2 from "@/assets/Cloud2.svg";

function AboutUs() {
  return (
    <div>
      <div className="w-full h-32 flex items-center">
        <Navbar />
      </div>

      <div className="flex items-center justify-center min-h-screen bg-secondary-lighter">
        <div className="w-3/4 h-[35rem] bg-secondary-lighter rounded-xl p-14 relative text-center border-2 border-primary-light mt-16">
          <div className=" text-primary-darker text-5xl font-bold mb-12 -mt-20">
            Nuestra historia
          </div>

          <div className="text-start mt-4 px-4 mb-4">
            <span className="text-primary-darker text-base font-medium">
              El{" "}
            </span>
            <span className="text-primary-darker text-base font-bold ">
              Placard de mi Bebot
            </span>
            <span className="text-primary-darker text-base font-medium">
              {" "}
              nace en 2017 con la idea de ayudarnos entre todos a ahorrar y
              reutilizar la ropa usada. Empezamos publicando artículos en
              Facebook, pero al poco tiempo nos dimos cuenta que necesitábamos
              un espacio físico para desarrollar de mejor manera nuestras
              actividades, y surgió nuestro primer showroom en zona Tribunales.
            </span>
            <br />
            <br />

            <span className="text-primary-darker text-base font-medium">
              Fuimos creciendo al mismo tiempo que la moda de reciclar y cuidar
              el medio ambiente se iba instalando con mayor fuerza en Argentina.
              Esto nos permitió crear nuestra Tienda Online y encontrar un
              showroom acorde a nuestras necesidades.
            </span>
            <br />
            <br />

            <span className="text-primary-darker text-base font-medium">
              Desde el 2019 incorporamos al negocio 4 grandes ferias anuales:
              Otoño/Invierno en abril - Día del Niño en agosto -
              Primavera/Verano en octubre - Fin de Año en diciembre. Son un
              éxito para vendedores que quieren ganar un mayor porcentaje por
              sus productos y para compradores que encuentran una amplia
              variedad a precios increíbles.
            </span>
            <br />
            <br />

            <span className="text-primary-darker text-base font-medium">
              Nuestros valores desde los inicios, son el esfuerzo diario,
              trabajo en equipo y brindar a nuestros clientes la mejor atención
              y servicio. Continuaremos creciendo a la par de ustedes que siguen
              depositando todos los días su confianza en nosotros.
            </span>
            <br />
            <br />

            <span className="text-primary-darker text-base font-bold">
              El PLAC es el mejor lugar para la compra y venta de ropa,
              juguetes, libros, y accesorios usados de bebés, niños y adultos a
              precios accesibles y en óptimas condiciones.
            </span>
          </div>
        </div>
      </div>

      <div className="relative">
        <Image
          alt="logo"
          src={Cloud2}
          width={460}
          height={460}
          className="absolute -mt-80 -ml-16"
        />
      </div>
    </div>
  );
}

export default AboutUs;
