import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Actualités",
  description:
    "Suivez les dernières actualités et projets de Géopolynésie. Découvrez nos réalisations en hydrographie et topographie en Polynésie Française.",
  openGraph: {
    title: "Actualités - Géopolynésie",
    description:
      "Dernières nouvelles et projets en hydrographie et topographie",
  },
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
