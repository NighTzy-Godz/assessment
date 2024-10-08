import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShopmeFy",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <Toaster
            duration={2000}
            richColors
            position="top-center"
            toastOptions={{
              className: "font-gelionReg text-lg",
            }}
          />
          <Navbar />

          <main>{children}</main>
        </body>
      </html>
    </AuthProvider>
  );
}
