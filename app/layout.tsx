import { NavBar } from "@/components/NavBar";
import type { Metadata } from "next";
import { Crimson_Pro } from "next/font/google";
import "./globals.css";

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-crimson-pro",
});

export const metadata: Metadata = {
  title: "Etincelle",
  description: "Etincelle Web App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={crimsonPro.variable}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
