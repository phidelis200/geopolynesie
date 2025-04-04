import { PrismaClient, Role } from "@prisma/client";
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
        summary:
          "Géopolynésie vient de terminer les relevés bathymétriques complets du lagon de Huahine pour le compte de la Direction des Ressources Marines.",
        content: `<p>Géopolynésie a récemment achevé une mission d'envergure de relevés bathymétriques dans le lagon de Huahine...`,
        date: new Date("2023-06-15"),
        readTime: "3 min",
        image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
        slug: "bathymetrie-huahine-2023",
        category: "Projets",
        authorId: admin.id,
      },
      {
        title: "Nouveau partenariat avec l'Université de Polynésie Française",
        summary:
          "Géopolynésie annonce un partenariat avec l'UPF pour la formation des étudiants en géographie et sciences environnementales.",
        content: `<p>Géopolynésie est fière d'annoncer la signature d'un partenariat stratégique avec l'Université de Polynésie Française (UPF)...`,
        date: new Date("2023-05-08"),
        readTime: "5 min",
        image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67",
        slug: "partenariat-upf-2023",
        category: "Partenariats",
        authorId: admin.id,
      },
      {
        title: "Mission de cartographie aux Marquises",
        summary:
          "Notre équipe s'est rendue aux îles Marquises pour une mission de cartographie terrestre et maritime de trois semaines.",
        content: `<p>L'équipe technique de Géopolynésie vient de rentrer d'une mission de trois semaines aux îles Marquises...`,
        date: new Date("2023-04-23"),
        readTime: "4 min",
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
        slug: "mission-marquises-2023",
        category: "Projets",
        authorId: admin.id,
      },
      {
        title: "Participation au congrès international d'hydrographie",
        summary:
          "Christian Friot a représenté Géopolynésie au congrès international d'hydrographie qui s'est tenu à Monaco en mars 2023.",
        content: `<p>Christian Friot, directeur et fondateur de Géopolynésie, a participé au Congrès International d'Hydrographie...`,
        date: new Date("2023-03-15"),
        readTime: "4 min",
        image: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151",
        slug: "congres-hydrographie-2023",
        category: "Événements",
        authorId: admin.id,
      },
      {
        title: "Acquisition d'un nouveau sondeur multi-faisceaux",
        summary:
          "Géopolynésie enrichit son parc d'équipements avec l'acquisition d'un sondeur multi-faisceaux de dernière génération.",
        content: `<p>Géopolynésie est fière d'annoncer l'acquisition d'un sondeur multi-faisceaux de dernière génération...`,
        date: new Date("2023-02-28"),
        readTime: "3 min",
        image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
        slug: "nouveau-sondeur-2023",
        category: "Équipements",
        authorId: admin.id,
      },
      {
        title: "Formation sur les nouvelles normes hydrographiques",
        summary:
          "L'équipe de Géopolynésie a suivi une formation sur les nouvelles normes internationales en matière d'hydrographie.",
        content: `<p>L'équipe technique de Géopolynésie vient de terminer une formation de cinq jours...`,
        date: new Date("2023-01-12"),
        readTime: "3 min",
        image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
        slug: "formation-normes-2023",
        category: "Formation",
        authorId: admin.id,
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
