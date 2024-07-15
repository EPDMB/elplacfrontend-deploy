"use client"
import React, { useState } from "react"
import { FaChevronDown } from "react-icons/fa";


function Calendar() {

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
          <h2 className="text-lg font-bold text-primary-darker">Calendario</h2>
          
          <div className="mt-2">
            <div className={`p-2 shadow-md w-full transition-shadow duration-300 ${openSections['fecha_de_recepcion_de_productos'] ? 'shadow-lg' : 'shadow-md'}`}>
              <h3
                className="text-l text-primary-darker font-semibold cursor-pointer flex justify-start items-center"
                onClick={() => toggleSection('fecha_de_recepcion_de_productos')}
              >
                <div className="w-5 h-5 pt-1 text-primary-dark"><FaChevronDown /></div>
                FECHA DE RECEPCION DE PRODUCTOS 
              </h3>
              {openSections['fecha_de_recepcion_de_productos'] && (
                <div className="pl-8 text-sm text-primary-darker mt-2">
                  <ul className="list-disc list-inside">
                    <div><span className="font-bold">Febrero</span><span className="inline"> Recibimos para modalidades Crédito, Consignación, y Pago Adelantado</span></div>                  
                    <div><span className="font-bold">Marzo</span><span className="inline"> Recibimos para modalidades Crédito, Consignación, y Pago Adelantado hasta mediados del mes + Inscripción y recepción para FERIA otoño/invierno</span></div>
                    <div><span className="font-bold">Mayo</span><span className="inline"> Recibimos para modalidades Crédito, Consignación, y Pago Adelantado</span></div>
                    <div><span className="font-bold">Junio</span><span className="inline"> Recibimos para modalidades Crédito, Consignación, y Pago Adelantado</span></div>
                    <div><span className="font-bold">Julio</span><span className="inline"> Recibimos para modalidades Crédito, Consignación, y Pago Adelantado hasta mediados del mes + Inscripción FERIA de Juguetes & Libros</span></div>
                    <div><span className="font-bold">Agosto</span><span className="inline"> Recibimos para modalidades Crédito, Consignación, y Pago Adelantado + FERIA de Juguetes & Libros</span></div>
                    <div><span className="font-bold">Septiembre</span><span className="inline"> Recibimos para modalidades Crédito, Consignación, y Pago Adelantado hasta mediados del mes + Inscripción y recepción para FERIA Primavera/Verano</span></div>
                    <div><span className="font-bold">Noviembre</span><span className="inline"> Recibimos para modalidades Crédito, Consignación, y Pago Adelantado + Inscripción y recepción FERIA de Juguetes & Libros</span></div>
                    <div><span className="font-bold">Enero, Abril, Octubre y Diciembre</span><span className="inline"> Estamos de FERIA. No recibimos</span></div>
                  </ul>
                </div>
              )}
            </div>

            <div className={`p-2 shadow-md w-full transition-shadow duration-300 mt-4 ${openSections['articulos_de_temporada'] ? 'shadow-lg' : 'shadow-md'}`}>
              <h3
                className="text-l text-primary-darker font-semibold cursor-pointer flex justify-start items-center"
                onClick={() => toggleSection('articulos_de_temporada')}
              >
                <div className="w-5 h-5 pt-1 text-primary-dark"><FaChevronDown /></div>
                ARTICULOS DE TEMPORADA
              </h3>
              {openSections['articulos_de_temporada'] && (
                <div className="pl-8 text-sm text-primary-darker mt-2">
                  <ul className="list-disc list-inside">
                    <div><span className="font-bold">Febrero, Marzo, Mayo, Junio</span><span className="inline"> Sólo artículos otoño/invierno</span></div>                  
                    <div><span className="font-bold">Julio, Agosto, Septiembre, Noviembre</span><span className="inline"> Sólo primavera/verano</span></div>
                    <div><span className="font-bold">Durante todo el año</span><span className="inline"> Recibimos bodies/pijamas manga larga de algodón, pantalones de algodón, y jeans, sin importar el talle</span></div>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar