"use client";

import { useEffect, useState } from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import lockScroll from "@/helpers/lockScroll";
import SignInModal from "@/components/auth-modal";
import "react-toastify/dist/ReactToastify.css";
import Toast from "@/components/ui/Toast";
import { UserContextProvider } from "@/context/UserContext";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TrendCart",
  description: "O verdadeiro Design Inteligente",
};

export default function RootLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const [openSignIn, setOpenSignIn] = useState(false);

  useEffect(() => {
    lockScroll(openSignIn);
  }, [openSignIn]);

  return (
    <html className='flex justify-center h-full' lang='en'>
      <head>
        <title>{title ? title : "TrendCart"}</title>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/favicon/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon/favicon-16x16.png'
        />
        <link rel='manifest' href='/favicon/site.webmanifest' />
        <link
          rel='mask-icon'
          color='#5bbad5'
          href='/favicon/safari-pinned-tab.svg'
        />
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#ffffff'></meta>
      </head>
      <body className={`${inter.className} h-full w-full`}>
        <UserContextProvider>
          <Toast />
          <SignInModal openSignIn={openSignIn} setOpenSignIn={setOpenSignIn} />
          <Navbar setOpenSignIn={setOpenSignIn} />
          <main className={`top-0 relative h-full`}>{children}</main>
        </UserContextProvider>
      </body>
    </html>
  );
}
