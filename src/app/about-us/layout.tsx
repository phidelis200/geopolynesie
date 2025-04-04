import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À Propos",
  description:
    "Découvrez l'histoire, l'équipe et les valeurs de Géopolynésie. Plus de 15 ans d'expertise en hydrographie et topographie en Polynésie Française.",
  openGraph: {
    title: "À Propos de Géopolynésie",
    description:
      "Une référence en hydrographie et topographie depuis 2005 en Polynésie Française",
  },
};
export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
