"use client"
import React, { useState } from "react"
import { FaChevronDown } from "react-icons/fa";


function Price() {

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
          <h2 className="text-lg font-bold text-primary-darker">Precios</h2>
          
          <div className="mt-2">
            <div className={`p-2 shadow-md w-full transition-shadow duration-300 ${openSections['planilla_de_precios'] ? 'shadow-lg' : 'shadow-md'}`}>
              <h3
                className="text-l text-primary-darker font-semibold cursor-pointer flex justify-start items-center"
                onClick={() => toggleSection('planilla_de_precios')}
              >
                <div className="w-5 h-5 pt-1 text-primary-dark"><FaChevronDown /></div>
                PLANILLA DE PRECIOS 
              </h3>
              {openSections['planilla_de_precios'] && (
                <div className="pl-8 text-sm text-primary-darker mt-2">
                <p>Esta planilla de precios es un referencial, osea una estimación de lo que puede valer tu artículo. No es un valor determinado, ya que debemos tener ciertas variables en consideración: </p>
                <ul className="list-disc list-inside">
                    <li>El precio de venta depende de 1) Estado 2) Talle 3) Marca 4) Diseño) </li>
                    <li>El precio máximo de algunas categorías puede variar mucho según marca, modelo, y talle</li>                  
                    <li>Cambia su valor una prenda nueva con o sin etiqueta</li>                  
                    <li>Para artículos aceptados en nuestra categoría "Play", el precio mínimo puede variar</li>                  
                    <li>Para precios de juguetes/accesorios, se puede ver el álbum en nuestra tienda online como referencia</li>
                </ul>
                <br></br>
                <p>Recomendamos, para un mejor entendimiento de los precios que asignamos, ingresar a nuestra tienda online y comparar los precios publicados vigentes con productos similares o iguales a lo que quieras vender.</p>
                <br></br>
                <p>Haz click para ver nuestra:{" "}
                    <a
                    href="https://docs.google.com/spreadsheets/d/1SLk1r-wNnT2K9xY_suYjSeBW0lRsYcqpBmi8mPfUOG8/edit?gid=1965582531#gid=1965582531"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-darker underline"
                    >
                    PLANILLA DE PRECIOS DE VENTA REFERENCIALES
                    </a>
                </p>
                </div>
              )}
            </div>

            <div className={`p-2 shadow-md w-full transition-shadow duration-300 mt-4 ${openSections['ejemplo_de_venta'] ? 'shadow-lg' : 'shadow-md'}`}>
              <h3
                className="text-l text-primary-darker font-semibold cursor-pointer flex justify-start items-center"
                onClick={() => toggleSection('ejemplo_de_venta')}
              >
                <div className="w-5 h-5 pt-1 text-primary-dark"><FaChevronDown /></div>
                EJEMPLO DE VENTA
              </h3>
              {openSections['ejemplo_de_venta'] && (
                <div className="pl-8 text-sm text-primary-darker mt-2">
                <p>Si se vende un producto de $4.000, obtendrás la siguiente retribución según la metodología de venta:</p>
                  <ul className="list-disc list-inside">
                    <li><span className="font-bold">Feria</span><span className="inline"> (70%): $2.800</span></li>                  
                    <li><span className="font-bold">Crédito</span><span className="inline"> (50%): $2.000</span></li>
                    <li><span className="font-bold">Consignación</span><span className="inline"> (40%): $1.600</span></li>
                    <li><span className="font-bold">Pago adelantado</span><span className="inline"> (20%): $800</span></li>
                  </ul>
                </div>
              )}
            </div>

            <div className={`p-2 shadow-md w-full transition-shadow duration-300 mt-4 ${openSections['liquidacion'] ? 'shadow-lg' : 'shadow-md'}`}>
              <h3
                className="text-l text-primary-darker font-semibold cursor-pointer flex justify-start items-center"
                onClick={() => toggleSection('liquidacion')}
              >
                <div className="w-5 h-5 pt-1 text-primary-dark"><FaChevronDown /></div>
                LIQUIDACION
              </h3>
              {openSections['liquidacion'] && (
                <div className="pl-8 text-sm text-primary-darker mt-2">
                  <p>Los artículos pueden ingresar en Liquidación después de 3 meses o durante su temporada de Liquidación, lo que ocurra primero. 
                    (Ejemplo: Si el vendedor trae una campera de invierno en junio, puede entrar en Liquidación durante los meses de julio/agosto.)</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Price