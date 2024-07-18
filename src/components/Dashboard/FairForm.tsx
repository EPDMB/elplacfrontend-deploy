"use client";
import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import Input from "./InputFairForm";
import "react-toastify/dist/ReactToastify.css";
import { postCreateFair } from "../../helpers/services";
import { useAuth } from "@/context/AuthProvider";
import WithAuthProtect from "@/helpers/WithAuth";
import { useFair } from "@/context/FairProvider";
import { useRouter } from "next/navigation";
import { notify } from "../Notifications/Notifications";
import { Checkbox, Label } from "flowbite-react";
import { Category, CategoryArray, CategoryData, CategoryDataField, CategoryKey, IsCheckedType } from "@/types";

const CreateFairForm: React.FC = () => {
  const { token } = useAuth();
  const [hasCost, setHasCost] = useState(false);
  const { activeFair, setActiveFair } = useFair();
  const router = useRouter();
  const [isChecked, setIsChecked] = useState<IsCheckedType>({
    youngMan: false,
    youngWoman: false,
    man: false,
    woman: false,
    adults: false,
    booksToys: false,
  });
const [categoriesData, setCategoriesData] = useState<CategoryData[]>([]);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setIsChecked((prevState) => ({
      ...prevState,
      [name]: checked,
    }));

    if (checked) {
      setCategoriesData((prevCategories) => [
        ...prevCategories,
        {
          name,
          maxProductsSeller: "",
          minProductsSeller: "",
          maxSellers: "",
          maxProducts: "",
        },
      ]);
    } else {
      setCategoriesData((prevCategories) =>
        prevCategories.filter((category) => category.name !== name)
      );
    }
  };

  const handleCategoryChange = (
    index: number,
    field: CategoryDataField,
    value: string
  ) => {
    const updatedCategories = [...categoriesData];
    updatedCategories[index][field] = value;
    setCategoriesData(updatedCategories);
  };

  const categoryMap = {
    youngMan: "0-12-Varon",
    youngWoman: "0-12-Mujer",
    man: "+12-Varon",
    woman: "+12-Mujer",
    adults: "Adultos",
    booksToys: "Libros/Juguetes",
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      entryPriceBuyer: 0,
      entryPriceSeller: 0,
      entryDescription: "",
      descripcion: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      timeSlotInterval: "",
      capacityPerTimeSlot: "",
    },

    onSubmit: async (values) => {
      const transformedData = {
        name: values.name,
        address: values.address,
        entryPriceBuyer: hasCost ? values.entryPriceBuyer : 0,
        entryPriceSeller: values.entryPriceSeller,
        entryDescription: values.entryDescription,
        startDate: values.startDate,
        endDate: values.endDate,
        startTime: values.startTime,
        endTime: values.endTime,
        timeSlotInterval: parseInt(values.timeSlotInterval, 10),
        capacityPerTimeSlot: parseInt(values.capacityPerTimeSlot, 10),
        fairCategories: categoriesData.map((cat) => ({
          maxProductsSeller: parseInt(cat.maxProductsSeller, 10),
          minProductsSeller: parseInt(cat.minProductsSeller, 10),
          maxSellers: parseInt(cat.maxSellers, 10),
          maxProducts: parseInt(cat.maxProducts, 10),
          category: [
            { name: categoryMap[cat.name as keyof typeof categoryMap] },
          ],
        })),
      };


      try {
        const response = await postCreateFair(transformedData, token);
        setActiveFair(response);
        router.push("/admin/postFair");
        notify("ToastSuccess", "Feria Creada Exitosamente");
        if (response && response.error) {
          throw new Error("Error al crear la feria" + response.error);
        }
      } catch (error) {
        console.error("Error al crear la feria FORM", error);
      }
    },
  });

  return (
    <div className="container mx-auto px-6 py-6">
      <div className="bg-[#f1fafa] p-8 rounded-lg shadow-md ">
        {activeFair && (
          <div className="w-screen h-[50vh]">
            <>
              <h2 className="text-4xl text-primary-darker font-semibold mb-6">
                ¡Ya existe una feria activa!
              </h2>
              <p className="text-2xl text-primary-darker font-semibold mb-6">
                Ve a la sección de Administración de Ferias para gestionar su
                estado actual.
              </p>
              <a
                href="/admin/postFair"
                className="mt-4 px-4 py-2 w-fit m-auto text-white rounded-md hover:bg-primary-dark bg-primary-darker text-center"
              >
                Ir ahora
              </a>
            </>
          </div>
        )}
        {!activeFair && (
          <>
            <h2 className="text-4xl text-primary-darker font-semibold mb-6">
              Crear una feria
            </h2>
            <form
              onSubmit={formik.handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div>
                <h3 className="text-xl text-primary-darker font-semibold mb-4">
                  Datos Generales
                </h3>
                <div className="mb-4 border p-4 rounded-lg">
                  <div className="mb-4">
                    <Input
                      label="Nombre"
                      name="name"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      onBlur={formik.handleBlur}
                      placeholder="Nombre de la feria"
                    />
                  </div>
                  <div className="mb-4">
                    <Input
                      label="Dirección"
                      name="address"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.address}
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
                          label="Fecha Inicio"
                          name="startDate"
                          type="date"
                          onChange={formik.handleChange}
                          value={formik.values.startDate}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                      <div className="w-1/2">
                        <Input
                          label="Fecha Fin"
                          name="endDate"
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
                          label="Hora Inicio"
                          name="startTime"
                          type="time"
                          onChange={formik.handleChange}
                          value={formik.values.startTime}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                      <div className="w-1/2">
                        <Input
                          label="Hora Fin"
                          name="endTime"
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
                          label="Intervalo de Horarios (min)"
                          name="timeSlotInterval"
                          type="text"
                          onChange={formik.handleChange}
                          value={formik.values.timeSlotInterval}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                      <div className="w-1/2">
                        <Input
                          label="Capacidad por Intervalo"
                          name="capacityPerTimeSlot"
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
                    Entradas
                  </h3>
                  <div className="border p-4 rounded-lg">
                    <div className="flex space-x-4">
                      <div className="w-1/2">
                        <Input
                          label="Precio de entrada comprador"
                          name="entryPriceBuyer"
                          type="number"
                          onChange={formik.handleChange}
                          value={formik.values.entryPriceBuyer}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                      <div className="w-1/2">
                        <Input
                          label="Precio de entrada vendedor"
                          name="entryPriceSeller"
                          type="number"
                          onChange={formik.handleChange}
                          value={formik.values.entryPriceSeller}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Input
                        label="Descripción de la entrada"
                        name="entryDescription"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.entryDescription}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    <div className="flex items-center mt-4">
                      <input
                        type="checkbox"
                        id="hasCost"
                        checked={hasCost}
                        onChange={() => setHasCost(!hasCost)}
                        className="mr-2"
                      />
                      <label htmlFor="hasCost">
                        Tiene costo para el comprador
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-xl text-primary-darker font-semibold mb-4">
                    Categorías
                  </h3>
                  <div className="border p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {Object.keys(isChecked).map((category, index) => (
                        <div key={category} className="flex items-center">
                          <Checkbox
                            id={category}
                            name={category}
                            checked={isChecked[category as keyof IsCheckedType]}
                            onChange={handleCheckboxChange}
                          />
                          <Label htmlFor={category} className="ml-2">
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>

                    {categoriesData.map((category, index) => (
                      <div
                        key={category.name}
                        className="mb-4 border p-4 rounded-lg"
                      >
                        <h4 className="text-md text-primary-darker font-semibold mb-2">
                          {category.name}
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            label="Max Productos por Vendedor"
                            name="maxProductsSeller"
                            type="number"
                            onChange={(e) =>
                              handleCategoryChange(
                                index,
                                "maxProductsSeller",
                                e.target.value
                              )
                            }
                            value={category.maxProductsSeller}
                          />
                          <Input
                            label="Min Productos por Vendedor"
                            name="minProductsSeller"
                            type="number"
                            onChange={(e) =>
                              handleCategoryChange(
                                index,
                                "minProductsSeller",
                                e.target.value
                              )
                            }
                            value={category.minProductsSeller}
                          />
                          <Input
                            label="Max Vendedores"
                            name="maxSellers"
                            type="number"
                            onChange={(e) =>
                              handleCategoryChange(
                                index,
                                "maxSellers",
                                e.target.value
                              )
                            }
                            value={category.maxSellers}
                          />
                          <Input
                            label="Max Productos"
                            name="maxProducts"
                            type="number"
                            onChange={(e) =>
                              handleCategoryChange(
                                index,
                                "maxProducts",
                                e.target.value
                              )
                            }
                            value={category.maxProducts}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-2 mt-4 text-white bg-primary-darker rounded-md hover:bg-primary-dark"
                >
                  Crear Feria
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default WithAuthProtect({ Component: CreateFairForm, role: "admin" });
