"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import HeaderTerms from "./HeaderTerms";
import HeaderNotFound from "./HeaderNotFound";

function HeaderClient() {
  const pathname = usePathname();

  if (pathname === "/terms&conditions") {
    return <HeaderTerms />;
  } else if (
    pathname === "/about_us" ||
    pathname === "/dashboard" ||
    pathname === "/dashboard/profile" ||
    pathname === "/help" ||
    pathname === "/dashboard/changeType" ||
    pathname === "/dashboard/fairs" ||
    pathname === "/dashboard/products"
  ) {
    return null;
  } else if (pathname === "/not-found") {
    return <HeaderNotFound />;
  }
  return <Header />;
}

export default HeaderClient;
