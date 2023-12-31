import Navbar from "@/components/navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import RootProvider from "./providers";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NewOp.",
  description: "New opportunity for you.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="">
      <body className="bg-gradient-to-b from-black to-dark-blue bg-cover">
        <RootProvider>
          <Navbar />
          <Toaster />
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
