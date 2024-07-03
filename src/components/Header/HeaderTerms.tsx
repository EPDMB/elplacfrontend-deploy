import React from "react";
import Navbar from "../Navbar";
import Image from "next/image";
import termsClouds from "@/assets/termsClouds.svg";

function HeaderTerms() {
  return (
    <div className="h-auto w-full bg-secondary-lighter">
      <div className="flex w-full h-[50vh]">
        <div className="w-full h-auto mt-10">
          <Image
            src={termsClouds}
            alt="Imagen encabezado con globo y nubes"
            width={600}
            height={600}></Image>
        </div>

        <div className="w-full h-32 flex items-center">
          <Navbar />
        </div>
      </div>

      <div className=" flex flex-col items-end w-full h-auto pr-5 pb-5">
        <h1 className="innerShadowTitleTerms flex justify-end items-end w-full md:w-[30vh] text-secondary-darker text-2xl sm:text-4xl md:text-[6vh] lg:text-[9vh]  font-bold text-wrap md:text-nowrap text-end md:pb-1 lg:pb-6 xl:pb-10 ">
          Términos y Condiciones
        </h1>
        <h3 className="innerShadowSubTitleTerms flex justify-end items-end w-full md:w-[30vh] text-secondary-darker text-md sm:text-xl md:text-[3vh] lg:text-[4vh]  font-bold text-wrap md:text-nowrap text-end lg:pb-3 xl:pb-6 ">
          Leé el contenido, completa el formulario, y sacá turno
        </h3>
        <h3 className="innerShadowDescriptionTerms flex justify-end items-end w-full md:w-[18vh] text-secondary-darker text-sm sm:text-lg md:text-[3vh] lg:text-[3vh]  font-bold text-wrap md:text-nowrap text-end xl:pb-6 ">
          Sumate a nuestra comunidad!
        </h3>
      </div>
    </div>
  );
}

export default HeaderTerms;
