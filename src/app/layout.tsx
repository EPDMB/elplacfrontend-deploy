import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import "./globals.css";

import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthProvider";
import HeaderClient from "@/components/Header/HeaderClient";
import { ToastContainer } from "react-toastify";
import { ProfileImageProvider } from "@/context/ProfileProvider";
import { FairProvider } from "@/context/FairProvider";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ELPLAC",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <AuthProvider>
          <FairProvider>
            <ProfileImageProvider>
              <HeaderClient />
              {children}
              <Footer />
            </ProfileImageProvider>
          </FairProvider>
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}
