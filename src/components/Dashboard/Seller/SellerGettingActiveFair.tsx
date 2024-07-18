"use client";
import Dropdown from "@/components/Dropdown";
import React, { useEffect, useState } from "react";
import {
  ProductsGettedBySellerId,
  SellerGettingActiveFairProps,
} from "@/types";
import { useFair } from "@/context/FairProvider";
import { useAuth } from "@/context/AuthProvider";
import { getProductsBySeller } from "@/helpers/services";
import { useProfile } from "@/context/ProfileProvider";

const SellerGettingActiveFair: React.FC<SellerGettingActiveFairProps> = ({
  sellerId,
}) => {
  const { activeFair } = useFair();
  const { token } = useAuth();
  const { sellerDtos } = useProfile();
  const [productsGetted, setProductsGetted] = useState<
    ProductsGettedBySellerId[] | null
  >(null);

  useEffect(() => {
    const getProductsBySellerID = async () => {
      const products = await getProductsBySeller(sellerId, token);
      setProductsGetted(products);
    };

    getProductsBySellerID();
  }, [sellerId, token]);

  const handleSelect = async () => {}; //pendiente de agregar última opinion de la empresa

  const acceptedProducts =
    productsGetted?.filter(
      (product) =>
        product.status === "accepted" ||
        product.status === "sold" ||
        product.status === "unsold" ||
        product.status === "soldOnClearance"
    ) || [];
  const acceptedProductCount = acceptedProducts.length;

 

    const soldProducts =
      productsGetted?.filter((product) => product.status === "sold") || [];
    const soldProductsCount = soldProducts.length;

    const soldProductSum = soldProducts.reduce(
      (sum, product) => sum + product.price,
      0
    );

  const applyLiquidation = (price: number) => {
    const discount = price * 0.25;
    const finalPrice = price - discount;
    return finalPrice;
  };

  const acceptedLiquidationSum = acceptedProducts
    .filter((product) => product.liquidation && product.status === "accepted")
    .reduce((sum, product) => sum + applyLiquidation(product.price), 0);

  return (
    <div className="bg-secondary-lighter flex flex-col gap-4">
      <h1 className="font-semibold text-primary-darker text-3xl">
        {activeFair?.name}
      </h1>
      <div className="text-primary-darker font-medium flex flex-row gap-4">
        <div className="flex flex-col">
          <div className="flex gap-2">
            <p>Productos aceptados:</p> <span>{acceptedProductCount}</span>
          </div>
  
          <div className="flex gap-2">
            <p>Productos Vendidos:</p> <span>{soldProductsCount}</span>
          </div>
          <div className="flex gap-2">
            <p>Total:</p> <span>${soldProductSum}</span>
          </div>
          <div className="flex gap-2">
            <p>Liquidacion:</p> <span>${acceptedLiquidationSum}</span>
          </div>
        </div>
        {activeFair?.id === sellerDtos?.registrations && (
          <div className="flex flex-col ml-5">
          <p>Opciones para los productos no aceptados/no vendidos:</p>
          <Dropdown
            options={[
              {
                id: "",
                name: "Retiro",
              },
              { id: "", name: "Donación" },
            ]}
            value="Elige una opción"
            onSelect={handleSelect}
            className="w-40"
            />
        </div>
          )}
      </div>
    </div>
  );
};

export default SellerGettingActiveFair;
