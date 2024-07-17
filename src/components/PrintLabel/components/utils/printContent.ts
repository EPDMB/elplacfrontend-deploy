import { ProductPrinter } from "./Product.type";

export const printContent = (products: ProductPrinter[]) => {
    return `
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
                            ${products.map(product => `
                                <div key=${product.id} class="product-item">
                                    <svg id="barcode-${product.id}" class="w-full h-auto mb-2"></svg>
                                    <p class="text-lg font-semibold"><strong>Marca:</strong> ${product.brand}</p>
                                    <p class="text-lg"><strong>Tamaño:</strong> ${product.size}</p>
                                    <p class="text-lg"><strong>Precio:</strong> $${product.price.toFixed(2)}</p>
                                    <hr class="border-t border-gray-300 my-2" />
                                </div>
                            `).join('')}
                        </div>
                        <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>
                        <script>
                            document.addEventListener('DOMContentLoaded', () => {
                                ${products.map(product => `
                                    JsBarcode("#barcode-${product.id}", "${product.code}", {
                                        format: "CODE128",
                                        displayValue: true
                                    });
                                `).join('')}
                                window.print();
                            });
                        </script>
                    </body>
                </html>
            `;
    
}
