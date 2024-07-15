"use client"
import React, { useState } from "react"
import Methodology from "./Methodology"
import Calendar from "./Calendar"
import Price from "./Price"
import Clothes from "./Clothes"
import Procedure from "./Procedure"
import Remuneration from "./Remuneration"
import Claim from "./Claim"

function TermsAndConditions() {
  const [activeComponent, setActiveComponent] = useState("Methodology");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Methodology": return <Methodology />;
      case "Calendar": return <Calendar />;
      case "Price": return <Price />;
      case "Clothes": return <Clothes />;
      case "Procedure": return <Procedure />;
      case "Remuneration": return <Remuneration />;
      case "Claim": return <Claim />;
      default: return <Methodology />;
    }
  };

  return (
    <div className="flex h-screen bg-secondary-lighter">
      <div className="w-1/3 bg-secondary-lighter p-10">
        <ul>
            <li
              className={`cursor-pointer py-2 ${
              activeComponent === "Methodology"
                ? "font-bold text-lg text-primary-darker"
                : "font-semibold text-primary-darker"
              }`}
              onClick={() => setActiveComponent("Methodology")}
              >
              Metodologías de venta
            </li>
            <li
              className={`cursor-pointer py-2 ${
              activeComponent === "Calendar"
                ? "font-bold text-lg text-primary-darker"
                : "font-semibold text-primary-darker"
              }`}
              onClick={() => setActiveComponent("Calendar")}
              >
            Calendario anual de recepción
            </li>
            <li
              className={`cursor-pointer py-2 ${
              activeComponent === "Price"
                ? "font-bold text-lg text-primary-darker"
                : "font-semibold text-primary-darker"
              }`}
              onClick={() => setActiveComponent("Price")}
              >
              Precios de venta referenciales
            </li>
            <li
              className={`cursor-pointer py-2 ${
              activeComponent === "Clothes"
                ? "font-bold text-lg text-primary-darker"
                : "font-semibold text-primary-darker"
              }`}
              onClick={() => setActiveComponent("Clothes")}
              >
              Selección ropa & productos
            </li>
            <li
              className={`cursor-pointer py-2 ${
              activeComponent === "Procedure"
                ? "font-bold text-lg text-primary-darker"
                : "font-semibold text-primary-darker"
              }`}
              onClick={() => setActiveComponent("Procedure")}
              >
              Procedimiento
            </li>
            <li
              className={`cursor-pointer py-2 ${
              activeComponent === "Remuneration"
                ? "font-bold text-lg text-primary-darker"
                : "font-semibold text-primary-darker"
              }`}
              onClick={() => setActiveComponent("Remuneration")}
              >
              Pago de retribuciones
            </li>
            <li
              className={`cursor-pointer py-2 ${
              activeComponent === "Claim"
                ? "font-bold text-lg text-primary-darker"
                : "font-semibold text-primary-darker"
              }`}
              onClick={() => setActiveComponent("Claim")}
              >
              Reclamos
            </li>
        </ul>
      </div>
      <div className="w-2/3 p-6 overflow-y-auto">{renderComponent()}</div>
    </div>
  );
}

export default TermsAndConditions;