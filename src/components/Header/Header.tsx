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
              height={800}></Image>
          </div>
        </div>

        <div className="w-full h-32 flex items-center">
          <Navbar />
        </div>
      </div>
      <div className=" flex flex-col items-end w-full  md:h-auto pr-5 md:pr-16 pb-2 md:pb-5 ">
        <h3 className="innerShadowSubTitle text-xl sm:text-2xl md:text-3xl lg:text-7xl flex justify-end items-end w-full  text-secondary-darker  font-bold text-wrap md:text-nowrap text-end lg:mb-3  ">
          FERIAS ELPLAC
        </h3>
        <h3 className="innerShadowDescription text-lg md:text-xl lg:text-3xl flex justify-end items-end w-full  text-secondary-darker font-semibold text-wrap md:text-nowrap text-end xl:pb-6 ">
          by El Placard de Mi Bebot
        </h3>
        <span className=" text-md md:text-lg lg:text-xl flex justify-end items-end w-full  text-primary-darker font-semibold text-wrap md:text-nowrap text-end xl:pb-6">
          #aferiate
        </span>
      </div>
    </div>
  );
}

export default Header;
