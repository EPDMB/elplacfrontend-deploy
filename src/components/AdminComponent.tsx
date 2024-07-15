
//! NO BORRAR. PENDIENTE.

// "use client";
// import {
//   Notification,
//   NotificationFromBack,
//   productsStatusColorEnum,
//   ProductStatus,
// } from "@/types";
// import { useEffect, useState } from "react";
// import io, { Socket } from "socket.io-client";
// import { URL } from "../../envs";
// import { getAllProductRequest, updateProductStatus } from "@/helpers/services";

// const socket: Socket = io("http://localhost:3000", {
//   withCredentials: true,
//   extraHeaders: {
//     "Content-Type": "application/json",
//   },
// });

// const AdminComponent: React.FC = () => {
//   const [requests, setRequests] = useState<Notification[]>([]);
//   const [requestGetted, setRequestGetted] = useState<NotificationFromBack[]>(
//     []
//   );
//   const [notification, setNotification] = useState<string>("");
//   const [productsReq, setProductsReq] = useState<any[]>([]);
//   const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
//     null
//   );
//   const [showNotifyButton, setShowNotifyButton] = useState<boolean>(false);
//   const [sellerId, setSellerId] = useState<string | null>(null);

//   useEffect(() => {
//     socket.on("admin-notification", (notification: Notification) => {
//       setRequests((prev) => [...prev, notification]);
//     });

//     return () => {
//       socket.off("admin-notification");
//     };
//   }, []);

//   useEffect(() => {
//     const getProductRequest = async () => {
//       try {
//         const res = await getAllProductRequest();
//         setRequestGetted(res);
//       } catch (error) {
//         console.error("Error fetching product requests:", error);
//       }
//     };
//     getProductRequest();
//   }, []);

//   const handleGetProducts = async (productReqId: string) => {
//     try {
//       const res = await fetch(`${URL}/product-request/${productReqId}`);
//       if (res.ok) {
//         const data = await res.json();
//         console.log(data);
//         setProductsReq(data.products);
//         setSelectedRequestId(productReqId);
//         setShowNotifyButton(false);
//         setSellerId(data.seller.id);
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const handleResponse = async (
//     productId: string,
//     status: productsStatusColorEnum
//   ) => {
//     if (!selectedRequestId) {
//       console.error("No request ID selected");
//       return;
//     }

//     const res = await updateProductStatus(productId, status, selectedRequestId);

//     if (res.ok) {
//       const updatedProduct = await res.json();
//       setRequests((prev) =>
//         prev.filter((req) => req.product?.id !== productId)
//       );
//       setShowNotifyButton(true);
//     }
//   };

//   const sendNotification = () => {
//     console.log(sellerId);
//     const message =
//       "Se ha revisado tu solicitud de productos. ¡Chequea la pestaña resumen!";

//     socket.emit("notify-vendor", { sellerId, message });

//     setNotification("");
//     setShowNotifyButton(false);
//   };

//   return (
//     <div>
//       <h1>Admin Panel</h1>
//       <ul>
//         <li>
//           <h2>Product Requests From WebSocket</h2>
//         </li>
//         {requests.map((req, index) => (
//           <li key={index}>
//             {req.message}
//             {req.product && (
//               <>
//                 <span>
//                   {req.product.sellerId} - {req.product.pRequestId}
//                 </span>
//                 <button
//                   onClick={() =>
//                     req.product?.pRequestId &&
//                     handleGetProducts(req.product.pRequestId)
//                   }
//                 >
//                   Ver detalles
//                 </button>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//       <ul>
//         <li>
//           <h2>Product Requests From Back</h2>
//         </li>
//         {requestGetted.map((req, index) => (
//           <li key={index}>
//             {req.message}
//             {req.id && (
//               <>
//                 <span>
//                   {req.category} - {req.status}
//                 </span>
//                 <button onClick={() => req.id && handleGetProducts(req.id)}>
//                   Ver detalles
//                 </button>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//       <div>
//         {productsReq.length > 0 && (
//           <div>
//             <h2>Product Details</h2>
//             {productsReq.map((product) => (
//               <div key={product.id}>
//                 <p>Marca: {product.brand}</p>
//                 <p>Descripcion: {product.description}</p>
//                 <p>Precio: {product.price}</p>
//                 <p>Talle: {product.size}</p>
//                 <p>Código: {product.code}</p>
//                 <p>Categoria: {product.category}</p>
//                 <p>Liquidación: {product.liquidation}</p>
//                 <p>
//                   Estado:{" "}
//                   <span style={{ color: product.statusColor }}>
//                     {product.status}
//                   </span>
//                 </p>
//                 <select
//                   onChange={(e) => {
//                     handleResponse(
//                       product.id,
//                       e.target.value as productsStatusColorEnum
//                     );
//                     setShowNotifyButton(true);
//                   }}
//                 >
//                   {Object.values(productsStatusColorEnum).map((color) => (
//                     <option key={color} value={color}>
//                       {color}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             ))}
//             {showNotifyButton && (
//               <button onClick={sendNotification}>Informar al Vendedor</button>
//             )}
//           </div>
//         )}
//       </div>
//       <input
//         type="text"
//         value={notification}
//         onChange={(e) => setNotification(e.target.value)}
//         placeholder="Enter notification"
//       />
//     </div>
//   );
// };

// export default AdminComponent;
