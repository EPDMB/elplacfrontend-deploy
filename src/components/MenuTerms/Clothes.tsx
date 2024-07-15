/* eslint-disable react/no-unescaped-entities */
"use client"
import React, { useState } from "react"
import { FaChevronDown } from "react-icons/fa";


function Clothes() {

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
          <h2 className="text-lg font-bold text-primary-darker">Selección</h2>
          
          <div className="mt-2">
            <div className={`p-2 shadow-md w-full transition-shadow duration-300 ${openSections['productos_aceptados'] ? 'shadow-lg' : 'shadow-md'}`}>
              <h3
                className="text-l text-primary-darker font-semibold cursor-pointer flex justify-start items-center"
                onClick={() => toggleSection('productos_aceptados')}
              >
                <div className="w-5 h-5 pt-1 text-primary-dark"><FaChevronDown /></div>
                PRODUCTOS ACEPTADOS 
              </h3>
              {openSections['productos_aceptados'] && (
                <div className="pl-8 text-sm text-primary-darker mt-2">
                <ul className="list-disc list-inside">
                    <li>Ropa de recién nacido hasta talle 14 (años)</li>
                    <li>Artículos y accesorios de bebé y niño en excelente estado</li>                  
                    <li>Juguetes</li>                  
                    <li>Libros infantiles</li>                  
                    <li>Ropa de embarazo</li>
                </ul>
                <br></br>
                <p>Marcas aceptadas:</p>
                <ul className="list-disc list-inside">
                    <li>Marcas nacionales: Baby Cottons, La Folie, Magdalena Esposito, Petit Enfant, Paula Cahen D'Anvers, Little Akiabara, Cardón, Zara, Wanama, Rapsodia, Mimo, Cheeky, Broer, Pioppa, Yamp, Coniglio, Old Bunch, Grisino, Owoko, Pancha, Inés Meyer, Tienda Vevey, Mini Pou, Mini Anima, G de B, Crayon, Venga Madre, MAA Maternity</li>
                    <li>Cualquier marca extranjera</li>                  
                    <li>También aceptamos disfraces y ropa tradicional como bombachas de campo</li>
                </ul>    
                <br></br>
                <p>Importante: tomamos segundas marcas a partir de talle 9 meses. NO tomamos talles de 0 a 6 meses de segundas marcas. Algunos ejemplos de estas marcas son: Advanced, Pachi, Luz de Estrellita, Naranjo, Blue, Coffee, Berrinche, Creciendo, Gimos, Gamise, Filotea, Weak Meak, Zuppa, Le Utthe, Le Mouton Bebé</p>            
                </div>
              )}
            </div>

            <div className={`p-2 shadow-md w-full transition-shadow duration-300 mt-4 ${openSections['productos_no_aceptados'] ? 'shadow-lg' : 'shadow-md'}`}>
              <h3
                className="text-l text-primary-darker font-semibold cursor-pointer flex justify-start items-center"
                onClick={() => toggleSection('productos_no_aceptados')}
              >
                <div className="w-5 h-5 pt-1 text-primary-dark"><FaChevronDown /></div>
                PRODUCTOS NO ACEPTADOS
              </h3>
              {openSections['productos_no_aceptados'] && (
                <div className="pl-8 text-sm text-primary-darker mt-2">
                  <ul className="list-disc list-inside">
                    <li>Ropa de segundas marcas/no de marca de talles 0 a 6 meses</li>
                    <li>Calzado de segundas marcas/no de marca</li>   
                    <li>Ropa interior usada</li>   
                    <li>Chupetes, mordillos, etc. usados</li>   
                    <li>Medicamentos/Fórmula</li>   
                    <li>Pañales</li>   
                    <li>CDs/DVDs</li>   
                    <li>Infablebles usados</li>
                    <li>Blanquería usada (sábanas, toallas, fundas, acolchados, etc.)</li>   
                    <li>Peluches genéricos (si aceptamos personajes conocidos, en impecable estado)</li>   
                    <li>Gorritos de algodón de bebé </li>   
                    <li>Escarpines y gorros tejidos a mano</li>   
                    <li>Medias (salvo nuevas con etiquetas)</li>   
                    <li>Rompecabezas mayores a 200 piezas</li>   
                  </ul>
                </div>
              )}
            </div>

            <div className={`p-2 shadow-md w-full transition-shadow duration-300 mt-4 ${openSections['condicion_de_productos'] ? 'shadow-lg' : 'shadow-md'}`}>
              <h3
                className="text-l text-primary-darker font-semibold cursor-pointer flex justify-start items-center"
                onClick={() => toggleSection('condicion_de_productos')}
              >
                <div className="w-5 h-5 pt-1 text-primary-dark"><FaChevronDown /></div>
                CONDICION DE PRODUCTOS
              </h3>
              {openSections['condicion_de_productos'] && (
                <div className="pl-8 text-sm text-primary-darker mt-2">
                  <p>Seleccionamos artículos que estén en óptimas condiciones (deben ser revisados a la luz del día) y cumplan con los siguientes requisitos:</p>
                  <ul>
                    <li>- Estar lavado</li>
                    <li>- Estar planchado</li>   
                    <li>- Estar funcionando</li>   
                    <li>- No tener manchas</li>   
                    <li>- No estar descolorido</li>   
                    <li>- No tener agujeros</li>   
                    <li>- No estar roto</li>   
                    <li>- No estar deshilachado</li>   
                    <li>- No tener pelotitas</li>
                    <li>- No tener pelo</li>    
                  </ul>
                  <br></br>
                  <p>No seleccionamos ni elegimos productos con el envío de fotos. Todo se revisa en el Showroom</p>
                  <p>Importante: es trabajo del vendedor hacer la revisión y selección de productos antes de entregarlos. No entregues bolsas sin haber revisado y separado productos no aptos para la venta</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Clothes