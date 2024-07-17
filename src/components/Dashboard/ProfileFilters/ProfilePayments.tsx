import Input from "@/components/Input";
import { useProfile } from "@/context/ProfileProvider";
import { IProfilePayments } from "@/types";
import React, { useEffect } from "react";

const ProfilePayments: React.FC<IProfilePayments> = ({
  formikSellerPayments,
  editSeller,
  getPropsSellerPayments,
  formikSeller,
}) => {
  const { userDtos } = useProfile();

  const getPropsWithLabel = (name: string, label: string) => {
    const props = userDtos?.role === "seller" && getPropsSellerPayments(name);
    return {
      ...props,
      label,
      onChange: formikSellerPayments.handleChange,
      onBlur: formikSellerPayments.handleBlur,
      value: formikSellerPayments.values[name],
    };
  };

  useEffect(() => {


    const formik = userDtos?.role === "seller" && formikSellerPayments;

    const fieldsToCheck = ["bank_account", "phone", "address", "social_media"];

    fieldsToCheck.forEach((field) => {


      if (formik.values[field].trim() === "" && !formik.touched[field]) {
        formik.setFieldTouched(field, true);
        formik.setFieldError(field, "Este campo es requerido");
      }
    });
  }, [userDtos?.role, formikSellerPayments, formikSeller]);


  return (
    <div className="mt-2 sm:mt-0 ml-1 sm:ml-0 sm:gap-3 sm:p-4 xl:pt-10 text-primary-dark">
      <form onSubmit={formikSellerPayments.handleSubmit}>
        <Input type="text" {...getPropsWithLabel("phone", "Teléfono")} />
        <Input type="text" {...getPropsWithLabel("address", "Dirección")} />
        <Input
          type="text"
          {...getPropsWithLabel("social_media", "Instagram")}
        />
        <Input
          type="text"
          {...getPropsWithLabel("bank_account", "CVU / CBU / Alias")}
        />
        {editSeller && (
          <button
            type="submit"
            disabled={!formikSellerPayments.isValid}
            className="bg-primary-darker absolute text-white p-2 rounded"
          >
            Guardar Cambios
          </button>
        )}
      </form>
    </div>
  );
};

export default ProfilePayments;
