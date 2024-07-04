import React from "react";
import Image from "next/image";
import facebook from "@/assets/facebook.svg";
import instagram from "@/assets/instagram.svg";
import pinterest from "@/assets/pinterest.svg";
import datafiscal from "@/assets/datafiscal.png";
import Link from "next/link";
import logo from "@/assets/logo.svg";

const Footer: React.FC = () => {
  return (
    <div className="bg-primary-lighter pt-5 pb-5 lg:px-5">
      <div className="flex flex-row justify-around items-end w-full px-4 py-2 sm:px-5">
        <div className="flex flex-col items-start mb-1 lg:mb-0 lg:w-1/3 gap-2">
          <Link href="/">
            <Image
              className="my-2"
              src={logo}
              alt="logo"
              width={145}
              height={40}
            />
          </Link>
          <Link
            href="/about_us"
            className="text-sm sm:text-base lg:text-lg font-medium hover:text-secondary-dark">
            Nosotros
          </Link>
          <Link
            href="/faq"
            className="text-sm sm:text-base lg:text-lg font-medium hover:text-secondary-dark">
            Ayuda{" "}
          </Link>

          <Link
            href="/#Reviews"
            className="text-sm sm:text-base lg:text-lg font-medium hover:text-secondary-dark">
            Reseñas
          </Link>
        </div>

        <div className="flex flex-row items-end justify-center gap-1 sm:gap-3 lg:gap-4 sm:w-1/3 h-32">
          <Link href="https://www.facebook.com/elplacarddemibebot">
            <Image
              src={facebook}
              alt="Facebook"
              width={30}
              height={30}
              className="w-8 sm:w-9 lg:w-11"
            />
          </Link>
          <Link href="https://www.instagram.com/el_placard_de_mi_bebot">
            <Image
              src={instagram}
              alt="Instagram"
              width={40}
              height={40}
              className="w-8 sm:w-9 lg:w-11"
            />
          </Link>
          <Link href="https://ar.pinterest.com/elplacarddemibebot/_created/">
            <Image
              src={pinterest}
              alt="Pinterest"
              width={40}
              height={40}
              className="w-8 sm:w-9 lg:w-11"
            />
          </Link>
        </div>

        <div className="flex flex-col items-end lg:w-1/3 gap-2">
          <Link
            href="/terms&conditions"
            className="text-sm sm:text-base lg:text-lg font-medium hover:text-secondary-dark text-end">
            Términos y Condiciones
          </Link>
          <div className="flex flex-col items-end">
            <p className="text-sm sm:text-base lg:text-lg font-medium text-end">
              Seguridad y Certificaciones
            </p>
            <Image
              src={datafiscal}
              alt="datafiscal"
              width={60}
              height={60}
              className="w-12 sm:w-14 lg:w-16"
            />
          </div>
        </div>
      </div>

      <div className="text-sm sm:text-base font-medium flex items-center justify-center w-full text-center mt-4 sm:mt-0 h-4 sm:h-4">
        <h3>Copyright © 2024 ELPLAC. Todos los derechos reservados.</h3>
      </div>
    </div>
  );
};

export default Footer;
