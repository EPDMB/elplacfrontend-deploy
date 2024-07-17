"use client";

import Input from "@/components/Input";
import ProductsTable from "@/components/Table/ProductsTable";
import { useAuth } from "@/context/AuthProvider";
import { useProfile } from "@/context/ProfileProvider";
import { createProductRequest, getAllProductRequest } from "@/helpers/services";
import {
  formTypeEnum,
  IProduct,
  NotificationsFromAdmin,
  ProductProps,
} from "@/types";
import { useFormik } from "formik";
import React, { useState, useEffect, ChangeEvent, use } from "react";
import { Notification, ProductStatus } from "@/types";
import io, { Socket } from "socket.io-client";
import Navbar from "@/components/Navbar";
import Sidebar from "../SidebarDashboard";
import Tips from "./Tips";
import SellerData from "./SellerData";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

import { URL } from "../../../../envs";
import Link from "next/link";
import { FaBell } from "react-icons/fa";
import SellerProductRequestResponse from "./SellerProductRequestResponse";
import Dropdown from "@/components/Dropdown";
import SellerGettingActiveFair from "./SellerGettingActiveFair";

import { useRouter } from "next/navigation";
import { useFair } from "@/context/FairProvider";
import WithAuthProtect from "@/helpers/WithAuth";
import PrintLabel from "@/components/PrintLabel/PrintLabel";

const socket: Socket = io(`${URL}`, {
  withCredentials: true,
  extraHeaders: {
    "Content-Type": "application/json",
  },
});

