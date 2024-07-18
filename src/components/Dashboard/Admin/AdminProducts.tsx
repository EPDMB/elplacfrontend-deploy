"use client";
import React, { useEffect, useState } from "react";
import {
  IProductNotification,
  Notification,
  productsStatusEnum,
} from "@/types";
import { getAllProductRequest, getAllProducts } from "@/helpers/services";
import { useAuth } from "@/context/AuthProvider";
import ProductsTable from "@/components/Table/ProductsTable";
import { useFair } from "@/context/FairProvider";

import WithAuthProtect from "@/helpers/WithAuth";
import { formatDate } from "@/helpers/formatDate";
import exportToExcel from "@/helpers/exportToExcel";

const AdminProducts = () => {
  const { token } = useAuth();
  const { activeFair } = useFair();

  const [products, setProducts] = useState<IProductNotification[]>([]);

  const [trigger, setTrigger] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const allProducts = await getAllProducts(token);
      setProducts(allProducts);
    };
    fetchData();
  }, [token, trigger, setTrigger, activeFair?.id]);

  
  const totalProducts = products.length || 0;
  const acceptedProducts = products.filter(
    (product) => product.status === productsStatusEnum.accepted
  ).length;
  const rejectedProducts = products.filter(
    (product) =>
      product.status === productsStatusEnum.notAccepted ||
      product.status === productsStatusEnum.secondMark ||
      product.status === productsStatusEnum.categoryNotApply ||
      product.status === productsStatusEnum.notAvailable
  ).length;
  const pendingProducts = products.filter(
    (product) => product.status === "pendingVerification"
  ).length;

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

    { id: "actions", label: "Acciones", sortable: true },
  ];

  return (
    <div className="grid grid-rows-[auto_auto_1fr] grid-cols-2 mx-20 mt-8 gap-5">
      <div className="col-span-2">
        <div className="w-full mt-5 flex p-6 flex-col rounded-lg bg-[#f1fafa]">
          <div>
            <h1 className="font-semibold text-primary-darker text-3xl">
              {activeFair?.name}
            </h1>
            <div className="flex gap-6">
              <div>
                <h3 className="text-[#5E5F60] text-lg">Productos</h3>
                <span className="text-[#5E5F60] text-3xl font-bold">
                  {totalProducts}
                </span>
              </div>
              <div className="border border-[#E5E9EB]"></div>
              <div>
                <h3 className="text-[#5E5F60] text-lg">Aceptados</h3>
                <span className="text-[#5E5F60] text-3xl font-bold">
                  {acceptedProducts}
                </span>
              </div>
              <div className="border border-[#E5E9EB]"></div>
              <div>
                <h3 className="text-[#5E5F60] text-lg">No aceptados</h3>
                <span className="text-[#5E5F60] text-3xl font-bold">
                  {rejectedProducts}
                </span>
              </div>
              <div>
                <h3 className="text-[#5E5F60] text-lg">
                  Pendiente verificación
                </h3>
                <span className="text-[#5E5F60] text-3xl font-bold">
                  {pendingProducts}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="row-span-3 col-span-2 h-[30rem] bg-[#f1fafa] w-full 
       overflow-y-auto"
      >
        <ProductsTable
          columns={sellersColumns}
          detailColumns={detailsColumns}
          trigger={trigger}
          products={products}
          activeFair={activeFair}
          setTrigger={setTrigger}
        />
      </div>
    </div>
  );
};

export default WithAuthProtect({ Component: AdminProducts, role: "admin" });
