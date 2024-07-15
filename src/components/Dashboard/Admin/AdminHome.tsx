"use client";
import React, { useEffect, useState } from "react";
import {
  profilesEnum,
  UserDto,
  DropdownOption,
  SellerRegistrations,
  UserRegistrations,
  Notification,
  WebSocketNotification,
} from "@/types";
import { getAllUsers } from "@/helpers/services";
import { useAuth } from "@/context/AuthProvider";

import DataTable from "@/components/Table/DataTable";
import Dropdown from "@/components/Dropdown";
import Searchbar from "@/components/Searchbar";
import { formatDate } from "@/helpers/formatDate";
import exportToExcel from "@/helpers/exportToExcel";
import Loader from "@/components/Loader";
import { useFair } from "@/context/FairProvider";
import { io, Socket } from "socket.io-client";

const socket: Socket = io("https://myapp-backend-latest.onrender.com", {
  withCredentials: true,
  extraHeaders: {
    "Content-Type": "application/json",
  },
});

const AdminProfiles = () => {
  const { fairs, activeFair } = useFair();
  const [sellerCounter, setSellerCounter] = useState<SellerRegistrations[]>([]);
  const [userCounter, setUserCounter] = useState<UserRegistrations[]>([]);
  const [requests, setRequests] = useState<WebSocketNotification[]>([]);

  console.log(requests);
  console.log("fairs", fairs);
  console.log("activeFair", activeFair);

  useEffect(() => {
    socket.on("admin-notification", (notification: WebSocketNotification) => {
      setRequests((prev) => [...prev, notification]);
    });

    return () => {
      socket.off("admin-notification");
    };
  }, []);

  useEffect(() => {
    if (activeFair) {
      const sellers = activeFair.sellerRegistrations;
      const users = activeFair.userRegistrations;

      setSellerCounter(sellers);
      setUserCounter(users);
    }
  }, [activeFair]);

  return (
    <div className="grid grid-rows-[auto_auto_1fr] grid-cols-3 mx-20 mt-8 gap-5">
      <div className="col-span-2">
        <div className="w-full mt-5 flex p-6 flex-col rounded-lg bg-[#FFFFFF]">
          <div>
            <h1 className="font-semibold text-primary-darker text-xl">
              {activeFair?.name}
            </h1>
            <div className="flex gap-6">
              <div>
                <h3 className="text-[#5E5F60] text-lg">Usuarios</h3>
                <span className="text-[#5E5F60] text-3xl font-bold">
                  {userCounter.length}
                </span>
              </div>
              <div className="border border-[#E5E9EB]"></div>
              <div>
                <h3 className="text-[#5E5F60] text-lg">Vendedores</h3>
                <span className="text-[#5E5F60] text-3xl font-bold">
                  {sellerCounter.length}
                </span>
              </div>
              <div className="border border-[#E5E9EB]"></div>
              <div>
                <h3 className="text-[#5E5F60] text-lg">Productos</h3>
                <span className="text-[#5E5F60] text-3xl font-bold">
                  {userCounter.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1 row-span-3 mb-5">
        <div className="w-full h-full mt-5 flex p-6 flex-col rounded-lg bg-[#FFFFFF]">
          <div>
            <h1 className="font-semibold text-primary-darker text-xl">
              NOTIFICACIONES
            </h1>
            <div className="mt-4">
              {requests.length > 0 ? (
                requests.map((request, index) => (
                  <div
                    key={index}
                    className="shadow-lg bg-[#F9FAFB] flex flex-col font-semibold rounded-xl p-4 mt-4"
                  >
                    <h3 className="text-[#5E5F60] text-lg border-b border-primary-default mb-2">
                      {request.message}
                    </h3>
                    <span className="text-[#5E5F60] text-lg font-normal">
                      {request.product.pRequestId}
                    </span>
                    <span className="text-[#5E5F60] text-lg font-normal">
                      {request.product.sellerId}
                    </span>
                    <span className="text-[#5E5F60] text-lg font-normal">
                      {request.product.status}
                    </span>
                    <button>Ver detalles</button>
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
      <div className="row-span-3 mb-5 col-span-2 rounded-lg bg-[#FFFFFF]">
        <div className="w-full h-full  flex p-6 flex-col">
          <h1 className="font-semibold text-primary-darker text-xl">
            Historial de ferias
          </h1>
          {fairs.map((fair) => (
            <div
              key={fair.id}
              className="shadow-lg flex flex-col font-semibold rounded-lg p-4 mt-4"
            >
              <h3 className="text-[#5E5F60] text-lg border-b border-primary-default mb-2">
                {fair.name}
              </h3>
              <span className="text-[#5E5F60] text-lg font-normal">
                {fair.sellerRegistrations.length} vendedores
              </span>
              <span className="text-[#5E5F60] text-lg font-normal">
                {fair.userRegistrations.length} usuarios
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProfiles;
