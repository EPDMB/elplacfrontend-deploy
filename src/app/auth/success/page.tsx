"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const AuthSuccess = () => {
  const [isClient, setIsClient] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsClient(true);

    if (isClient) {
      import("ldrs").then((module) => {
        module.ring.register();
      });

      const token = searchParams.get("token");

      if (token) {
        localStorage.setItem("token", token);
        window.opener.postMessage({ token }, "*");
        window.close();
      }
    }
  }, [isClient, searchParams]);

  if (!isClient) {
    return null;
  }

  return (
    <div>
      <div className="relative flex items-center justify-center h-full w-full bg-secondary-light">
        <div>
          <l-ring size="120" color="coral"></l-ring>
        </div>
      </div>
    </div>
  );
};

export default AuthSuccess;
