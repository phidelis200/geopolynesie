import { NewStatus, PrismaClient, Role } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@geopolynesie.com" },
    update: {},
    create: {
      email: "admin@geopolynesie.com",
      name: "Admin",
      password: adminPassword,
      role: Role.ADMIN,
    },
  });

  // Create sample news
  await prisma.news.createMany({
    skipDuplicates: true,
    data: [
      {
        title: "Achèvement des relevés bathymétriques à Huahine",
        content: `<p>Géopolynésie a récemment achevé une mission d'envergure de relevés bathymétriques dans le lagon de Huahine...</p>`,
        date: new Date("2023-06-15"),
        readTime: "3 min",
        image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
        slug: "bathymetrie-huahine-2023",
        category: "Projets",
        authorId: admin.id,
        status: NewStatus.PUBLISH,
      },
      {
        title: "Nouveau partenariat avec l'Université de Polynésie Française",
        content: `<p>Géopolynésie est fière d'annoncer la signature d'un partenariat stratégique avec l'Université de Polynésie Française (UPF)...</p>`,
        date: new Date("2023-05-08"),
        readTime: "5 min",
        image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67",
        slug: "partenariat-upf-2023",
        category: "Partenariats",
        authorId: admin.id,
        status: NewStatus.PUBLISH,
      },
      {
        title: "Mission de cartographie aux Marquises",
        content: `<p>L'équipe technique de Géopolynésie vient de rentrer d'une mission de trois semaines aux îles Marquises...</p>`,
        date: new Date("2023-04-23"),
        readTime: "4 min",
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
        slug: "mission-marquises-2023",
        category: "Projets",
        authorId: admin.id,
        status: NewStatus.PUBLISH,
      },
      {
        title: "Participation au congrès international d'hydrographie",
        content: `<p>Christian Friot, directeur et fondateur de Géopolynésie, a participé au Congrès International d'Hydrographie...</p>`,
        date: new Date("2023-03-15"),
        readTime: "4 min",
        image: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151",
        slug: "congres-hydrographie-2023",
        category: "Événements",
        authorId: admin.id,
        status: NewStatus.PUBLISH,
      },
      {
        title: "Acquisition d'un nouveau sondeur multi-faisceaux",
        content: `<p>Géopolynésie est fière d'annoncer l'acquisition d'un sondeur multi-faisceaux de dernière génération...</p>`,
        date: new Date("2023-02-28"),
        readTime: "3 min",
        image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
        slug: "nouveau-sondeur-2023",
        category: "Équipements",
        authorId: admin.id,
        status: NewStatus.PUBLISH,
      },
      {
        title: "Formation sur les nouvelles normes hydrographiques",
        content: `<p>L'équipe technique de Géopolynésie vient de terminer une formation de cinq jours...</p>`,
        date: new Date("2023-01-12"),
        readTime: "3 min",
        image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
        slug: "formation-normes-2023",
        category: "Formation",
        authorId: admin.id,
        status: NewStatus.PUBLISH,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
