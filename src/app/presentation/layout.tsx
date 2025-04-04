import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Présentation",
  description:
    "Découvrez les services et l'expertise de Géopolynésie en matière d'hydrographie et de topographie en Polynésie Française.",
  openGraph: {
    title: "Présentation des Services - Géopolynésie",
    description: "Services professionnels d'hydrographie et de topographie",
  },
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
