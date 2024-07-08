"use client";
import React, { useState } from "react";
import Navbar from "./Navbar";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-2">
      <button
        onClick={toggleDropdown}
        className="w-full flex justify-between items-center p-4 bg-secondary-lighter rounded-md text-left focus:outline-none focus:ring-2 focus:from-primary-darker border border-secondary-light">
        <span className="font-medium text-lg text-primary-darker">
          {question}
        </span>
        <span className="ml-4 font-bold  text-primary-dark">
          {isOpen ? "-" : "+"}
        </span>
      </button>
      {isOpen && (
        <div className="mt-2 p-4 bg-secondary-lighter rounded-md ">
          <p className="font-medium text-primary-dark whitespace-pre-line">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
};

const FAQ: React.FC = () => {
  const faqs: FAQItemProps[] = [
    {
      question: "¿Cuáles son los requisitos para participar en la feria?",
      answer: `- Registrarse como vendedor
              - Mínimo 30 artículos
              - Pagar la inscripción
              - Entregar (o enviar) productos al Showroom durante la semana designada por EL PLAC
              - Y lo más importante: NO tenés que estar presente en la feria`,
    },
    {
      question: "¿Qué productos se venden en la feria?",
      answer: `- Ropa de recién nacido (hasta talle 12 meses), y calzado únicamente de temporada de la feria, de primera marca y en excelente estado. Debe estar limpio, planchado y sin agujeros, manchas, pelos, decoloración, partes faltantes, ni roturas
              - Ropa de embarazo de temporada
              - Accesorios de bebé (portabebé, sacaleche, mochila maternal, gimnasio, piso de goma eva, etc.). Es una lista larga
              IMPORTANTE artículos grandes: se aceptan pero NO los trasladamos en el Showroom y el lugar de la feria (cochecitos, huevitos, practicunas, cunas colecho, mecedoras, sillitas de comer, etc.)`,
    },
    {
      question: "¿Qué productos no se pueden vender en la feria?",
      answer: `- Ropa y artículos de primavera/verano
      - Segundas marcas (ejemplos: Advanced, Gamise, Blue, Naranjo, Zuppa, Le Utthe, Creciendo, Tex, Urb, Luz de Estrellita, etc.)
      - Gorritos bebé de algodón simples (ej. los del ajuar que tienen forma de semicírculo o nudo)
      - Sábanas, chichoneras, ropa de cama
      - Chupetes, mordillos, etc. usados
      - Ropa interior usada
      - Pañales
      - Productos de tocador
      - Medicación y objetos medicinales
      - Productos singulares (por ejemplo: un accesorio para un cochecito específico que no es universal)
      - CDs/DVDs
      - Inflables`,
    },
    {
      question: "¿Cuáles son mis ganancias?",
      answer: "La vendedora pone los precios y gana el 70%",
    },
    {
      question: "¿Qué sucede con los artículos que no se venden?",
      answer: `Para los artículos que no se vendan, tendrás la posibilidad de:
      1) Dejarlos de manera permanente en el Showroom de EL PLAC, en cuenta crédito (50%), Consignación (40%) o Pago Adelantado (20%).
      2) Retirarlos a la semana siguiente después de finalizada la feria.
      3) Donarlos a nuestra Canasta Solidaria`,
    },
    {
      question: "¿Cómo es la modalidad de pago?",
      answer: `La feria dura hasta fin de su mes en curso, con la venta online y liquidación. Luego, las vendedoras reciben un mail “post-feria” con los pasos a seguir. Se podrá elegir cobrar en efectivo o MercadoPago o transferencia.`,
    },
  ];

  return (
    <div className="">
      <div className="w-full h-32 flex items-center ">
        <Navbar />
      </div>

      <div className="bg-secondary-lighter">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-4">
              <h2 className=" text-primary-darker text-5xl font-bold">
                Preguntas Frecuentes
              </h2>
              <p className="text-lg text-primary-dark mt-5">
                Todo lo que necesitas saber para participar en la feria
              </p>
            </div>
            <div className="w-full md:w-1/2 p-4">
              <div className="flex flex-col space-y-4">
                {faqs.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