const SellerProducts = () => {
  const [notifications, setNotifications] = useState<NotificationsFromAdmin[]>(
    []
  );
  const { token } = useAuth();
  const { userDtos, sellerDtos } = useProfile();
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [usersFiltered, setUsersFiltered] = useState<any[]>([]);
  const [myRequest, setMyRequest] = useState<any[]>([]);
  const [visibleStep, setVisibleStep] = useState<string>("TIPS");
  const [categorySelected, setCategorySelected] =
    useState<string>("0-12-mujer");

  const router = useRouter();


  useEffect(() => {
    const handleNotification = (notification: NotificationsFromAdmin) => {

      const isRelevantNotification =
        userDtos?.seller?.id === notification.sellerId ||
        (notification.forAll && notification.message);

      if (isRelevantNotification) {
        setNotifications((prev) => [...prev, notification]);
      }
    };

    socket.on("vendor-notification", handleNotification);

    return () => {
      socket.off("vendor-notification", handleNotification);
    };
  }, [myRequest, userDtos?.seller?.id]);

  const infoToPost = {
    sellerId: userDtos?.seller?.id ?? "",
    fairId: userDtos?.seller?.registrations?.[0]?.fair?.id ?? "",
    category:
      userDtos?.seller?.registrations?.[0]?.fair?.fairCategories?.[0]?.category
        ?.name ?? "0-12 mujer",
  };

  const postProductsReq = async () => {
    const productsToSend: Partial<ProductProps>[] = products.map((product) => {
      const { id, ...rest } = product; // esto es temporal para no mandar al back informacion de mas
      let numericPrice: number | undefined;

      if (typeof product.price === "string") {
        numericPrice = parseFloat(
          (product.price as string).replace(/[^\d.-]/g, "")
        ); // esto es para que el precio sea un numero como el back espera y no cambiar la funcion formatprice
      } else if (typeof product.price === "number") {
        numericPrice = product.price;
      } else {
        numericPrice = undefined;
      }

      return {
        ...rest,
        price: numericPrice,
        category: categorySelected,
      };
    });


    try {
      const res = await createProductRequest(
        token,
        infoToPost.sellerId,
        productsToSend as ProductProps[],
        infoToPost.fairId,
        infoToPost.category
      );

      setProducts([]);
      socket.emit("notify-admin", {
        date: new Date(),
        message: `${userDtos?.name} te envió productos`,
        actions: "/admin/products",
      });
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleInputChange = (
    id: number,
    field: keyof ProductProps,
    value: string
  ) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, [field]: value } : product
      )
    );
  };

  const handleFocus = (id: number, field: keyof ProductProps) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, [field]: "" } : product
      )
    );
  };

  const handleBlur = (id: number, field: keyof ProductProps) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
            ...product,
            [field]:
              product[field] !== undefined
                ? formatPrice(product[field].toString())
                : product[field],
          }
          : product
      )
    );
  };

  const formatPrice = (value: string): string => {
    const numberValue = parseFloat(value.replace(/[^\d.-]/g, ""));
    if (isNaN(numberValue)) return "$0.00";
    return `$${numberValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
  };

  const handleDeleteProduct = (id: number) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  const handleAddProduct = () => {
    const newProduct: ProductProps = {
      id: products.length + 1,
      brand: "",
      description: "",
      price: 0,
      liquidation: false,
      size: "",
      category: "",
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const categoryOptions = [
    { value: "0-12-mujer", label: "0-12 Mujer" },
    { value: "0-12-Varon", label: "0-12 Varón" },
    { value: "+12-Mujer", label: "+12 Mujer" },
    { value: "+12-Varon", label: "+12 Varón" },
    { value: "adultos", label: "Adultos" },
    { value: "libros/juguetes", label: "Libros/Juguetes" },
  ];

  return (
    <div>
      <div className="w-full h-32 flex items-center">
        <Navbar />
      </div>
      <div className="grid grid-cols-8 gap-0 relative place-content-center">
        <div className="flex col-span-1  bg-secondary-lighter">
          <Sidebar userRole={userDtos?.role} />
        </div>
        <div className="bg-secondary-lighter  col-span-8 sm:col-span-7 lg:h-[100vh]">
          <div className="mx-10 flex flex-col items-center">
            <div className="mt-10 w-full flex justify-between">
              <div className="border border-primary-lighter font-semibold rounded-lg text-primary-darker">
                <div>
                  <button
                    onClick={() => setVisibleStep("TIPS")}
                    className={`p-2 ${visibleStep === "TIPS"
                      ? "bg-[#F9FAFB] text-primary-darker"
                      : "bg-secondary-lighter text-primary-darker"
                      }`}
                  >
                    TIPS
                  </button>
                  <button
                    onClick={() => setVisibleStep("DATOS")}
                    className={`border-l border-gray-300 p-2 ${visibleStep === "DATOS"
                      ? "bg-[#F9FAFB] text-primary-darker"
                      : "bg-secondary-lighter text-primary-darker"
                      }`}
                  >
                    DATOS
                  </button>
                  <button
                    onClick={() => setVisibleStep("PRODUCTOS")}
                    className={`border-l border-gray-300 p-2 ${visibleStep === "PRODUCTOS"
                      ? "bg-[#F9FAFB] text-primary-darker"
                      : "bg-secondary-lighter text-primary-darker"
                      }`}
                  >
                    PRODUCTOS
                  </button>
                  <button
                    onClick={() => setVisibleStep("RESUMEN")}
                    className={`border-l border-gray-300 p-2 ${visibleStep === "RESUMEN"
                      ? "bg-[#F9FAFB] text-primary-darker"
                      : "bg-secondary-lighter text-primary-darker"
                      }`}
                  >
                    RESUMEN
                  </button>
                </div>
              </div>
            </div>
            <PrintLabel sellerId={userDtos?.seller?.id} />
            {visibleStep === "TIPS" && <Tips setVisibleStep={setVisibleStep} />}
            {visibleStep === "DATOS" && (
              <SellerData setVisibleStep={setVisibleStep} />
            )}
            {visibleStep === "RESUMEN" && (
              <>
                <div className="grid grid-rows-[auto_auto_1fr] grid-cols-3 gap-5">
                  <div className="col-span-2">
                    <div className="w-full mt-5 flex flex-col rounded-lg bg-secondary-lighter shadow-md">
                      <h1 className="font-semibold text-primary-darker text-xl h-72 overflow-auto">
                        <SellerProductRequestResponse
                          sellerId={userDtos?.seller?.id}
                        />
                      </h1>
                    </div>
                  </div>
                  <div className="col-span-1 row-span-3 mb-5">
                    <div className="w-full h-full mt-5 flex p-6 flex-col rounded-lg bg-secondary-lighter shadow-md">
                      <div>
                        <h1 className="font-semibold text-primary-darker text-xl flex justify-end">
                          <FaBell />
                        </h1>
                        <div className="mt-4">
                          {notifications.length > 0 ? (
                            notifications.map((request, index) => (
                              <div
                                key={index}
                                className="shadow-xl bg-[#F9FAFB] text-primary-darker flex flex-col font-semibold rounded-3xl p-4 mt-4"
                              >
                                <span className="text-sm font-normal"></span>
                                <h3 className="text-lg border-b border-primary-default mb-2">
                                  {request.message}
                                </h3>
                                <p>{request.callToAction}</p>
                              </div>
                            ))
                          ) : (
                            <div className="text-center text-[#5E5F60] text-lg font-normal">
                              No tienes notificaciones
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row-span-3 mb-5 col-span-2 rounded-lg bg-secondary-lighter shadow-md">
                    <div className="w-full h-full  flex p-6 flex-col">
                      <SellerGettingActiveFair
                        sellerId={userDtos?.seller?.id}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {visibleStep === "PRODUCTOS" && (
              <>
                <div className="max-h-80 overflow-y-auto w-full">
                  <table className="w-full  text-sm text-left rtl:text-right bg-[#F9FAFB]">
                    {products.length !== 0 && (
                      <thead className="text-sm text-primary-darker uppercase bg-[#F9FAFB] border-b-primary-default border">
                        <tr>
                          <th scope="col" className="p-4"></th>

                          <th scope="col" className="px-6 py-3">
                            Talle
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Marca
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Descripción
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Precio
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Liquidación
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Categoria
                          </th>

                          <th scope="col" className="px-6 py-3">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                    )}
                    <tbody className="text-[#667085]">
                      {products.length !== 0 ? (
                        products.map((product) => (
                          <tr
                            key={product.id}
                            className="bg-secondary-lighter border border-secondary-dark hover:bg-secondary-light "
                          >
                            <td className="px-6 py-4 font-medium whitespace-nowrap"></td>

                            <td className="px-6 py-4 text-primary-darker font-medium">
                              <input
                                type="text"
                                value={product.size}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                  handleInputChange(
                                    product.id,
                                    "size",
                                    e.target.value
                                  )
                                }
                                placeholder="Talle"
                                className="w-full p-2 bg-white border border-gray-300 rounded "
                              />
                            </td>
                            <td className="px-6 py-4 text-primary-darker font-medium">
                              <input
                                type="text"
                                value={product.brand}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                  handleInputChange(
                                    product.id,
                                    "brand",
                                    e.target.value
                                  )
                                }
                                placeholder="Marca"
                                className="w-full p-2 bg-white border border-gray-300 rounded "
                              />
                            </td>
                            <td className="px-6 py-4 text-primary-darker font-medium">
                              <input
                                type="text"
                                value={product.description}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                  handleInputChange(
                                    product.id,
                                    "description",
                                    e.target.value
                                  )
                                }
                                placeholder="Descripción"
                                className="w-full p-2 bg-white border border-gray-300 rounded "
                              />
                            </td>
                            <td className="px-6 py-4 text-primary-darker font-medium">
                              <input
                                type="text"
                                value={product.price.toString()}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                  handleInputChange(
                                    product.id,
                                    "price",
                                    e.target.value
                                  )
                                }
                                onFocus={() => handleFocus(product.id, "price")}
                                onBlur={() => handleBlur(product.id, "price")}
                                placeholder="Precio"
                                className="w-full p-2 bg-white border border-gray-300 rounded "
                              />
                            </td>
                            <td className="px-6 py-4 text-primary-darker font-medium">
                              <input
                                type="text"
                                value={
                                  sellerDtos?.registrations?.[0]?.liquidation
                                    ? "Si"
                                    : "No Aplica"
                                }
                                readOnly
                                disabled
                                placeholder="Liquidación"
                                className="w-full p-2  border border-gray-300 rounded cursor-default"
                                onFocus={(e) => e.target.blur()}
                                onClick={(e) => e.preventDefault()}
                              />
                            </td>
                            <td className="px-6 py-4 text-primary-darker font-medium">
                              <select
                                value={categorySelected}
                                onChange={(e) =>
                                  setCategorySelected(e.target.value)
                                }
                                className="block w-full pl-3 pr-10 py-2 cursor-pointer text-base border border-gray-300 focus:outline-none focus:ring-primary-darker focus:border-primary-darker sm:text-sm rounded-md"
                              >
                                {categoryOptions.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </td>

                            <td className="px-6 py-4 text-primary-darker font-medium">
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <div className=" shadow-md bg-secondary-lighter">
                          <div className="p-32 flex flex-col gap-4 items-center justify-center">
                            <div className="flex flex-row gap-4">
                              <div className="flex flex-col items-center gap-4 w-fit h-fit shadow-md rounded-lg p-5">
                                <p className="font-semibold text-2xl text-primary-dark text-center">
                                  ¡Comienza a cargar tus productos!
                                </p>
                                <FaArrowDown />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end mt-4 flex-col items-end">
                  <button
                    className="text-sm mt-5 p-2 text-primary-darker hover:underline flex items-center justify-center md:h-8 md:w-36"
                    onClick={handleAddProduct}
                  >
                    + Agregar producto
                  </button>
                  <button
                    disabled={products.length === 0} //esto es temporal tambien, hay que hacer mas validaciones
                    onClick={postProductsReq}
                    className="disabled:cursor-not-allowed mb-10 bg-primary-darker mt-5 text-white p-2 rounded hover:bg-primary-dark md:h-8 flex items-center justify-center md:w-36 md:text-base text-xs sm:text-sm"
                  >
                    Enviar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithAuthProtect({ Component: SellerProducts, role: "seller" });
