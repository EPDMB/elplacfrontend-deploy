"use client"
import React, { useState } from "react"
import { FaChevronDown } from "react-icons/fa";


function Claim() {

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
          <h2 className="text-lg font-bold text-primary-darker">Reclamos y faltantes</h2>
          
          <div className="mt-2">
            <div className={`p-2 shadow-md w-full transition-shadow duration-300 ${openSections['reclamos'] ? 'shadow-lg' : 'shadow-md'}`}>
              <h3
                className="text-l text-primary-darker font-semibold cursor-pointer flex justify-start items-center"
                onClick={() => toggleSection('reclamos')}
              >
                <div className="w-5 h-5 pt-1 text-primary-dark"><FaChevronDown /></div>
                RECLAMOS</h3>
              {openSections['reclamos'] && (
                <div className="pl-8 text-sm text-primary-darker mt-2">
                <p>El PLAC no se responsabiliza por los siguientes reclamos:</p>
                <ul className="list-disc list-inside">
                    <li>Daños en productos producidos por fuerza mayor</li>
                    <li>Productos rechazados para la venta que no se hayan retirado dentro de los 30 días de plazo</li>
                    <li>Extravío de productos</li>
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

export default Claim