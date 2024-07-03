import Image from "next/image";
import React from "react";
import logo from "../../assets/logo.svg";
import { FaUser, FaExchangeAlt } from "react-icons/fa";



function Sidebar() {
  return (
    <div className="border border-red-500 w-32 h-96 flex flex-col items-center justify-around">
      <div>
        <Image src={logo} alt="logo" />
      </div>
      <button>
        <FaUser style={{ color: "#2f8083" }} size={24} />
      </button>
      <button>
        <FaExchangeAlt style={{ color: "#2f8083" }} size={24} />
      </button>
    </div>
  );
}

export default Sidebar;
