"use client";
import React, { useEffect, useState } from "react";
import { profilesEnum, UserDto, DropdownOption } from "@/types";
import { getAllUsers } from "@/helpers/services";
import { useAuth } from "@/context/AuthProvider";

import DataTable from "@/components/Table/DataTable";
import Dropdown from "@/components/Dropdown";
import Searchbar from "@/components/Searchbar";
import { formatDate } from "@/helpers/formatDate";
import exportToExcel from "@/helpers/exportToExcel";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { useProfile } from "@/context/ProfileProvider";
import WithAuthProtect from "@/helpers/WithAuth";

const AdminProfiles = () => {
  const { token } = useAuth();

  const [users, setUsers] = useState<UserDto[]>([]);
  const [usersFiltered, setUsersFiltered] = useState<UserDto[]>([]);
  const [trigger, setTrigger] = useState<boolean>(false);

  useEffect(() => {
    getAllUsers(token)
      .then((res) => {
        setUsers(res);
        setUsersFiltered(res);
      })
      .catch((error) => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, trigger]);

  const admins = users.filter((user) => user.role === profilesEnum.admin);
  const sellers = users.filter((user) => user.role === profilesEnum.seller);
  const buyers = users.filter((user) => user.role === profilesEnum.user);

  const [profilesTypes, setProfilesTypes] = useState<DropdownOption>({
    id: "",
    name: "Todos",
  });

  const [states, setStates] = useState<DropdownOption>({
    id: "",
    name: "Todos",
  });

  const profileArray = [
    { id: "", name: "Administrador" },
    { id: "", name: "Vendedor" },
    { id: "", name: "Usuario" },
    { id: "", name: "Todos" },
  ];

  const stateArray = [
    { id: "", name: "Activo" },
    { id: "", name: "Inactivo" },
    { id: "", name: "Bloqueado" },
    { id: "", name: "Todos" },
  ];

  const profilesColumns = [
    { id: "sku", label: "SKU", sortable: true },
    { id: "rol", label: "Rol", sortable: true },
    { id: "perfil", label: "Perfil", sortable: true },
    { id: "fecha alta", label: "Fecha alta", sortable: true },
    { id: "estado", label: "Estado", sortable: true },
    { id: "acciones", label: "Acciones", sortable: false },
  ];

  const handleExport = () => {
    const filename = "usuarios.xlsx";
    const data = usersFiltered.map((user) => ({
      SKU: user.seller?.sku || "-",
      Rol: user.role,
      Nombre: `${user.name} ${user.lastname}`,
      FechaAlta: user.registration_date
        ? formatDate(new Date(user.registration_date))
        : "",
      Estado: user.statusGeneral,
    }));

    exportToExcel(data, "Usuarios", filename);
  };

  const handleTypeSelect = (option: DropdownOption) => {
    setProfilesTypes(option);
  };

  const handleStateSelect = (option: DropdownOption) => {
    setStates(option);
  };

  return (
    <div className="grid grid-rows-[auto_auto_1fr] grid-cols-2 mx-20 mt-8 gap-5">
      <div className="col-span-2">
        <div>
          <div className="gap-4 flex justify-end">
            <Searchbar setUsersFiltered={setUsersFiltered} users={users} />
            <button
              onClick={handleExport}
              className="bg-white flex items-center text-primary-darker gap-2 p-2 border border-[#D0D5DD] rounded-lg"
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
            <h1 className="font-semibold text-primary-darker text-xl">
              ELPLAC
            </h1>
            <div className="flex gap-6">
              <div>
                <h3 className="text-[#5E5F60] text-lg">Usuarios</h3>
                <span className="text-[#5E5F60] text-3xl font-bold">
                  {buyers.length}
                </span>
              </div>
              <div className="border border-[#E5E9EB]"></div>
              <div>
                <h3 className="text-[#5E5F60] text-lg">Vendedores</h3>
                <span className="text-[#5E5F60] text-3xl font-bold">
                  {sellers.length}
                </span>
              </div>
              <div className="border border-[#E5E9EB]"></div>
              <div>
                <h3 className="text-[#5E5F60] text-lg">Administradores</h3>
                <span className="text-[#5E5F60] text-3xl font-bold">
                  {admins.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row-span-1 col-span-1 flex items-center gap-8">
        <div className="flex items-center gap-8">
          <h3 className="text-primary-dark font-semibold text-xl">Rol</h3>
          <Dropdown
            value={profilesTypes?.name}
            options={profileArray}
            onSelect={handleTypeSelect}
            className="z-10 w-60 "
            bg="bg-[#F9FAFB]"
          />
        </div>
        <div className="flex items-center gap-4">
          <h3 className="text-primary-dark font-semibold text-xl">Estado</h3>
          <Dropdown
            value={states?.name}
            options={stateArray}
            onSelect={handleStateSelect}
            className="w-60"
            bg="bg-[#F9FAFB]"
          />
        </div>
      </div>
      <div className="row-span-3 col-span-2">
        <DataTable
          profiles={profilesTypes}
          columns={profilesColumns}
          state={states}
          usersFiltered={usersFiltered}
          trigger={trigger}
          setTrigger={setTrigger}
        />
      </div>
    </div>
  );
};

export default WithAuthProtect({ Component: AdminProfiles, role: "admin" });
