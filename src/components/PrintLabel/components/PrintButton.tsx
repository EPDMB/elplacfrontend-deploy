"use client";

import React from "react";
import { printLabelStyles } from "../styles/PrintLabel.styles";

type PrintButtonProps = {
    onClick: () => void;
}

const PrintButton: React.FC<PrintButtonProps> = ({ onClick }) => {
    return (
        <button className={printLabelStyles.buttonPrimary} onClick={onClick}>
            Imprimir Etiquetas
        </button>
    );
}

export default PrintButton;
