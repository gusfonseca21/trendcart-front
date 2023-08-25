"use client";

import { useEffect, useState } from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import lockScroll from "@/helpers/lockScroll";
import SignInModal from "@/components/auth-modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openSignIn, setOpenSignIn] = useState(false);

  useEffect(() => {
    lockScroll(openSignIn);
  }, [openSignIn]);

  return (
    <html lang='en'>
      <body className={inter.className}>
        <SignInModal openSignIn={openSignIn} setOpenSignIn={setOpenSignIn} />
        <Navbar setOpenSignIn={setOpenSignIn} />
        <main className='min-h-screen'>{children}</main>
      </body>
    </html>
  );
}
