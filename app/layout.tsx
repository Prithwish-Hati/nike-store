import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StateContext } from "@/context/StateContext";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dash",
  description: "Ecommerce Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StateContext>
          <Toaster />
          {/* <Navbar /> */}
          {children}
        </StateContext>
      </body>
    </html>
  );
}
