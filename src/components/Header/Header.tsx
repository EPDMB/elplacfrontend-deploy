import React from "react";
import Navbar from "../Navbar";
import Image from "next/image";
import headerImage from "@/assets/headerImage.png";
import "./Header.css";

function Header() {
  return (
    <div className="md:h-auto w-full h-1/4 flex-col">
      <div className="flex w-full sm:h-1/2 items-center h-[10vh] sm:items-start">
        <div className="w-full h-auto">
          <div className="hidden sm:flex">
            <Image
              alt="Foto oso y zapatillas"
              src={headerImage}
              width={800}
              height={800}
            ></Image>
          </div>
        </div>

        <div className="w-full h-32 flex items-center">
          <Navbar />
        </div>
      </div>
      <div className=" flex flex-col items-end w-full h-1/4 sm:h-1/2 md:h-auto pr-5 md:pr-16 pb-2 md:pb-5 ">
        <h1 className="innerShadowTitle flex justify-end items-end w-full md:w-[30vh] text-secondary-darker text-2xl sm:text-4xl md:text-[6vh] lg:text-[9vh]  font-bold text-wrap md:text-nowrap text-end md:pb-1 lg:pb-6 xl:pb-10 ">
          ELPLAC
        </h1>
        <h3 className="innerShadowSubTitle flex justify-end items-end w-full md:w-[30vh] text-secondary-darker text-md sm:text-xl md:text-[3vh] lg:text-[4vh]  font-bold text-wrap md:text-nowrap text-end lg:pb-3 xl:pb-3 ">
          Comprá. Vendé. Reciclá. Renová
        </h3>
        <h3 className="innerShadowDescription flex justify-end items-end w-full md:w-[18vh] text-secondary-darker text-sm sm:text-lg md:text-[3vh] lg:text-[3vh]  font-bold text-wrap md:text-nowrap text-end xl:pb-6 ">
          Showroom y envíos a todo el país
        </h3>
      </div>
    </div>
  );
}

export default Header;
