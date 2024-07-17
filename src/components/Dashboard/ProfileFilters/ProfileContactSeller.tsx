import React, { useEffect } from "react";
import { useProfile } from "@/context/ProfileProvider";
import Input from "@/components/Input";
import { IProfileContact } from "@/types";

const ProfileContactSeller: React.FC<IProfileContact> = ({
  formikUser,
  getPropsUser,
  formikSeller,
  edit,
}) => {
  const { userDtos } = useProfile();

  const getPropsWithLabel = (name: string, label: string) => {
    const props = userDtos?.role === "seller" && getPropsUser(name);
    return {
      ...props,
      label,
    };
  };

  useEffect(() => {
    const formik = userDtos?.role === "seller" ? formikSeller : formikUser;

    const fieldsToCheck = ["name", "lastname", "email", "dni"];

    fieldsToCheck.forEach((field) => {
      if (formik.values[field] === "" && !formik.touched[field]) {
        formik.setFieldTouched(field, true);
        formik.setFieldError(field, "Este campo es requerido");
      }
    });
  }, [userDtos?.role, formikUser, formikSeller]);

  return (
    <div className="mt-2 sm:mt-0 ml-1 sm:ml-0 sm:gap-3 sm:p-4 xl:pt-10 text-primary-dark">
      <form onSubmit={formikUser.handleSubmit}>
        <Input type="text" {...getPropsWithLabel("name", "Nombre")} />
        <Input type="text" {...getPropsWithLabel("lastname", "Apellido")} />
        <Input type="email" {...getPropsWithLabel("email", "Email")} />
        <Input type="text" {...getPropsWithLabel("dni", "DNI")} />
        {edit && (
          <button
            type="submit"
            disabled={!formikUser.isValid}
            className="bg-primary-darker absolute text-white p-2 rounded"
          >
            Guardar Cambios
          </button>
        )}
      </form>
    </div>
  );
};

export default ProfileContactSeller;
