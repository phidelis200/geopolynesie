import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Provider from "./provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://geopolynesie.com"),
  title: {
    default: "Géopolynésie - Expert en Hydrographie et Topographie",
    template: "%s | Géopolynésie",
  },
  description:
    "Géopolynésie - Expert en hydrographie et topographie en Polynésie Française. Services de cartographie marine, relevés bathymétriques et topographiques.",
  keywords: [
    "hydrographie",
    "topographie",
    "Polynésie Française",
    "cartographie marine",
    "bathymétrie",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Géopolynésie",
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <Provider>{children}</Provider>
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
