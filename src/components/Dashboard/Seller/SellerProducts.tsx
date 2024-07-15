"use client";

import Input from "@/components/Input";
import ProductsTable from "@/components/Table/ProductsTable";
import { useAuth } from "@/context/AuthProvider";
import { useProfile } from "@/context/ProfileProvider";
import { createProductRequest, getAllProductRequest } from "@/helpers/services";
import { formTypeEnum, IProduct, NotificationsFromAdmin, ProductProps } from "@/types";
import { useFormik } from "formik";
import React, { useState, useEffect, ChangeEvent, use } from "react";
import { Notification, ProductStatus } from "@/types";
import io, { Socket } from "socket.io-client";
import Navbar from "@/components/Navbar";
import Sidebar from "../SidebarDashboard";
import Tips from "./Tips";
import SellerData from "./SellerData";

const socket: Socket = io("http://localhost:3000", {
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
  const { userDtos } = useProfile();
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [usersFiltered, setUsersFiltered] = useState<any[]>([]);
  const [myRequest, setMyRequest] = useState<any[]>([]);
  const [visibleStep, setVisibleStep] = useState<string>("");
  console.log(products);
  console.log("estado", notifications);
  console.log(myRequest);
  console.log(userDtos);

  useEffect(() => {
    const handleNotification = (notification: NotificationsFromAdmin) => {
      console.log("Notification from admin:", notification);
      console.log("UserDtos:", userDtos?.seller?.id);
      console.log("Notification sellerId:", notification.sellerId);
      const isRelevantNotification =
        userDtos?.seller?.id === notification.sellerId ||
        (notification.forAll && notification.message);

      console.log("isRelevantNotification:", isRelevantNotification);
      if (isRelevantNotification) {
        setNotifications((prev) => [...prev, notification]);
      }
    };

    socket.on("vendor-notification", handleNotification);

    return () => {
      socket.off("vendor-notification", handleNotification);
    };
  }, [myRequest, userDtos?.seller?.id]);

  useEffect(() => {
    if (userDtos?.seller?.id) {
      const getProductRequest = async () => {
        try {
          const res = await getAllProductRequest();
          console.log("Response from getAllProductRequest:", res);

          if (!Array.isArray(res)) {
            throw new Error("Expected response to be an array");
          }

          const filteredRes = res.filter(
            (product) => product?.seller?.id === userDtos?.seller?.id
          );

          console.log("Filtered response:", filteredRes);
          setMyRequest(filteredRes);
        } catch (error) {
          console.error("Error fetching product requests:", error);
        }
      };

      getProductRequest();
    }
  }, [userDtos?.seller?.id, setMyRequest]);

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
      };
    });
    console.log(productsToSend);
    console.log(infoToPost);
    console.log(token);

    try {
      const res = await createProductRequest(
        token,
        infoToPost.sellerId,
        productsToSend as ProductProps[],
        infoToPost.fairId,
        infoToPost.category
      );
      console.log(res);
      setProducts([]);
      socket.emit("notify-admin", {
        message: "Nueva solicitud de producto",
        product: {
          sellerId: infoToPost.sellerId,
          pRequestId: res.productRequest.pRequestId,
          status: ProductStatus.Pending,
        },
      });
      formik.resetForm();
    } catch (error: any) {
      console.error(error);
    }
  };

  const formik = useFormik<ProductProps>({
    initialValues: {
      id: 0,
      brand: "",
      description: "",
      price: 0,
      liquidation: false,
      size: "",
      photoUrl: "",
      category: "",
    },
    onSubmit: (values, { resetForm }) => {
      setProducts((prev) => [...prev, { ...values, id: prev.length + 1 }]);
      resetForm();
    },
  });

  const getProps = (name: keyof ProductProps) => ({
    name,
    formType: formTypeEnum.products,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    value: formik.values[name],
    touched: formik.touched[name],
    errors: formik.errors[name],
  });

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
          ? { ...product, [field]: formatPrice(product[field].toString()) }
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
      photoUrl: "",
      category: "",
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  return (
    <div>
      <div className="w-full h-32 flex items-center">
        <Navbar />
      </div>
      <div className="grid grid-cols-8 gap-0 relative place-content-center">
        <div className="flex col-span-1  bg-secondary-lighter">
          <Sidebar userRole={userDtos?.role} />
        </div>
        <div className="bg-secondary-lighter  col-span-8 sm:col-span-7">
          <div className="mx-10 flex flex-col  items-center  ">
            <div>
              <button onClick={() => setVisibleStep("TIPS")}>TIPS</button>
              <button onClick={() => setVisibleStep("DATOS")}>DATOS</button>
              <button onClick={() => setVisibleStep("NOTIFICACIONES")}>
                NOTIFICACIONES
              </button>
              <button onClick={() => setVisibleStep("")}>RESET</button>
            </div>
            {visibleStep === "TIPS" && <Tips />}
            {visibleStep === "DATOS" && <SellerData />}

            {visibleStep === "NOTIFICACIONES" && (
              <div className="h-32 w-80 border border-red-400 overflow-scroll">
                <h2 className="text-lg font-bold mb-2">
                  Notificaciones del Administrador
                </h2>
                {notifications.length > 0 && (
                  <div className="mb-4">
                    {notifications.map((notification, index) => (
                      <div
                        key={index}
                        className="bg-white p-4 shadow rounded mb-2">
                        <p className="font-semibold">{notification.message}</p>
                        {notification.product && (
                          <div>
                            <p>Vendedor: {notification.product.sellerId}</p>
                            <p>
                              ID Solicitud: {notification.product.pRequestId}
                            </p>
                            <p>Estado: {notification.product.status}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            <div className="col-span-2">
              <div className="gap-4 flex justify-end">
                <button className="bg-white p-2 rounded-lg">Exportar</button>
              </div>
            </div>
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
                        className="bg-secondary-lighter border border-secondary-dark hover:bg-secondary-light ">
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
                            value={String(product.liquidation)}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              handleInputChange(
                                product.id,
                                "liquidation",
                                e.target.value
                              )
                            }
                            placeholder="Liquidación"
                            className="w-full p-2 bg-white border border-gray-300 rounded"
                          />
                        </td>
                        <td className="px-6 py-4 text-primary-darker font-medium">
                          <input
                            type="text"
                            value={product.category}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              handleInputChange(
                                product.id,
                                "category",
                                e.target.value
                              )
                            }
                            placeholder="Categoria"
                            className="w-full p-2 bg-white border border-gray-300 rounded "
                          />
                        </td>

                        <td className="px-6 py-4 text-primary-darker font-medium">
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="">
                      <div className="p-32 flex items-center justify-center">
                        <p className="font-semibold text-2xl text-primary-dark">
                          Agrega tus productos
                        </p>
                      </div>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4 flex-col items-end">
              <button
                className="text-sm mt-5 p-2 text-primary-darker hover:underline flex items-center justify-center md:h-8 md:w-36"
                onClick={handleAddProduct}>
                + Agregar producto
              </button>
              <button
                disabled={products.length === 0} //esto es temporal tambien, hay que hacer mas validaciones
                onClick={postProductsReq}
                className="disabled:cursor-not-allowed mb-10 bg-primary-darker mt-5 text-white p-2 rounded hover:bg-primary-dark md:h-8 flex items-center justify-center md:w-36 md:text-base text-xs sm:text-sm">
                Enviar Productos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProducts;
