"use client"
import React, { useState } from "react";
import Methodology from "./Methodology";
import Calendar from "./Calendar"
import Price from "./Price"

function TermsAndConditions() {
  const [activeComponent, setActiveComponent] = useState("Methodology");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Methodology": return <Methodology />;
      case "Calendar": return <Calendar />;
      case "Price": return <Price />;
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
        </ul>
      </div>
      <div className="w-2/3 p-6 overflow-y-auto">{renderComponent()}</div>
    </div>
  );
}

export default TermsAndConditions;