"use client"
import React, { useState } from "react"
import { FaChevronDown } from "react-icons/fa";


function Procedure() {

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
          <h2 className="text-lg font-bold text-primary-darker">Procedimiento</h2>
          
          <div className="mt-2">
            <div className={`p-2 shadow-md w-full transition-shadow duration-300 ${openSections['envio_de_productos'] ? 'shadow-lg' : 'shadow-md'}`}>
              <h3
                className="text-l text-primary-darker font-semibold cursor-pointer flex justify-start items-center"
                onClick={() => toggleSection('envio_de_productos')}
              >
                <div className="w-5 h-5 pt-1 text-primary-dark"><FaChevronDown /></div>
                ENVIO DE PRODUCTOS 
              </h3>
              {openSections['envio_de_productos'] && (
                <div className="pl-8 text-sm text-primary-darker mt-2">
                <ul className="list-disc list-inside">
                    <li>CABA. Sacar turno en el link que te llega al llenar el alta. Nuestro Showroom queda en Paraná 608, 4to #10 (zona Tribunales)
                    Solicitamos por favor traer sus productos en bolsas con nombre completo. Si es más de una bolsa aclarar cantidad en cada una de ellas (ej: Nombre, 1 de 3)</li>
                    <li>Provincia de BS AS e interior del país. Se puede enviar por Correo Argentino (responder al mail de confirmación de alta de vendedor, y te pasamos los datos de envío)</li>                  
                </ul>
                </div>
              )}
            </div>

            <div className={`p-2 shadow-md w-full transition-shadow duration-300 mt-4 ${openSections['productos_que_no_aceptamos'] ? 'shadow-lg' : 'shadow-md'}`}>
              <h3
                className="text-l text-primary-darker font-semibold cursor-pointer flex justify-start items-center"
                onClick={() => toggleSection('productos_que_no_aceptamos')}
              >
                <div className="w-5 h-5 pt-1 text-primary-dark"><FaChevronDown /></div>
                PRODUCTOS QUE NO ACEPTAMOS
              </h3>
              {openSections['productos_que_no_aceptamos'] && (
                <div className="pl-8 text-sm text-primary-darker mt-2">
                <p>Los productos que no se aceptados por El PLAC se pueden:</p>
                  <ul className="list-disc list-inside">
                    <li>Pasar a retirar por nuestro Showroom dentro de un plazo de 30 días. Cumplido dicho plazo, los productos serán donados a nuestra Canasta Solidaria, sin posibilidad de reclamo alguno</li>
                    <li>Donarlos a nuestra Canasta Solidaria</li>  
                  </ul>
                </div>
              )}
            </div>

            <div className={`p-2 shadow-md w-full transition-shadow duration-300 mt-4 ${openSections['productos_+12_meses'] ? 'shadow-lg' : 'shadow-md'}`}>
              <h3
                className="text-l text-primary-darker font-semibold cursor-pointer flex justify-start items-center"
                onClick={() => toggleSection('productos_+12_meses')}
              >
                <div className="w-5 h-5 pt-1 text-primary-dark"><FaChevronDown /></div>
                PRODUCTOS +12 MESES SIN VENDER
              </h3>
              {openSections['productos_+12_meses'] && (
                <div className="pl-8 text-sm text-primary-darker mt-2">
                  <p>El Placard quedaría habilitado, sin previo aviso, a bajar los precios gradualmente hasta conseguir su venta</p>
                  <p>Transcurrido el plazo máximo de consignación (12 meses), El PLAC ofrece al consignante las siguientes opciones:</p>
                  <ul className="list-disc list-inside">
                    <li>Devolución</li>
                    <li>Donación</li>   
                  </ul>
                </div>
              )}
            </div>

            <div className={`p-2 shadow-md w-full transition-shadow duration-300 mt-4 ${openSections['autorizacion'] ? 'shadow-lg' : 'shadow-md'}`}>
              <h3
                className="text-l text-primary-darker font-semibold cursor-pointer flex justify-start items-center"
                onClick={() => toggleSection('autorizacion')}
              >
                <div className="w-5 h-5 pt-1 text-primary-dark"><FaChevronDown /></div>
                AUTORIZACIÓN
              </h3>
              {openSections['autorizacion'] && (
                <div className="pl-8 text-sm text-primary-darker mt-2">
                <p>Al entregar los productos a El PLAC para su revisión/evaluación el vendedor acepta y brinda su consentimiento para que El PLAC publique los precios que crea conveniente y autoriza a El PLAC que cargue todas las fotos de los artículos recibidos en su tienda online: {" "}
                    <a
                    href="https://elplacarddemibebot.mitiendanube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-darker underline"
                    >
                    El Placard de Mi Bebot
                    </a> y otras plataformas online
                </p>       
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Procedure