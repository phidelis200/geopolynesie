import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Géopolynésie pour vos projets d'hydrographie et de topographie en Polynésie Française. Experts en cartographie marine et terrestre.",
  openGraph: {
    title: "Contactez Géopolynésie",
    description: "Experts en hydrographie et topographie à votre service",
  },
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
