"use client"
import React, { useState, ChangeEvent } from 'react'
import Product from '@/helpers/products'


export const TableProducts = () => {

    const [ products, setProducts ] = useState([
        { 
            id: 1, 
            codigo: '#CTJ1', 
            talle: '+0M', 
            marca: 'Marca', 
            descripcion: 'Detalle', 
            precio: '$ 00,00', 
            liquidacion: '$ 00,00', 
            imagen: 'Imagen' }
    ])
    const [marcaInput, setMarcaInput] = useState('');
    const [descripcionInput, setDescripcionInput] = useState('');

    const handleTalleChange = (id: number, newTalle: string) => {
        setProducts(products.map(product => product.id === id ? { ...product, talle: newTalle } : product));
      };

    const handleInputChange = (id: number, field: keyof Product, value: string) => {
        setProducts(products.map(product => 
          product.id === id ? { ...product, [field]: value } : product
        ));
      };
    
      const formatPrice = (value: string): string => {
        const numberValue = parseFloat(value.replace(/[^\d.-]/g, ''));
        if (isNaN(numberValue)) return '$0.00';
    
        return `$${numberValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
      };
    
      const handleFocus = (id: number, field: keyof Product) => {
        setProducts(products.map(product =>
          product.id === id ? { ...product, [field]: '' } : product
        ));
      };
    
      const handleBlur = (id: number, field: keyof Product) => {
        setProducts(products.map(product =>
          product.id === id ? { ...product, [field]: formatPrice(product[field].toString()) } : product
        ));
      };

      const handleFocusField = (field: 'marca' | 'descripcion') => {
        setProducts(products.map(product =>
          product[field as keyof Product] === 'Marca' || product[field as keyof Product] === 'Descripción del producto'
            ? { ...product, [field]: '' }
            : product
        ));
      };

      const handleDeleteProduct = (id: number) => {
        const updatedProducts = products.filter(product => product.id !== id);
        setProducts(updatedProducts);
      };

      const handleAddProduct = () => {
        const newProduct = {
          id: products.length + 1,
          codigo: '',
          talle: '',
          marca: '',
          descripcion: '',
          precio: '',
          liquidacion: '',
          imagen: ''
        };
        setProducts([...products, newProduct]);
      };
    

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-40">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-primary-darker uppercase bg-secondary-lighter">
                    <tr>
                    <th scope="col" className="p-4"></th>
                        <th scope="col" className="px-6 py-3">Código</th>
                        <th scope="col" className="px-6 py-3">Talle</th>
                        <th scope="col" className="px-6 py-3">Marca</th>
                        <th scope="col" className="px-6 py-3">Descripción</th>
                        <th scope="col" className="px-6 py-3">Precio</th>
                        <th scope="col" className="px-6 py-3">Liquidación</th>
                        <th scope="col" className="px-6 py-3">Imágen</th>
                        <th scope="col" className="px-6 py-3">Acciones</th>
                    </tr>
                </thead>

        <tbody>
          {products.map(product => (
            <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="w-4 p-4"></td>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{product.codigo}</th>
              <td className="px-6 py-4">
              <select
                value={product.talle}
                onChange={(e) => handleTalleChange(product.id, e.target.value)}
                className="w-full p-2 bg-white border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                <option value="+0M">+0M</option>
                <option value="3-6M">3-6M</option>
                <option value="6-12M">6-12M</option>
                <option value="+12M">+12M</option>
                </select>
              </td>
              <td className="px-6 py-4">
              <input
                  type="text"
                  value={product.marca}
                  onFocus={() => handleFocusField ('marca')}
                  onChange={(e) => handleInputChange(product.id, 'marca', e.target.value)}
                  placeholder={marcaInput || 'Marca'}
                  className="w-full p-2 bg-white border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </td>
              <td className="px-6 py-4">
              <input
                  type="text"
                  value={product.descripcion}
                  onFocus={() => handleFocusField ('descripcion')}
                  onChange={(e) => handleInputChange(product.id, 'descripcion', e.target.value)}
                  placeholder={descripcionInput || 'Detalle'}
                  className="w-full p-2 bg-white border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </td>
              <td className="px-6 py-4">
              <input
                  type="text"
                  value={product.precio}
                  onFocus={() => handleFocus(product.id, 'precio')}
                  onBlur={() => handleBlur(product.id, 'precio')}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(product.id, 'precio', e.target.value)}
                  placeholder="$0.00"
                  className="w-full p-2 bg-white border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </td>
              <td className="px-6 py-4">
              <input
                  type="text"
                  value={product.liquidacion}
                  onFocus={() => handleFocus(product.id, 'liquidacion')}
                  onBlur={() => handleBlur(product.id, 'liquidacion')}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(product.id, 'liquidacion', e.target.value)}
                  placeholder="$0.00"
                  className="w-full p-2 bg-white border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </td>
              <td className="px-6 py-4">{product.imagen}</td>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-primary-darker hover:underline">Editar</a>
                <br />
                <a href="#" className="font-medium text-primary-darker cursor-pointer" onClick={() => handleDeleteProduct(product.id)}>Eliminar</a>

              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={9} className="px-6 py-4 text-right">
              <button
                className="text-sm text-primary-darker hover:underline"
                onClick={handleAddProduct}
              >
                + Agregar producto
              </button>
            </td>
          </tr>
        </tbody>

    </table>

    <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Anterior</a>
            </li>
            <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                1</a>
            </li>
            <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                2</a>
            </li>
            <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Siguiente</a>
            </li>
        </ul>
    </nav>
</div>

  )
}

export default TableProducts