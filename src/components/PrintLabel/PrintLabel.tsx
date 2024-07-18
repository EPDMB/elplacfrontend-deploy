"use client";

import { use, useEffect, useState } from "react";
import PrintButton from "./components/PrintButton";
import { fetchProducts } from "./components/utils/Api";
import { ProductPrinter } from "./components/utils/Product.type";
import { printContent } from "./components/utils/printContent";
import { ISellerProductRequestTableProps, PrintLabelProps } from "@/types";
import { useAuth } from "@/context/AuthProvider";

const PrintLabel: React.FC<PrintLabelProps> = ({ sellerId }) => {
  const [productInfo, setProductInfo] = useState<ProductPrinter[] | null>(null);
  const { token } = useAuth();

  const getProductsAndPrint = async () => {
    try {
      const data = await fetchProducts(sellerId, token);
      const filteredData = data.filter(
        (product) => product.status === "accepted"
      );

      setProductInfo(filteredData);
      printLabel(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  const printLabel = (products: ProductPrinter[]) => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(printContent(products));
      printWindow.document.close();
    }
  };

  return <PrintButton onClick={getProductsAndPrint} />;
};

export default PrintLabel;
