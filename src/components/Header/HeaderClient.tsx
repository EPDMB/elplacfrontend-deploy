"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import HeaderTerms from "./HeaderTerms";

function HeaderClient() {
  const pathname = usePathname();

  if (pathname === "/terms&conditions") {
    return <HeaderTerms />;
  } else if (
    pathname === "/about_us" ||
    pathname === "/dashboard" ||
    pathname === "/dashboard/profile" ||
    pathname === "/help"
  ) {
    return null;
  }
  return <Header />;
}

export default HeaderClient;
