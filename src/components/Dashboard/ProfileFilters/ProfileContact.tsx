import React, { useState } from "react";
import { useProfile } from "@/context/ProfileProvider";
import Input from "@/components/Input";
import { IProfileContact } from "@/types";

const ProfileContact: React.FC<IProfileContact> = ({
  formikUser,
  getPropsSeller,
  getPropsUser,
  formikSeller,
  edit,
}) => {
  const { userDtos } = useProfile();

  const getPropsWithLabel = (name: string, label: string) => {
    const props =
      userDtos?.role === "user" ? getPropsUser(name) : getPropsSeller(name);
    return {
      ...props,
      label,
    };
  };

  return (
    <div className="mt-2 sm:mt-0 ml-1 sm:ml-0 sm:gap-3 sm:p-4 xl:pt-10 text-primary-dark">
      {userDtos?.role === "user" ? (
        <form onSubmit={formikUser.handleSubmit}>
          <Input type="text" {...getPropsWithLabel("name", "Nombre")} />

          <Input type="text" {...getPropsWithLabel("lastname", "Apellido")} />

          <Input type="email" {...getPropsWithLabel("email", "Email")} />

          <Input type="text" {...getPropsWithLabel("dni", "DNI")} />

          {edit && (
            <button
              type="submit"
              disabled={!formikUser.isValid}
              className="bg-primary-darker absolute text-white p-2 rounded">
              Guardar Cambios
            </button>
          )}
        </form>
      ) : (
        <form onSubmit={formikSeller.handleSubmit}>
          <Input type="text" {...getPropsWithLabel("name", "Nombre")} />
          <Input type="text" {...getPropsWithLabel("lastname", "Apellido")} />
          <Input type="email" {...getPropsWithLabel("email", "Email")} />
          <Input type="text" {...getPropsWithLabel("dni", "DNI")} />
          <Input type="text" {...getPropsWithLabel("phone", "Teléfono")} />
          <Input type="text" {...getPropsWithLabel("address", "Dirección")} />
          <Input
            type="text"
            {...getPropsWithLabel("bank_account", "CVU / CBU / Alias")}
          />
          <Input
            type="text"
            {...getPropsWithLabel("social_media", "Instagram")}
          />

          {edit && (
            <button
              type="submit"
              disabled={
                userDtos?.role === "seller"
                  ? !formikSeller.isValid
                  : !formikUser.isValid
              }
              className="bg-primary-darker absolute text-white p-2 rounded">
              Guardar Cambios
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default ProfileContact;
