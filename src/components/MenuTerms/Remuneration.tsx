"use client"
import React, { useState } from "react"
import { FaChevronDown } from "react-icons/fa";


function Remuneration() {

  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (section: any) => {
    setOpenSections(prevSections => ({
      ...prevSections,
      [section]: ! prevSections [section]
    }));
  };

  return (
    <div className="flex h-screen  bg-secondary-lighter">
      <div className="w-full p-6 overflow-y-auto">
        <div>
          <h2 className="text-lg font-bold text-primary-darker">Retribuciones</h2>
          
          <div className="mt-2">
            <div className={`p-2 shadow-md w-full transition-shadow duration-300 ${openSections['fecha_de_cobro'] ? 'shadow-lg' : 'shadow-md'}`}>
              <h3
                className="text-l text-primary-darker font-semibold cursor-pointer flex justify-start items-center"
                onClick={() => toggleSection('fecha_de_cobro')}
              >
                <div className="w-5 h-5 pt-1 text-primary-dark"><FaChevronDown /></div>
                FECHA DE COBRO 
              </h3>
              {openSections['fecha_de_cobro'] && (
                <div className="pl-8 text-sm text-primary-darker mt-2">
                <p>Se pagan en forma mensual (ej: si un producto se vende en Marzo, la retribución se paga en Abril)</p>
                <p>Las ventas se publican en Mis Productos/Resumen, del sitio donde la vendedora tiene la cuenta registrada, el día 15 de cada mes. Si ese día no es hábil, se pasa para el día hábil siguiente.</p>
                </div>
              )}
            </div>

            <div className={`p-2 shadow-md w-full transition-shadow duration-300 mt-4 ${openSections['forma_de_cobro'] ? 'shadow-lg' : 'shadow-md'}`}>
              <h3
                className="text-l text-primary-darker font-semibold cursor-pointer flex justify-start items-center"
                onClick={() => toggleSection('forma_de_cobro')}
              >
                <div className="w-5 h-5 pt-1 text-primary-dark"><FaChevronDown /></div>
                FORMA DE COBRO
              </h3>
              {openSections['forma_de_cobro'] && (
                <div className="pl-8 text-sm text-primary-darker mt-2">
                <p>Medios de pago:</p>
                  <ul className="list-disc list-inside">
                    <li>Mercado Pago</li>
                    <li>Transferencia bancaria (a través de Mercado Pago)</li>
                    <li>fectivo en el Showroom (previo aviso 48hs.)</li>
                  </ul>
                </div>
              )}
            </div>

            <div className={`p-2 shadow-md w-full transition-shadow duration-300 mt-4 ${openSections['plazos'] ? 'shadow-lg' : 'shadow-md'}`}>
              <h3
                className="text-l text-primary-darker font-semibold cursor-pointer flex justify-start items-center"
                onClick={() => toggleSection('plazos')}
              >
                <div className="w-5 h-5 pt-1 text-primary-dark"><FaChevronDown /></div>
                PLAZOS
              </h3>
              {openSections['plazos'] && (
                <div className="pl-8 text-sm text-primary-darker mt-2">
                  <p>Las retribuciones tienen un plazo máximo de cobro: si un vendedor/consignatario no requiere el cobro de sus retribuciones dentro del plazo de dos (2) años, dicha obligación de pago caduca. Vencido ese período, cualquier acción para la exigencia del pago deja de tener efecto, sin opción para el consignatario de reclamarlas.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Remuneration