"use client";
import { useProfile } from "@/context/ProfileProvider";
import { StepProps } from "@/types";
import React from "react";
import { FaChevronRight } from "react-icons/fa";


const SellerData: React.FC<StepProps> = ({ setVisibleStep }) => {
  const { userDtos, sellerDtos } = useProfile();

  return (
    <div className="bg-secondary-lighter rounded-md max-h-full min-h-[50vh] max-w-full min-w-[50%] shadow-lg font-semibold text-primary-dark p-10 overflow-auto">
      <div className="bg-secondary-lighter rounded-md max-h-full min-h-[40vh] max-w-full min-w-[40%] shadow-lg font-semibold text-primary-dark p-5 overflow-auto">
        <div className="space-y-2">
          <h4 className="mb-5">MIS DATOS</h4>
          <div className="flex justify-between border-t border-primary-lighter">
            <p>Nombre:</p>
            <p className="text-gray-400 font-normal cursor-default">
              {userDtos?.name}
            </p>
          </div>
          <div className="flex justify-between border-t border-primary-lighter">
            <p>Apellido:</p>
            <p className="text-gray-400 font-normal cursor-default">
              {userDtos?.lastname}
            </p>
          </div>
          <div className="flex justify-between border-t border-primary-lighter">
            <p>SKU:</p>
            <p className="text-gray-400 font-normal cursor-default">
              {userDtos?.seller?.sku}
            </p>
          </div>
          <div className="flex justify-between border-t border-primary-lighter">
            <p>Feria Actual:</p>
            <p className="text-gray-400 font-normal cursor-default">
              {userDtos?.seller?.registrations?.[0]?.fair?.name}
            </p>
          </div>
          <div className="flex justify-between border-t border-primary-lighter">
            <p>Categoría:</p>
            <p className="text-gray-400 font-normal cursor-default">
              {
                userDtos?.seller?.registrations?.[0]?.categoryFair?.category
                  ?.name
              }
            </p>
          </div>
          <div className="flex justify-between border-t border-primary-lighter">
            <p>Participa de la liquidación:</p>
            <p className="text-gray-400 font-normal cursor-default">
              {sellerDtos?.liquidation ? "Sí" : "No"}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex items-end justify-end mt-5">
        <button
          onClick={() => setVisibleStep("PRODUCTOS")}
          className=" flex justify-center items-center w-10 h-10 p-2 rounded-full border border-primary-dark text-primary-dark"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default SellerData;
