"use client";
import React, { useEffect, useState } from "react";
import {
  Notification,
  UserDto,
  IProductNotification,
  IProductRequestTableProps,
} from "@/types";
import { getAllUsers, getProductRequestById } from "@/helpers/services";
import { useAuth } from "@/context/AuthProvider";

const ProductsTable: React.FC<IProductRequestTableProps> = ({
  productRequest,
  columns,
  detailColumns,
  activeFair,
  trigger,
  setTrigger,
}) => {
  const [details, setDetails] = useState<boolean>(false);
  const [productRequestId, setProductRequestId] = useState<Notification | null>(
    null
  );
  console.log(productRequest);

  const handleDetails = async (id: string) => {
    const productRequest: Notification = await getProductRequestById(id);
    setProductRequestId(productRequest);
    setDetails(!details);
  };

  const handleBack = () => {
    setDetails(false);
    setProductRequestId(null);
  };

  const currentColumns = details ? detailColumns : columns;

  const applyLiquidation = (price: number) => {
    const discount = price * 0.25;
    const finalPrice = price - discount;
    return finalPrice;
  };

  return (
    <table className="w-full mb-20 text-sm text-left rtl:text-right bg-[#F9FAFB]">
      <thead className="text-sm text-primary-darker uppercase bg-[#F9FAFB] border-b-primary-default border">
        <tr>
          <th scope="col" className="p-4">
            {details && (
              <button onClick={handleBack}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 42 42">
                  <path
                    fill="#2F8083"
                    fill-rule="evenodd"
                    d="M27.066 1L7 21.068l19.568 19.569l4.934-4.933l-14.637-14.636L32 5.933z"
                  />
                </svg>
              </button>
            )}
          </th>
          {currentColumns?.map((column) => (
            <th key={column.id} scope="col" className="px-6 py-3">
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-[#667085]">
        {!details
          ? productRequest.map(
              (product: Notification) =>
                product.fair.id === activeFair?.id && (
                  <tr key={product.id} className="shadow-sm">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap"></th>
                    <td className="px-6 py-4 text-primary-darker font-medium">
                      {product.seller.sku || "-"}
                    </td>
                    <td className="px-6 py-4 text-primary-darker font-medium">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 text-primary-darker font-medium">
                      {product.status}
                    </td>
                    <td className="px-6 py-4 ">
                      <p
                        className="text-[#344054] font-medium bg-[#D0D5DD] p-2 w-fit rounded-lg cursor-pointer"
                        onClick={() => handleDetails(product.id)}>
                        Ver detalles
                      </p>
                    </td>
                  </tr>
                )
            )
          : productRequestId?.products.map((product: IProductNotification) => (
              <tr key={product.id} className="shadow-sm">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap"></th>
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
                <td className="px-6 py-4 text-primary-darker font-medium">
                  {product.status}
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  );
};

export default ProductsTable;
