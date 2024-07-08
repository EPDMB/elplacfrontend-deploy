"use client";
import { useFair } from "@/context/FairProvider";
import { useProfile } from "@/context/ProfileProvider";
import React, { useEffect, useState } from "react";
import { notify } from "../Notifications/Notifications";
import { TicketProps } from "@/types";
import Modal from "../Modal";
import { postInscription, postTicket } from "@/helpers/services";
import { useAuth } from "@/context/AuthProvider";
import PaymentsSeller from "../Payments/PaymentsSeller";
import Payments from "../Payments/PaymentsSeller";
import PaymentsUser from "../Payments/PaymentsUser";

// Función para formatear la fecha a "YYYY-MM-DD"
const formatDateToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Ticket: React.FC<TicketProps> = ({
  name,
  salesChecked,
  category,
  termsChecked,
}) => {
  const [amount, setAmount] = useState<number | string>("");
  const [charitableEntity, setCharitableEntity] = useState("");
  const { fairs, fairSelected, timeSelect, dateSelect } = useFair();
  const { token } = useAuth();
  const { userDtos } = useProfile();
  const [openModal, setOpenModal] = useState(false);

  console.log(category);

  const fairSelectedPerUser = fairs.find((f) => f.name === name);

  console.log(fairSelectedPerUser);

  const categorySelected = fairSelectedPerUser?.fairCategories.find(
    (c) => c.category.name === category
  );

  console.log(categorySelected);

  const formattedDate = dateSelect
    ? formatDateToYYYYMMDD(new Date(dateSelect))
    : null;

  useEffect(() => {
    if (fairSelectedPerUser) {
      if (
        userDtos?.role === "seller" &&
        fairSelectedPerUser.entryPriceSeller !== undefined &&
        fairSelectedPerUser.entryPriceSeller > 0
      ) {
        setAmount(fairSelectedPerUser.entryPriceSeller);
      } else if (
        userDtos?.role === "user" &&
        fairSelectedPerUser.entryPriceBuyer !== undefined &&
        fairSelectedPerUser.entryPriceBuyer > 0
      ) {
        setAmount(fairSelectedPerUser.entryPriceBuyer);
        setCharitableEntity(fairSelectedPerUser.entryDescription || "");
      } else {
        setAmount("");
        setCharitableEntity("");
      }
    } else {
      setAmount("");
      setCharitableEntity("");
    }
  }, [fairSelectedPerUser, userDtos?.role]);

  console.log(userDtos)

        console.log(fairSelectedPerUser?.id);
        console.log(userDtos?.seller?.id);
        console.log(categorySelected?.id);

  const handleBuy = () => {
    if (userDtos?.role === "seller") {
      postInscription(
        fairSelectedPerUser?.id,
        userDtos?.seller?.id,
        categorySelected?.id
      );
      setOpenModal(true);
    }
    if (userDtos?.role === "user") {
      postTicket(
        fairSelectedPerUser?.id,
        userDtos?.id,
        token,
        formattedDate,
        timeSelect
      );
      setOpenModal(true);
    }
  };

  return (
    <div className="mt-5">
      <div className="flex items-center">
        {userDtos?.role === "user" ? (
          <>
            <p className="font-bold"></p>
            {fairSelectedPerUser &&
            fairSelectedPerUser.entryPriceBuyer === 0 ? (
              <div>
                <input
                  type="text"
                  value="Sin costo"
                  readOnly
                  className="text-primary-darker bg-transparent"
                />
                <button
                  onClick={handleBuy}
                  className="mt-4 px-4 py-2 text-white rounded-md hover:bg-primary-dark focus:outline-none bg-primary-darker disabled:cursor-not-allowed disabled:bg-primary-light"
                  disabled={!fairSelectedPerUser || !dateSelect || !timeSelect}
                >
                  Adquirí tu turno
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-2">
                  <label className="font-bold"> Precio:</label>
                  <p>${amount}</p>
                </div>
                <div>
                  <label className="font-bold">Descripción</label>
                  <p>{charitableEntity}</p>
                </div>
                <div>
                  <PaymentsUser
                    userId={userDtos.id}
                    fairId={fairSelectedPerUser?.id}
                    registrationHour={timeSelect}
                    registratonDay={formattedDate}
                    handleBuy={handleBuy}
                    className="mt-4 px-4 py-2 text-white rounded-md hover:bg-primary-dark focus:outline-none bg-primary-darker disabled:cursor-not-allowed disabled:bg-primary-light"
                    disabled={
                      !fairSelectedPerUser || !dateSelect || !timeSelect
                    }
                  />
                </div>
                {/* <button
                  onClick={handleBuy}
                  className="mt-4 px-4 py-2 text-white rounded-md hover:bg-primary-dark focus:outline-none bg-primary-darker disabled:cursor-not-allowed disabled:bg-primary-light"
                  disabled={!fairSelectedPerUser || !dateSelect || !timeSelect}
                >
                  Inscribirse como usuario
                </button> */}
              </div>
            )}
          </>
        ) : (
          <div>
            <div className="mb-2">
              <p>Inscripción:</p>
              <p>${amount}</p>
            </div>
            {/* <div>
              <PaymentsSeller
                userId={userDtos?.id}
                fairId={fairSelectedPerUser?.id}
                categoryId={categorySelected?.id}
                handleBuy={handleBuy}
                className="mt-4 px-4 py-2 text-white rounded-md hover:bg-primary-dark focus:outline-none bg-primary-darker disabled:cursor-not-allowed disabled:bg-primary-light"
                disabled={
                  !fairSelectedPerUser ||
                  !salesChecked ||
                  !categorySelected ||
                  !termsChecked
                }
              />
            </div> */}
            <div>
              <button
                onClick={handleBuy}
                className="mt-4 px-4 py-2 text-white rounded-md hover:bg-primary-dark focus:outline-none bg-primary-darker disabled:cursor-not-allowed disabled:bg-primary-light"
                disabled={
                  !fairSelectedPerUser ||
                  !salesChecked ||
                  !categorySelected ||
                  !termsChecked
                }
              >
                Inscribirse como vendedor
              </button>
            </div>
          </div>
        )}
        {openModal && (
          <div>
            <Modal
              onCloseModal={() => setOpenModal(false)}
              message="Gracias por inscribirte en la Feria, en breve te confirmaremos tu participación, y pasos a seguir"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Ticket;
