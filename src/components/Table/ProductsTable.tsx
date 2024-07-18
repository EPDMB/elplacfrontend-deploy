/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import {
  Notification,
  IProductNotification,
  IProductRequestTableProps,
  IHandleSelectProductStatus,
  productsStatusEnum,
} from "@/types";
import {
  checkedProductRequest,
  getAllProductRequest,
  getAllUsers,
  getProductRequestById,
  updateProductStatus,
} from "@/helpers/services";
import { useAuth } from "@/context/AuthProvider";
import { Badge } from "../Badges";
import Dropdown from "../Dropdown";
import { io, Socket } from "socket.io-client";
import { URL } from "../../../envs";

const socket: Socket = io(`${URL}`, {
  withCredentials: true,
  extraHeaders: {
    "Content-Type": "application/json",
  },
});

const ProductsTable: React.FC<IProductRequestTableProps> = ({
  columns,
  detailColumns,
  activeFair,
  products,
  trigger,
  setTrigger,
}) => {
  const [details, setDetails] = useState<boolean>(false);

  const { token } = useAuth();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [productRequest, setProductRequest] = useState<Notification[]>([]);
  const [productRequestId, setProductRequestId] = useState<Notification | null>(
    null
  );
  const [triggerProducts, setTriggerProducts] = useState<boolean>(false);

  const handleDetails = async (id: string) => {
    const productRequest: Notification = await getProductRequestById(id, token);

    setProductRequestId(productRequest);
    setDetails(!details);
  };

  useEffect(() => {
    const fetchData = async () => {
      const productRequests = await getAllProductRequest(token);
      setProductRequest(productRequests);
      if (productRequestId) {
        const productRequestUpdated = await getProductRequestById(
          productRequestId?.id,
          token
        );
        setProductRequestId(productRequestUpdated);
      }
    };

    fetchData();
  }, [token, triggerProducts, setTriggerProducts, trigger, setTrigger]);

  const handleBack = () => {
    setDetails(false);
    setProductRequestId(null);
  };

  const handleSelect = async ({ id, status }: IHandleSelectProductStatus) => {
    try {
      if (!productRequestId) {
        return;
      }

      await updateProductStatus(id, status, productRequestId.id, token);

      setTriggerProducts((prev) => !prev);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const actionsOptions = [
    {
      id: productsStatusEnum.accepted,
      name: "Aceptado",
    },
    { id: productsStatusEnum.notAccepted, name: "No aceptado" },
    { id: productsStatusEnum.notAvailable, name: "No disponible" },
    {
      id: productsStatusEnum.categoryNotApply,
      name: "No corresponde categoría",
    },
    { id: productsStatusEnum.secondMark, name: "No aceptado (2da marca)" },
  ];

  const currentColumns = details ? detailColumns : columns;

  const applyLiquidation = (price: number) => {
    const discount = price * 0.25;
    const finalPrice = price - discount;
    return finalPrice;
  };

  const informSeller = async (id: string) => {
    const sellerId = id;
    const message = "Novedades en tus productos";
    const callToAction = "¡Actualiza la página!";

    socket.emit("notify-vendor", { message, sellerId, callToAction });
  };

  const checkRequest = async () => {

    if (productRequestId) {
      const notPending = productRequestId.products.every(
        (product) => product.status !== productsStatusEnum.pendingVerification
      );

      if (notPending) {
        const res = await checkedProductRequest(productRequestId?.id, token);
        if (setTrigger) {
          setTrigger(!trigger);
        }
        handleBack();
      }
    }
  };
  return (
    <>
      <table className="w-full  mb-20 text-sm text-left rtl:text-right bg-[#f1fafa]">
        <thead className="text-sm text-primary-darker uppercase  bg-[#f1fafa] border-b-primary-default border">
          <tr>
            <th scope="col" className="p-4">
              {details && (
                <div className="flex gap-2 items-center ">
                  <button onClick={handleBack}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5em"
                      height="1.5em"
                      viewBox="0 0 42 42"
                    >
                      <path
                        fill="#2F8083"
                        fillRule="evenodd"
                        d="M27.066 1L7 21.068l19.568 19.569l4.934-4.933l-14.637-14.636L32 5.933z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => checkRequest()}
                    className="bg-primary-darker hover:bg-primary-default transition m-auto text-white font-semibold p-2 rounded-lg shadow"
                  >
                    Enviar
                  </button>
                </div>
              )}
            </th>

            {currentColumns?.map((column) => (
              <th key={column.id} scope="col" className="px-5 py-3">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-[#667085] text-nowrap">
          {!details ? (
            productRequest.length !== 0 ? (
              productRequest.map(
                (product: Notification) =>
                  product.fair.id === activeFair?.id && (
                    <tr key={product.id} className="shadow-sm">
                      <th
                        scope="row"
                        className="px-5 py-4 font-medium whitespace-nowrap"
                      ></th>
                      <td className="px-5 py-4 text-primary-darker font-medium">
                        {product.seller.sku || "-"}
                      </td>
                      <td className="px-5 py-4 text-primary-darker font-medium">
                        {product.category}
                      </td>
                      <td className="px-5 py-4 text-primary-darker font-medium">
                        {product.status.toUpperCase()}
                      </td>
                      <td className="px-5 py-4 ">
                        {product.status === "pending" ? (
                          <p
                            className="text-[#344054] font-medium bg-[#D0D5DD] p-2 w-fit rounded-lg cursor-pointer"
                            onClick={() => handleDetails(product.id)}
                          >
                            Ver detalles
                          </p>
                        ) : (
                          <button
                            className="text-white font-medium bg-blue-500 p-2 w-fit rounded-lg cursor-pointer"
                            onClick={() => informSeller(product.seller.id)}
                          >
                            Informar al vendedor
                          </button>
                        )}
                      </td>
                    </tr>
                  )
              )
            ) : (
              <tr className="shadow-md bg-[#F9FAFB]">
                <td colSpan={columns && columns.length + 1} className="p-32">
                  <div className="flex flex-col gap-4 items-center justify-center">
                    <p className="font-semibold text-2xl text-primary-dark">
                      No hay solicitudes de productos
                    </p>
                  </div>
                </td>
              </tr>
            )
          ) : (
            productRequestId?.products.map((product: IProductNotification) => (
              <tr key={product.id} className="shadow-sm">
                <th
                  scope="row"
                  className="px-5 py-4 font-medium whitespace-nowrap"
                ></th>
                <td className="px-5 py-4 text-primary-darker font-medium">
                  {product.code}
                </td>
                <td className="px-5 py-4 text-primary-darker font-medium">
                  {product.category}
                </td>
                <td className="px-5 py-4 text-primary-darker font-medium">
                  {product.size}
                </td>
                <td className="px-5 py-4 text-primary-darker font-medium">
                  {product.brand}
                </td>
                <td className="px-5 py-4  text-primary-darker font-medium">
                  <div className=" flex  items-center ">
                    <p className=" overflow-hidden text-wrap w-32 overflow-ellipsis">
                      {expanded || product.description.length <= 30
                        ? product.description
                        : `${product.description.slice(0, 30)}...`}
                      {product.description.length > 30 && (
                        <button
                          className="text-white rounded-md p-1 text-xs bg-primary-dark hover:bg-primary-default cursor-pointer "
                          onClick={() => setExpanded((prev) => !prev)}
                        >
                          {expanded ? "Mostrar menos" : "Ver más"}
                        </button>
                      )}
                    </p>
                  </div>
                </td>
                <td className="px-5 py-4 text-primary-darker font-medium">
                  ${product.price}
                </td>
                <td className="px-5 py-4 text-primary-darker font-medium">
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
          )}
        </tbody>
      </table>
    </>
  );
};

export default ProductsTable;
