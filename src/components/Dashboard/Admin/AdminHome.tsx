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
  IProductNotification,
} from "@/types";
import { getAllProducts, getAllUsers } from "@/helpers/services";
import { useAuth } from "@/context/AuthProvider";

import DataTable from "@/components/Table/DataTable";
import Dropdown from "@/components/Dropdown";
import Searchbar from "@/components/Searchbar";
import { formatDate } from "@/helpers/formatDate";
import exportToExcel from "@/helpers/exportToExcel";
import Loader from "@/components/Loader";
import { useFair } from "@/context/FairProvider";
import { io, Socket } from "socket.io-client";
import { URL } from "../../../../envs";
import Link from "next/link";
import { FaBell } from "react-icons/fa";
import { Button } from "flowbite-react";
import { useProfile } from "@/context/ProfileProvider";
import { useRouter } from "next/navigation";
import { setTime } from "react-datepicker/dist/date_utils";
import WithAuthProtect from "@/helpers/WithAuth";

const socket: Socket = io(`${URL}`, {
  withCredentials: true,
  extraHeaders: {
    "Content-Type": "application/json",
  },
});

const AdminHome = () => {
  const { fairs, activeFair } = useFair();
  const [sellerCounter, setSellerCounter] = useState<SellerRegistrations[]>([]);
  const [userCounter, setUserCounter] = useState<UserRegistrations[]>([]);
  const [requests, setRequests] = useState<WebSocketNotification[]>([]);
  const [products, setProducts] = useState<IProductNotification[]>([]);
  const [trigger, setTrigger] = useState<boolean>(false);

  const { userDtos } = useProfile();
  const { token } = useAuth();
  const router = useRouter();

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

  const sendNotification = () => {
    const sellerId = "3d9e6145-d4d8-4ffc-9900-72e7919e36a8";
    const message = "Nuevos productos aprobados";

    socket.emit("notify-vendor", { message, sellerId });
  };

  return (
    <div className="grid grid-rows-[auto_auto_1fr] grid-cols-3 mx-20 mt-8 gap-5">
      <div className="col-span-2">
        <div className="w-full mt-5 flex p-6 flex-col rounded-lg bg-[#f1fafa]">
          <div>
            {activeFair ? (
              <>
                <h1 className="font-semibold text-primary-darker text-xl">
                  {activeFair?.name || "Feria activa"}
                </h1>
                <div className="flex gap-6">
                  <div>
                    <h3 className="text-[#5E5F60] text-lg">Usuarios</h3>
                    <span className="text-[#5E5F60] text-3xl font-bold">
                      {userCounter.length || 0}
                    </span>
                  </div>
                  <div className="border border-[#E5E9EB]"></div>
                  <div>
                    <h3 className="text-[#5E5F60] text-lg">Vendedores</h3>
                    <span className="text-[#5E5F60] text-3xl font-bold">
                      {sellerCounter.length || 0}
                    </span>
                  </div>
                  <div className="border border-[#E5E9EB]"></div>
                  <div>
                    <h3 className="text-[#5E5F60] text-lg">Productos</h3>
                    <span className="text-[#5E5F60] text-3xl font-bold">
                      {products.length || 0}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-5">
                <h1 className="font-semibold text-primary-darker text-xl">
                  ¡No hay Ferias Activas! Crea una feria para comenzar...
                </h1>
                <a
                  href="/admin/fairs"
                  className="px-4 py-2 w-fit flex items-start justify-start m-auto text-white rounded-md hover:bg-primary-dark bg-primary-darker text-center"
                >
                  Ir ahora
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="col-span-1 row-span-3 mb-5">
        <div className="w-full h-full mt-5 flex p-6 flex-col rounded-lg bg-[#f1fafa]">
          <div>
            <h1 className="font-semibold text-primary-darker text-xl flex justify-end">
              <FaBell />
            </h1>
            <div className="mt-4">
              {requests.length > 0 ? (
                requests.map((request, index) => (
                  <div
                    key={index}
                    className="shadow-xl bg-[#F9FAFB] text-primary-darker flex flex-col font-semibold rounded-3xl p-4 mt-4"
                  >
                    <span className="text-sm font-normal">
                      {new Date(request.date).toLocaleString("es", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </span>
                    <h3 className="text-lg border-b border-primary-default mb-2">
                      {request.message}
                    </h3>

                    <Link href={request.actions} className="text-sm">
                      Ver detalles
                    </Link>

                    <button onClick={sendNotification} className="text-sm">
                      Aprobar
                    </button>
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
      <div className="row-span-3 mb-5 col-span-2 rounded-lg bg-[#f1fafa]">
        <div className="w-full h-full  flex p-6 flex-col">
          {fairs.length > 0 ? (
            <>
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
            </>
          ) : (
            <div className="w-full h-full pb-96">
              <h1 className="font-semibold text-primary-darker text-xl">
                No hay Ferias en el historial aún...
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WithAuthProtect({ Component: AdminHome, role: "admin" });
