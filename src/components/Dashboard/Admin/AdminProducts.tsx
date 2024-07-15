"use client";
import React, { useEffect, useState } from "react";
import { Notification } from "@/types"; // Asegúrate de que la importación es correcta
import { getAllProductRequest } from "@/helpers/services";
import { useAuth } from "@/context/AuthProvider";

import ProductsTable from "@/components/Table/ProductsTable";
import { useFair } from "@/context/FairProvider";

const AdminProducts = () => {
  const { token } = useAuth();
  const { activeFair } = useFair();
  const [productRequest, setProductRequest] = useState<Notification[]>([]);
  const [trigger, setTrigger] = useState<boolean>(false);

  useEffect(() => {
    getAllProductRequest()
      .then((res) => {
        console.log(res);

        setProductRequest(res);
      })
      .catch((error) => console.error(error));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, trigger]);

  const fairProducts = productRequest.filter(
    (product) => product.fair.id === activeFair?.id
  );

  console.log(fairProducts.length);

  const sellersColumns = [
    { id: "sku", label: "SKU", sortable: true },
    { id: "category", label: "Categoria", sortable: true },
    { id: "status", label: "Estado", sortable: true },
    { id: "details", label: "Detalles", sortable: true },
  ];
  const detailsColumns = [
    { id: "code", label: "Codigo", sortable: true },
    { id: "category", label: "Categoria", sortable: true },
    { id: "size", label: "Talle", sortable: true },
    { id: "brand", label: "Marca", sortable: true },
    { id: "description", label: "Descripción", sortable: true },
    { id: "price", label: "Precio", sortable: true },
    { id: "liquidation", label: "Liquidación", sortable: true },
    { id: "states", label: "Estados", sortable: true },
  ];

  return (
    <div className="grid grid-rows-[auto_auto_1fr] grid-cols-2 mx-20 mt-8 gap-5">
      <div className="col-span-2">
        <div>
          <div className="gap-4 flex justify-end">
            <button className="bg-white flex items-center text-primary-darker gap-2 p-2 border border-[#D0D5DD] rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 256 256">
                <path
                  fill="#2F8083"
                  d="M178.34 165.66L160 147.31V208a8 8 0 0 1-16 0v-60.69l-18.34 18.35a8 8 0 0 1-11.32-11.32l32-32a8 8 0 0 1 11.32 0l32 32a8 8 0 0 1-11.32 11.32M160 40a88.08 88.08 0 0 0-78.71 48.68A64 64 0 1 0 72 216h40a8 8 0 0 0 0-16H72a48 48 0 0 1 0-96c1.1 0 2.2 0 3.29.12A88 88 0 0 0 72 128a8 8 0 0 0 16 0a72 72 0 1 1 100.8 66a8 8 0 0 0 3.2 15.34a7.9 7.9 0 0 0 3.2-.68A88 88 0 0 0 160 40"
                />
              </svg>
              Exportar
            </button>
          </div>
        </div>
        <div className="w-full mt-5 flex p-6 flex-col rounded-lg bg-[#FFFFFF]">
          <div>
            <h1 className="font-semibold text-primary-darker text-xl">
              {activeFair?.name}
            </h1>
            <div className="flex gap-6">
              <div>
                <h3 className="text-[#5E5F60] text-lg">Productos</h3>
                <span className="text-[#5E5F60] text-3xl font-bold">{1}</span>
              </div>
              <div className="border border-[#E5E9EB]"></div>
              <div>
                <h3 className="text-[#5E5F60] text-lg">Aceptados</h3>
                <span className="text-[#5E5F60] text-3xl font-bold">{1}</span>
              </div>
              <div className="border border-[#E5E9EB]"></div>
              <div>
                <h3 className="text-[#5E5F60] text-lg">No aceptados</h3>
                <span className="text-[#5E5F60] text-3xl font-bold">{1}</span>
              </div>
              <div>
                <h3 className="text-[#5E5F60] text-lg">
                  Pendiente verificación
                </h3>
                <span className="text-[#5E5F60] text-3xl font-bold">{1}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row-span-3 col-span-2">
        <ProductsTable
          columns={sellersColumns}
          productRequest={productRequest}
          detailColumns={detailsColumns}
          trigger={trigger}
          activeFair={activeFair}
          setTrigger={setTrigger}
        />
      </div>
    </div>
  );
};

export default AdminProducts;
