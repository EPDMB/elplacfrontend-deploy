"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import Input from "./InputFairForm";
import "react-toastify/dist/ReactToastify.css";
import { postCreateFair } from "../../helpers/services";
import { useAuth } from "@/context/AuthProvider";
import WithAuthProtect from "@/helpers/WithAuth";

const CreateFairForm: React.FC = () => {
  const { token } = useAuth();
  const [hasCost, setHasCost] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  const formik = useFormik({
    initialValues: {
      nombre: "",
      direccion: "",
      precioInscripcionVendedor: 0,
      precioEntradaUsuario: 0,
      importeDescripcion: "",
      entidadBenefica: "",
      descripcion: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      timeSlotInterval: "",
      capacityPerTimeSlot: "",
      fairCategories: [
        {
          maxProductsSeller: "",
          minProductsSeller: "",
          maxSellers: "",
          maxProducts: "",
          category: [{ name: "" }],
        },
      ],
    },

    onSubmit: async (values) => {
      setIsCreated(true);

      const transformedData = {
        name: values.nombre,
        address: values.direccion,
        entryPriceSeller: values.precioInscripcionVendedor,
        entryPriceBuyer: hasCost ? values.precioEntradaUsuario : 0,
        entryDescription: hasCost
          ? values.importeDescripcion
          : values.descripcion,
        startDate: values.startDate,
        endDate: values.endDate,
        startTime: values.startTime,
        endTime: values.endTime,
        timeSlotInterval: parseInt(values.timeSlotInterval, 10),
        capacityPerTimeSlot: parseInt(values.capacityPerTimeSlot, 10),
        fairCategories: values.fairCategories.map((category) => ({
          maxProductsSeller: parseInt(category.maxProductsSeller, 10),
          minProductsSeller: parseInt(category.minProductsSeller, 10),
          maxSellers: parseInt(category.maxSellers, 10),
          maxProducts: parseInt(category.maxProducts, 10),
          category: category.category.map((cat) => ({
            name: cat.name,
          })),
        })),
      };

      try {
        const response = await postCreateFair(transformedData, token);
        if (response && response.error) {
          throw new Error("Error al crear la feria" + response.error);
        }
      } catch (error) {
        console.error("Error al crear la feria FORM", error);
      }
    },
  });

  const handleAddCategory = (index: number) => {
    const newFairCategories = [...formik.values.fairCategories];
    newFairCategories[index].category.push({ name: "" });
    formik.setFieldValue("fairCategories", newFairCategories);
  };

  return (
    <div className="container mx-auto px-6 py-6">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-4xl text-primary-darker font-semibold mb-6">
          Crear una feria
        </h2>
        <form
          onSubmit={formik.handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl text-primary-darker font-semibold mb-4">
              Datos Generales
            </h3>
            <div className="mb-4 border p-4 rounded-lg">
              <div className="mb-4">
                <Input
                  label="Nombre"
                  name="nombre"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.nombre}
                  onBlur={formik.handleBlur}
                  placeholder="Nombre de la feria"
                />
              </div>
              <div className="mb-4">
                <Input
                  label="Dirección"
                  name="direccion"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.direccion}
                  onBlur={formik.handleBlur}
                  placeholder="Ubicación"
                />
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-xl text-primary-darker font-semibold mb-4">
                Días | Horario | Capacidad
              </h3>
              <div className="mb-4 border p-4 rounded-lg">
                <div className="flex space-x-4 mt-2">
                  <div className="w-1/2">
                    <Input
                      label={`Fecha Inicio`}
                      name={`startDate`}
                      type="date"
                      onChange={formik.handleChange}
                      value={formik.values.startDate}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  <div className="w-1/2">
                    <Input
                      label={`Fecha Fin`}
                      name={`endDate`}
                      type="date"
                      onChange={formik.handleChange}
                      value={formik.values.endDate}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
                <div className="flex space-x-4 mt-2">
                  <div className="w-1/2">
                    <Input
                      label={`Hora Inicio`}
                      name={`startTime`}
                      type="time"
                      onChange={formik.handleChange}
                      value={formik.values.startTime}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  <div className="w-1/2">
                    <Input
                      label={`Hora Fin`}
                      name={`endTime`}
                      type="time"
                      onChange={formik.handleChange}
                      value={formik.values.endTime}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
                <div className="flex space-x-4 mt-2">
                  <div className="w-1/2">
                    <Input
                      label={`Intervalo de Horarios (min)`}
                      name={`timeSlotInterval`}
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.timeSlotInterval}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  <div className="w-1/2">
                    <Input
                      label={`Capacidad por Intervalo`}
                      name={`capacityPerTimeSlot`}
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.capacityPerTimeSlot}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <h3 className="text-xl text-primary-darker font-semibold mb-4">
                Categorías
              </h3>
              {formik.values.fairCategories.map((fairCategory, index) => (
                <div key={index} className="mb-4 border p-4 rounded-lg">
                  {fairCategory.category.map((cat, catIndex) => (
                    <div key={catIndex} className="flex space-x-4 mt-2">
                      <div className="w-1/2">
                        <label
                          htmlFor={`fairCategories[${index}].category[${catIndex}].name`}
                          className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre Categoría
                        </label>
                        <select
                          className="block w-full border-gray-300 rounded-lg shadow-sm focus:border-primary-dark focus:ring focus:ring-primary-dark focus:ring-opacity-50 mb-6  "
                          name={`fairCategories[${index}].category[${catIndex}].name`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={cat.name}
                          id={`fairCategories[${index}].category[${catIndex}].name`}>
                          <option value="0-12 Varon">0-12 Varon</option>
                          <option value="0-12 Mujer">0-12 Mujer</option>
                          <option value="+12 Mujer">+12 Mujer</option>
                          <option value="+12 Varon">+12 Varon</option>
                          <option value="adultos">adultos</option>
                          <option value="Libros/Juguetes">
                            Libros/Juguetes
                          </option>
                        </select>
                      </div>
                    </div>
                  ))}
                  <div className="flex space-x-4 mt-2">
                    <div className="w-1/2">
                      <Input
                        label={`Mín. Productos por Vendedor`}
                        name={`fairCategories[${index}].minProductsSeller`}
                        type="number"
                        onChange={formik.handleChange}
                        value={fairCategory.minProductsSeller}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    <div className="w-1/2">
                      <Input
                        label={`Máx. Productos por Vendedor`}
                        name={`fairCategories[${index}].maxProductsSeller`}
                        type="number"
                        onChange={formik.handleChange}
                        value={fairCategory.maxProductsSeller}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-4 mt-2">
                    <div className="w-1/2">
                      <Input
                        label={`Máx. Vendedores por Categoría`}
                        name={`fairCategories[${index}].maxSellers`}
                        type="number"
                        onChange={formik.handleChange}
                        value={fairCategory.maxSellers}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    <div className="w-1/2">
                      <Input
                        label={`Máx. Productos por Categoría`}
                        name={`fairCategories[${index}].maxProducts`}
                        type="number"
                        onChange={formik.handleChange}
                        value={fairCategory.maxProducts}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddCategory(index)}
                    className="mt-2 text-blue-500">
                    + Añadir categoría
                  </button>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <h3 className="text-xl text-primary-darker font-semibold mb-4">
                Precio
              </h3>
              <div className="mb-4 border p-4 rounded-lg">
                <div className="mb-4">
                  <Input
                    label="Inscripción Vendedor"
                    name="precioInscripcionVendedor"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.precioInscripcionVendedor}
                    onBlur={formik.handleBlur}
                    placeholder="Importe $"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="precioEntradaUsuario"
                    className="block text-sm font-medium text-gray-700">
                    Turnos Usuario
                  </label>
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      name="hasCost"
                      id="hasCost"
                      className="mr-2"
                      checked={hasCost}
                      onChange={() => setHasCost(!hasCost)}
                    />
                    <label htmlFor="hasCost">Tiene costo?</label>
                  </div>
                  {hasCost ? (
                    <div>
                      <Input
                        label="Importe"
                        name="importe"
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.values.precioEntradaUsuario}
                        onBlur={formik.handleBlur}
                        placeholder="Importe"
                      />
                      <Input
                        label="Entidad Benéfica / Descripción"
                        name="entidadBenefica"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.entidadBenefica}
                        onBlur={formik.handleBlur}
                        placeholder="Nombre de la entidad"
                      />
                    </div>
                  ) : (
                    <div className="mb-4">
                      <Input
                        label="Descripción"
                        name="descripcion"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.descripcion}
                        onBlur={formik.handleBlur}
                        placeholder="Ej: Entrada libre"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex mt-6">
              <button
                type="submit"
                className="bg-primary-dark text-white px-4 py-2 rounded-md shadow-sm hover:bg-primary-darker">
                {isCreated ? "Editar Feria" : "Crear Feria"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithAuthProtect({ Component: CreateFairForm, role: "admin" });
