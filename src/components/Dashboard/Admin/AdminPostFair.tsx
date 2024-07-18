"use client";
import React, { useEffect, useState } from "react";
import {
  IHandleSelectProductStatus,
  IProductNotification,
  Notification,
  ProductProps,
  productsStatusEnum,
} from "@/types";
import {
  getAllProductRequest,
  getAllProducts,
  putProductStatus,
  updateFairStatus,
  updateProductStatus,
} from "@/helpers/services";
import { useAuth } from "@/context/AuthProvider";
import ProductsTable from "@/components/Table/ProductsTable";
import { useFair } from "@/context/FairProvider";
import { FaCheckCircle } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

import WithAuthProtect from "@/helpers/WithAuth";
import { Badge } from "@/components/Badges";
import Dropdown from "@/components/Dropdown";
import Product from "@/helpers/products";
import { notify } from "@/components/Notifications/Notifications";
import { useRouter } from "next/navigation";
import exportToExcel from "@/helpers/exportToExcel";

const AdminPostFair = () => {
  const { token } = useAuth();
  const { activeFair, setActiveFair } = useFair();
  const [products, setProducts] = useState<IProductNotification[]>([]);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [openModalUserId, setOpenModalUserId] = useState<boolean>(false);
  const [openModalExport, setOpenModalExport] = useState<boolean>(false);
  const router = useRouter();

  const closeModalHandler = () => {
    setOpenModalUserId(false);
  };

  useEffect(() => {
    if (token) {
      getAllProducts(token)
        .then((res) => {
          setProducts(res);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [token, trigger]);

  const soldedProducts = products.filter(
    (product) => product.status === "sold"
  ).length;
  const soldedOnClearance = products.filter(
    (product) => product.status === "soldOnClearance"
  ).length;
  const unSoldedProducts = products.filter(
    (product) => product.status === "unsold"
  ).length;
  const totalSales = products
    .filter(
      (product) =>
        product.status === "sold" || product.status === "soldOnClearance"
    )
    .reduce((acc, product) => acc + product.price, 0);
  const applyLiquidation = (price: number) => {
    const discount = price * 0.25;
    const finalPrice = price - discount;
    return finalPrice;
  };

  const actionsOptions = [
    { id: productsStatusEnum.sold, name: "Vendido" },
    { id: productsStatusEnum.soldOnClearance, name: "Vendido en liquidación" },
    { id: productsStatusEnum.unsold, name: "No vendido" },
  ];

  const detailsColumns = [
    { id: "code", label: "Codigo", sortable: true },
    { id: "category", label: "Categoria", sortable: true },
    { id: "size", label: "Talle", sortable: true },
    { id: "brand", label: "Marca", sortable: true },
    { id: "description", label: "Descripción", sortable: true },
    { id: "price", label: "Precio", sortable: true },
    { id: "liquidation", label: "Liquidación", sortable: true },
    { id: "actions", label: "Acciones", sortable: true },
  ];

  const handleSelect = async ({ id, status }: IHandleSelectProductStatus) => {
    try {
      const res = await putProductStatus(id, status, token);

      setTrigger((prev) => !prev);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleConcludeFair = async () => {
    closeModalHandler();
    if (!activeFair) return;

    const res = await updateFairStatus(token, activeFair?.id);
    setOpenModalExport(false);
    if (res?.ok) {
      notify("ToastSuccess", "Feria concluida con éxito");
      setActiveFair(undefined);
      router.push("/admin/fairs");
    }
  };

  const finalStateTranslate = {
    accepted: "Aceptado",
    notAccepted: "No aceptado",
    notAvailable: "No disponible",
    categoryNotApply: "Categoría no aplica",
    secondMark: "Segunda marca",
    pendingVerification: "Pendiente de verificación",
    sold: "Vendido",
    soldOnClearance: "Vendido en liquidación",
    unsold: "No vendido",
  };

  const handleExport = () => {
    const filename = `${activeFair?.name || "feria actual"}.xlsx`;
    const data = products.map((product) => ({
      SKU: product.code || "-",
      Categoria: product.category,
      Descripcion: product.description,
      Precio: product.price,
      Liquidacion: product.liquidation ? "Si" : "No Aplica",
      EstadoFinal: finalStateTranslate[product.status]
    }));

    exportToExcel(data, "Feria Actual", filename);
    setOpenModalExport(false);
  };

  return (
    <div className="grid grid-rows-[auto_auto_1fr] grid-cols-2 mx-20 mt-8 gap-5">
      <div className="col-span-2">
        <div>
          <div className="gap-4 flex justify-end">
            
            <button
              onClick={() => setOpenModalExport(true)}
              className="bg-[#ebfafa] flex items-center text-primary-darker gap-2 p-2 border border-[#D0D5DD] rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 256 256"
              >
                <path
                  fill="#2F8083"
                  d="M178.34 165.66L160 147.31V208a8 8 0 0 1-16 0v-60.69l-18.34 18.35a8 8 0 0 1-11.32-11.32l32-32a8 8 0 0 1 11.32 0l32 32a8 8 0 0 1-11.32 11.32M160 40a88.08 88.08 0 0 0-78.71 48.68A64 64 0 1 0 72 216h40a8 8 0 0 0 0-16H72a48 48 0 0 1 0-96c1.1 0 2.2 0 3.29.12A88 88 0 0 0 72 128a8 8 0 0 0 16 0a72 72 0 1 1 100.8 66a8 8 0 0 0 3.2 15.34a7.9 7.9 0 0 0 3.2-.68A88 88 0 0 0 160 40"
                />
              </svg>
              Exportar
            </button>
          </div>
        </div>
        <div className="w-full mt-5 flex p-6 flex-col rounded-lg bg-[#f1fafa]">
          <div>
            <h1 className="font-semibold text-primary-darker text-3xl">
              {activeFair?.name}
            </h1>
            <div className="flex gap-6">
              <div>
                <h3 className="text-[#5E5F60] text-lg">Vendidos</h3>
                <span className="text-[#5E5F60] text-3xl font-bold">
                  {soldedProducts}
                </span>
              </div>
              <div className="border border-[#E5E9EB]"></div>
              <div>
                <h3 className="text-[#5E5F60] text-lg">
                  Vendidos en liquidación
                </h3>
                <span className="text-[#5E5F60] text-3xl font-bold">
                  {soldedOnClearance}
                </span>
              </div>
              <div className="border border-[#E5E9EB]"></div>

              <div>
                <h3 className="text-[#5E5F60] text-lg">No vendidos</h3>
                <span className="text-[#5E5F60] text-3xl font-bold">
                  {unSoldedProducts}
                </span>
              </div>
              <div className="border border-[#E5E9EB]"></div>

              <div>
                <h3 className="text-[#5E5F60] text-lg">Ingresos</h3>
                <span className="text-[#5E5F60] text-3xl font-bold">
                  ${totalSales}
                </span>
              </div>
              <button
                onClick={() => setOpenModalUserId(true)}
                className="bg-white flex items-center text-primary-darker gap-2 p-2 border border-[#D0D5DD] rounded-lg"
              >
                <FaCheckCircle />
                Concluir feria
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="row-span-3 col-span-2 h-[30rem] bg-[#f1fafa] w-full 
       overflow-y-auto"
      >
        {" "}
        <table className="bg-[#f1fafa] overflow-auto">
          <thead>
            <tr>
              {detailsColumns.map((column) => (
                <th key={column.id} scope="col" className="px-6 py-3">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product: IProductNotification) => (
                <tr key={product.id} className="shadow-sm">
                  <td className="px-6 py-4 text-primary-darker font-medium">
                    {product.code}
                  </td>
                  <td className="px-6 py-4 text-primary-darker font-medium">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 text-primary-darker font-medium">
                    {product.size}
                  </td>
                  <td className="px-6 py-4 text-primary-darker font-medium">
                    {product.brand}
                  </td>
                  <td className="px-6 py-4 text-primary-darker font-medium">
                    {product.description}
                  </td>
                  <td className="px-6 py-4 text-primary-darker font-medium">
                    ${product.price}
                  </td>
                  <td className="px-6 py-4 text-primary-darker font-medium">
                    {product.liquidation
                      ? `$${applyLiquidation(product.price)}`
                      : "No aplica"}
                  </td>
                  <td className="px-5 py-4 text-primary-darker font-medium">
                    <Dropdown
                      onSelect={(selectedOption) =>
                        handleSelect({
                          id: product.id,
                          status: selectedOption.id,
                        })
                      }
                      options={actionsOptions}
                      className="w-60"
                      bg="bg-[#F9FAFB]"
                      value="Selecciona el estado"
                      noId={true}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr className=" ">
                <td
                  colSpan={detailsColumns && detailsColumns.length + 1}
                  className="p-32"
                >
                  <div className="flex flex-col gap-4 items-center justify-center">
                    <p className="font-semibold text-2xl text-primary-dark">
                      No hay solicitudes de productos
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {openModalUserId && (
          <div
            className="fixed z-20 inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => closeModalHandler()}
          >
            <div
              className="bg-primary-lighter h-[40vh] w-[50vw] p-8 m-3 md:m-0 rounded-3xl relative flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 text-2xl font-bold text-primary-darker rounded-full"
                onClick={() => closeModalHandler()}
              >
                ✖
              </button>
              <div className="flex flex-col gap-4 justify-center items-center">
                <p className="font-bold text-3xl flex items-center justify-center text-center text-primary-darker">
                  ¿Querés concluir la feria?
                </p>
                <div className="gap-4 flex">
                  <button
                    onClick={() => handleConcludeFair()}
                    className="bg-primary-darker text-white w-20 p-2 rounded-lg border border-[#D0D5DD]"
                  >
                    Si
                  </button>
                  <button
                    onClick={() => closeModalHandler()}
                    className="bg-white text-primary-darker w-20 p-2 rounded-lg border border-[#D0D5DD]"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {openModalExport && (
          <div
            className="fixed z-20 inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => setOpenModalExport(false)}
          >
            <div
              className="bg-primary-lighter h-[40vh] w-[50vw] p-8 m-3 md:m-0 rounded-3xl relative flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 text-2xl font-bold text-primary-darker rounded-full"
                onClick={() => setOpenModalExport(false)}
              >
                ✖
              </button>
              <div className="flex flex-col gap-4 justify-center items-center">
                <p className="font-bold text-3xl flex items-center justify-center text-center text-primary-darker">
                  ¿Deseas exportar la información de esta feria?
                </p>
                <div className="gap-4 flex">
                  <button
                    onClick={() => handleExport()}
                    className="bg-primary-darker text-white w-20 p-2 rounded-lg border border-[#D0D5DD]"
                  >
                    Si
                  </button>
                  <button
                    onClick={() => setOpenModalExport(false)}
                    className="bg-white text-primary-darker w-20 p-2 rounded-lg border border-[#D0D5DD]"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithAuthProtect({ Component: AdminPostFair, role: "admin" });
