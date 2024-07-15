"use client"
import React, { useState } from "react"
import { FaChevronDown } from "react-icons/fa";


function Methodology() {

  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (section: any) => {
    setOpenSections(prevSections => ({
      ...prevSections,
      [section]: ! prevSections [section]
    }));
  };

  return (
    <div className="flex h-screen  bg-secondary-lighter">
      <div className="w-2/3 p-6 overflow-y-auto">
        <div>
          <h2 className="text-lg font-bold text-primary-darker">Ventas</h2>
          
          <div className="mt-2">
            <div className={`p-2 shadow-md w-full transition-shadow duration-300 ${openSections['ferias'] ? 'shadow-lg' : 'shadow-md'}`}>
              <h3
                className="text-l text-primary-darker font-semibold cursor-pointer flex justify-start items-center"
                onClick={() => toggleSection('ferias')}
              >
                <div className="w-5 h-5 pt-1 text-primary-dark"><FaChevronDown /></div>
                FERIAS
              </h3>
              {openSections['ferias'] && (
                <div className="pl-8 text-sm text-primary-darker mt-2">
                  <p>La vendedora:</p>
                  <ul className="list-disc list-inside">
                    <li>Decide sus precios y gana el 70%</li>
                    <li>Debe abonar costo de inscripción</li>
                    <li>Debe llenar una planilla con la descripción y precio de cada artículo, etiquetar sus artículos, y entregarlos en el showroom</li>
                    <li>No tiene que estar presencialmente en la feria</li>
                    <li>Publicamos información en detalle a través de las redes antes de cada feria</li>
                  </ul>
                  <p className="mt-2">Calendario de Ferias:</p>
                  <ul className="list-disc list-inside">
                    <li>Abril: Feria de Otoño/Invierno (mínimo 30 art.)</li>
                    <li>Agosto: Feria de Juguetes & Libros</li>
                    <li>Octubre: Feria de Primavera/Verano (mínimo 30 art.)</li>
                    <li>Diciembre: Feria de Juguetes & Libros</li>
                  </ul>
                </div>
              )}
            </div>

            <div className={`p-2 shadow-md w-full transition-shadow duration-300 mt-4 ${openSections['credito'] ? 'shadow-lg' : 'shadow-md'}`}>
              <h3
                className="text-l text-primary-darker font-semibold cursor-pointer flex justify-start items-center"
                onClick={() => toggleSection('credito')}
              >
                <div className="w-5 h-5 pt-1 text-primary-dark"><FaChevronDown /></div>
                CREDITO
              </h3>
              {openSections['credito'] && (
                <div className="pl-8 text-sm text-primary-darker mt-2">
                  <p>Retribución:</p>
                  <ul className="list-disc list-inside">
                    <li>50% para artículos &lt; $30.000</li>
                    <li>60% para artículos entre $30.000 - $49.000</li>
                    <li>70% para artículos &gt; $50.000</li>
                  </ul>
                  <p className="mt-2">
                    La retribución sólo se puede utilizar como crédito para adquirir artículos del Placard tanto en la tienda online como en el showroom (con excepción de los artículos que se encuentran en la Canasta Solidaria). El saldo está disponible para utilizar a partir del día 15 de cada mes, posterior al mes de la venta.
                  </p>
                  <p>Mínimo 20 artículos aceptados</p>
                </div>
              )}
            </div>

            <div className={`p-2 shadow-md w-full transition-shadow duration-300 mt-4 ${openSections['consignacion'] ? 'shadow-lg' : 'shadow-md'}`}>
              <h3
                className="text-l text-primary-darker font-semibold cursor-pointer flex justify-start items-center"
                onClick={() => toggleSection('consignacion')}
              >
                <div className="w-5 h-5 pt-1 text-primary-dark"><FaChevronDown /></div>
                CONSIGNACION
              </h3>
              {openSections['consignacion'] && (
                <div className="pl-8 text-sm text-primary-darker mt-2">
                  <p>Retribución:</p>
                  <ul className="list-disc list-inside">
                    <li>40% para artículos &lt; $30.000</li>
                    <li>60% para artículos entre $30.000 - $49.999</li>
                    <li>70% para artículos &gt; $50.000</li>
                  </ul>
                  <p className="mt-2">
                  Plazo mínimo de consignación: 3 meses.</p>
                  <p>Se cobra a partir del día 15 de cada mes, posterior al mes de la venta.</p>
                  <p>Mínimo 20 artículos aceptados</p>
                </div>
              )}
            </div>

            <div className={`p-2 shadow-md w-full transition-shadow duration-300 mt-4 ${openSections['pago_adelantado'] ? 'shadow-lg' : 'shadow-md'}`}>
              <h3
                className="text-l text-primary-darker font-semibold cursor-pointer flex justify-start items-center"
                onClick={() => toggleSection('pago_adelantado')}
              >
                <div className="w-5 h-5 pt-1 text-primary-dark"><FaChevronDown /></div>
                PAGO ADELANTADO
              </h3>
              {openSections['pago_adelantado'] && (
                <div className="pl-8 text-sm text-primary-darker mt-2">
                  <p>Retribución:</p>
                  <ul className="list-disc list-inside">
                    <li>20% para artículos &lt; $30.000</li>
                    <li>30% para artículos entre $30.001 - $49.999</li>
                    <li>35% para artículos &gt; $50.000</li>
                  </ul>
                  <p>No hay mínimo</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Methodology