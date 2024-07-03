/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { use, useCallback, useEffect, useState } from "react";
import ContactForm from "./ContactForm";

export const Contact: React.FC = () => {
  return (
    <div className=" h-auto bg-primary-lighter flex flex-col lg:flex-row  justify-center items-center m-auto sm:max-w-[66%] mb-12">
      <div className="h-auto flex flex-col justify-start items-start p-5 sm:p-14 sm:space-y-1">
        <div className="flex lg:hidden w-full max-w-lg text-left innerShadowTitle text-2xl sm:text-4xl xl:text-5xl mt-8 ">
          #Visitanos
        </div>
        <div className="flex lg:hidden w-full max-w-md text-left text-secondary-darker text-m font-semibold mb-2">
          en nuestro showroom Paraná 608, 4to #10, CABA (Zona Tribunales)
        </div>
        <div className="bg-primary-light p-2 sm:p-3 rounded-lg shadow-lg w-fit sm:w-96 md:w-full max-w-md flex flex-col items-center justify-center sm:mb-10">
          <div className="sm:w-full w-60 lg:w-96 h-60 sm:h-96 md:h-96 lg:h-96 xl:h-96 bg-primary-lighter rounded-lg shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.1030640226604!2d-58.3907206248848!3d-34.60155525738289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb9f1ba83fc7%3A0xf72dae7dc7fd540e!2sEl%20Placard%20de%20Mi%20Bebot!5e0!3m2!1ses-419!2sar!4v1719767985248!5m2!1ses-419!2sar"
              style={{
                width: "100%",
                height: "100%",
                border: 0,
              }}
              loading="lazy"></iframe>
          </div>
        </div>
        <div className="hidden lg:flex w-full max-w-lg text-left innerShadowTitle text-2xl sm:text-4xl xl:text-5xl mt-12">
          #Visitanos
        </div>
        <div className="hidden lg:flex w-full max-w-md text-left text-secondary-darker text-m font-semibold">
          en nuestro showroom Paraná 608, 4to #10, CABA (Zona Tribunales)
        </div>
      </div>

      <div className="w-full sm:h-auto flex flex-col justify-end items-end pr-4 sm:pr-0 lg:pr-20 sm:space-y-1">
        <div className="w-full max-w-md text-right innerShadowTitle text-2xl sm:text-4xl xl:text-5xl">
          #Contactanos
        </div>
        <div className="w-full max-w-md text-right text-secondary-darker text-m font-semibold">
          en breve responderemos tu consulta
        </div>
        <ContactForm />
      </div>
    </div>
  );
};

//Mapa Editable
// import {
//   GoogleMap,
//   useJsApiLoader,
//   Marker,
//   InfoWindow,
// } from "@react-google-maps/api";

// const mapContainerStyle = {
//   width: "400px",
//   height: "400px",
// };

// const businessLocation = {
//   lat: -34.6015597,
//   lng: -58.3907206,
// };

// const businessDetails = {
//   name: "EL PLAC",
//   address: "Paraná 608 4to #10, C1017 Cdad. Autónoma de Buenos Aires",
//   description: "Descripción del comercio.",
//   imageUrl: "https://via.placeholder.com/150",
//   websiteUrl: "/about_us",
//   callToAction: "About Us",
// };

// const { isLoaded } = useJsApiLoader({
//   id: "google-map-script",
//   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
// });

// const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
// const [infoWindowOpen, setInfoWindowOpen] = useState(true);

// useEffect(() => {
//   handleMapLoad(mapInstance as google.maps.Map);
//   setMapInstance(mapInstance as google.maps.Map);
// }, [isLoaded, mapInstance]);

// const handleMapLoad = useCallback((map: google.maps.Map) => {
//   setMapInstance(map);
// }, []);

// const handleMapUnmount = useCallback(() => {
//   setMapInstance(null);
// }, []);

// const handleMarkerClick = () => {
//   setInfoWindowOpen(true);
// };

// const handleInfoWindowClose = () => {
//   setInfoWindowOpen(false);
// };

//  <GoogleMap
//               mapContainerStyle={mapContainerStyle}
//               center={businessLocation}
//               zoom={15}
//               onLoad={handleMapLoad}
//               onUnmount={handleMapUnmount}
//             >
//               <Marker position={businessLocation} onClick={handleMarkerClick} />
//               {infoWindowOpen && (
//                 <InfoWindow
//                   position={businessLocation}
//                   onCloseClick={handleInfoWindowClose}
//                 >
//                   <div className="bg-white rounded-lg shadow-lg">
//                     <h3 className="text-sm font-semibold text-gray-800">
//                       {businessDetails.name}
//                     </h3>
//                     <p className="text-xs text-gray-600 w-40">
//                       {businessDetails.address}
//                     </p>
//                     <p className="mt-1">
//                       <a
//                         href={businessDetails.websiteUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-500 hover:text-blue-700 text-xs"
//                       >
//                         {businessDetails.callToAction}
//                       </a>
//                     </p>
//                   </div>
//                 </InfoWindow>
//               )}
//             </GoogleMap>
