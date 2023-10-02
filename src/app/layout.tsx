import './globals.css'
import React, { ReactNode } from "react";
import { Metadata } from "next";
import SessionAuthProvider from "../context/SessionAuthProvider"

export const metadata: Metadata = {
  title: "TP - AP",
  description: "TP - Argentina Programa",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
      <SessionAuthProvider>
      {children}
      </SessionAuthProvider>
      </body>
    </html>
  )
}
