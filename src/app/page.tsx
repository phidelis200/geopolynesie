import type { Metadata } from "next";
import Clients from "@/components/home/Clients";
import Equipment from "@/components/home/Equipment";
import Gallery from "@/components/home/Gallery";
import GeographicRange from "@/components/home/GeographicRange";
import Hero from "@/components/home/Hero";
import News from "@/components/home/News";
import Partners from "@/components/home/Partners";
import Services from "@/components/home/Services";
import React from "react";

export const metadata: Metadata = {
  title: "Géopolynésie - Expert en Hydrographie et Topographie",
  description:
    "Géopolynésie - Expert en hydrographie et topographie en Polynésie Française. Découvrez nos services de cartographie marine et terrestre.",
  openGraph: {
    title: "Géopolynésie - Expert en Hydrographie et Topographie",
    description:
      "Services professionnels de cartographie marine et terrestre en Polynésie Française",
  },
};

const HomePage = () => {
  return (
    <main className="flex-grow pt-24">
      <Hero />
      <Services />
      <Equipment />
      <Partners />
      <GeographicRange />
      <Gallery />
      <Clients />
      <News />
    </main>
  );
};

export default HomePage;
