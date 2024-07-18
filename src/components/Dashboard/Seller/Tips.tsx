import { StepProps } from "@/types";
import React from "react";
import { FaChevronRight } from "react-icons/fa";

const Tips: React.FC<StepProps> = ({ setVisibleStep }) => {
  return (
    <div className="bg-secondary-lighter rounded-md max-h-full min-h-[50vh] max-w-full min-w-[50%] shadow-lg font-semibold text-primary-dark p-10 overflow-auto">
      <ul className="space-y-2">
        <li>
          <span>1. </span>Revisar tus ítems con luz del día (no directa), para
          poder descartar o lavar prendas manchadas o con detalles
        </li>
        <li>
          <span>2. </span>Abrochar botones y/o broches de bodies
        </li>
        <li>
          <span>3. </span>Atar cordones del calzado
        </li>
        <li>
          <span>4. </span>Lavar el calzado, especialmente las suelas
        </li>
        <li>
          <span>5. </span>Planchar la ropa
        </li>
        <li>
          <span>6. </span>Prestar atención en los precios sugeridos en la
          información enviada
        </li>
        <li>
          <span>7. </span>Más accesible el precio, mejor posibilidad de venta
        </li>
        <li>
          <span>8. </span>Llenar la descripción de la planilla de productos con
          el mejor detalle posible
        </li>
        <li>
          <span>9. </span>Usar cinta de papel (pintor/enmascarar) de buena
          calidad, para evitar que se salga
        </li>
        <li>
          <span>10. </span>Pegar la cinta sobre el lado derecho de la prenda, en
          forma vertical, leyendo abajo hasta arriba
        </li>
        <li>
          <span>11. </span>Cuidado con el marcador, no pegues la cinta hasta que
          se seque la tinta
        </li>
        <li>
          <span>12. </span>Fijar una nota explicando qué es el producto si no
          está claro al solo mirarlo
        </li>
        <li>
          <span>13. </span>Recordar que la cinta sólo lleva: 1) CÓDIGO, 2) TALLE
          y 3) PRECIO DE VENTA (en este orden)
        </li>
        <li>
          <span>14. </span>Mínimo 30 productos. No hay máximo, aunque todo debe
          pertenecer a la misma vendedora
        </li>
      </ul>
      <div className="w-full flex items-end justify-end">
        <button
          onClick={() => setVisibleStep("DATOS")}
          className=" flex justify-center items-center w-10 h-10 p-2 rounded-full border border-primary-dark text-primary-dark">
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Tips;
