"use client";
import { useState, useEffect } from "react";
import JsBarcode from "jsbarcode";
import { useAuth } from "@/context/AuthProvider";

type Product = {
  id: string;
  brand: string;
  description: string;
  price: number;
  size: string;
  photoUrl: string;
  liquidation: boolean;
  code: string;
  status: string;
  category: string;
};

export default function PrintLabel() {
  const [productInfo, setProductInfo] = useState<Product[] | null>(null);
  const { token } = useAuth();

  const getProducts = async (sellerId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3002/products/seller/${sellerId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error fetching products");
      }
      const data: Product[] = await response.json();
      setProductInfo(data);

      printLabel(data);
    } catch (error) {
      console.error(error);
    }
  };

  const printLabel = (products: Product[]) => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      const printContent = `
                <html>
                    <head>
                        <title>Print Label</title>
                        <style>
                            @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
                            hr { border: 0; border-top: 1px solid #ccc; }
                            .product-list { display: flex; flex-wrap: wrap; }
                            .product-item { margin-right: 20px; margin-bottom: 20px; page-break-inside: avoid; padding: 16px; border: 1px solid #d1d5db; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); background-color: #ffffff; }
                            svg { width: 100%; height: auto; margin-bottom: 8px; }
                            .product-item p { margin: 0; }
                            .product-item strong { font-weight: 600; }
                            .product-item hr { margin: 8px 0; }
                        </style>
                    </head>
                    <body class="font-sans">
                        <div class="product-list">
                            ${products
                              .map(
                                (product) => `
                                <div key=${product.id} class="product-item">
                                    <svg id="barcode-${
                                      product.id
                                    }" class="w-full h-auto mb-2"></svg>
                                    <p class="text-lg font-semibold"><strong>Marca:</strong> ${
                                      product.brand
                                    }</p>
                                    <p class="text-lg"><strong>Tamaño:</strong> ${
                                      product.size
                                    }</p>
                                    <p class="text-lg"><strong>Precio:</strong> $${product.price.toFixed(
                                      2
                                    )}</p>
                                    <hr class="border-t border-gray-300 my-2" />
                                </div>
                            `
                              )
                              .join("")}
                        </div>
                        <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>
                        <script>
                            document.addEventListener('DOMContentLoaded', () => {
                                ${products
                                  .map(
                                    (product) => `
                                    JsBarcode("#barcode-${product.id}", "${product.code}", {
                                        format: "CODE128",
                                        displayValue: true
                                    });
                                `
                                  )
                                  .join("")}
                                window.print();
                            });
                        </script>
                    </body>
                </html>
            `;
      printWindow.document.write(printContent);
      printWindow.document.close();
    }
  };

  return (
    <button
      onClick={() => getProducts("dbefb034-9c9b-474d-9645-a415ecd6ba9e")}
      className="bg-primary-default text-white py-2 px-4 rounded-md shadow-customLeft hover:bg-primary-dark"
    >
      Imprimir Etiquetas
    </button>
  );
}
