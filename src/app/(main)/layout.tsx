import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
