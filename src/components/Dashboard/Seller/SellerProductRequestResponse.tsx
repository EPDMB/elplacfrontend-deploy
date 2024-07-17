"use client";
import React, { useEffect, useState } from "react";
import {
  ProductsGettedBySellerId,
  ISellerProductRequestTableProps,
} from "@/types";
import { getProductsBySeller } from "@/helpers/services";
import { Badge } from "../../Badges";
import { useAuth } from "@/context/AuthProvider";

const SellerProductRequestResponse: React.FC<
  ISellerProductRequestTableProps
> = ({ sellerId }) => {
  const [productsGetted, setProductsGetted] = useState<
    ProductsGettedBySellerId[] | null
  >(null);
  const { token } = useAuth();

  useEffect(() => {
    const getProductsBySellerID = async () => {
      const products = await getProductsBySeller(sellerId, token);
      setProductsGetted(products);
    };

    getProductsBySellerID();
  }, [sellerId, token]);

  const detailsColumns = [
    { id: "code", label: "Codigo", sortable: true },
    { id: "description", label: "Descripción", sortable: true },
    { id: "price", label: "Precio", sortable: true },
    { id: "liquidation", label: "Liquidación", sortable: true },
    { id: "states", label: "Estados", sortable: true },
  ];

  const applyLiquidation = (price: number) => {
    const discount = price * 0.25;
    const finalPrice = price - discount;
    return finalPrice;
  };

  return (
    <table className="w-full text-sm text-left rtl:text-right bg-secondary-lighter overflow-auto">
      <thead className="text-sm text-primary-darker uppercase bg-[#F9FAFB] ">
        <tr>
          {detailsColumns?.map((column) => (
            <td key={column.id} scope="col" className="px-3 py-3 ">
              {column.label}
            </td>
          ))}
        </tr>
      </thead>
      {productsGetted && productsGetted.length > 0 ? (
        <tbody className="text-[#667085]">
          {productsGetted.map((product) => (
            <tr key={product.id} className="gap-2">
              <td className="px-3 py-1 ">
                <p className="text-[#027A48] font-medium bg-[#00ff9523] rounded-full p-1">
                  #{product.code}
                </p>
              </td>
              <td className="px-3 py-1 text-primary-darker font-medium">
                {product.description}
              </td>
              <td className="px-3 py-1 text-primary-darker font-medium">
                ${product.price}
              </td>
              <td className="px-3 py-1 text-primary-darker font-medium">
                {product.liquidation
                  ? `$${applyLiquidation(product.price)}`
                  : "No aplica"}
              </td>
              <td className="px-3 py-1 text-primary-darker font-medium">
                <Badge type={product.status} />
              </td>
            </tr>
          ))}
        </tbody>
      ) : (
        <tbody>
          <tr>
            <td
              colSpan={detailsColumns.length + 1}
              className="text-center py-4">
              ¡Ve a la pestaña de productos y comienza a cargarlos!
            </td>
          </tr>
        </tbody>
      )}
    </table>
  );
};

export default SellerProductRequestResponse;
