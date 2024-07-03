import React from "react";
import Image from "next/image";
import CanastaSolidaria from "@/assets/CanastaSolidaria.svg";
import Link from "next/link";

export const Solidarity = () => {
  return (
    <div className="bg-secondary-lighter w-full">
      <div className="flex flex-col lg:flex-row max-w-[90%] mx-auto justify-center items-center  p-6 md:p-24 z-20">
        <div className="w-full  md:w-1/2 mb-8 md:mb-0 flex justify-center items-center">
          <div className="mx-auto ">
            <Image
              src={CanastaSolidaria}
              alt="Canasta Solidaria"
              width={300}
              height={300}
              className="block mx-auto md:mb-4"
            />
          </div>
        </div>

        <div className="w-full md:w-2/3 max-w-xl text-center md:text-left">
          <span className="text-primary-dark text-lg md:text-base font-bold block md:ml-5">
            #CanastaSolidaria
          </span>
          <span className="text-primary-dark text-sm sm:text-base font-light block mt-2 md:ml-5">
            Nace en 2019 gracias a la colaboración de nuestras vendedoras,
            quienes eligen dejar productos que no califican para la venta.
            <br />
            <br />
            Estos se exponen en la #CanastaSolidaria en nuestro showroom a $400
            cada producto. Lo recaudado en el año es destinado a una entidad
            benéfica.
            <br />
            <br />
            Conocé más en nuestro canal de Youtube{" "}
            <Link
              href="https://www.youtube.com/channel/UC3adfTBRSOEhaaFbRRCEcSA"
              legacyBehavior>
              <a
                className="text-primary-dark text-sm font-bold"
                target="_blank">
                El Placard de mi Bebot
              </a>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};
