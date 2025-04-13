import React from "react";
import {
  ArrowRight,
  Anchor,
  Map,
  Compass,
  Ruler,
  FileText,
  Waves,
} from "lucide-react";
import Link from "next/link";

const Services = () => {
  const services = [
    {
      title: "Hydrographie",
      description:
        "Levés bathymétriques de précision, cartographie des fonds marins et études hydrographiques pour la navigation maritime.",
      icon: <Anchor size={40} className="text-ocean-500" />,
      link: "/services#hydrographie",
    },
    {
      title: "Topographie",
      description:
        "Relevés topographiques terrestres, modélisations 3D et cartographie précise pour projets d'aménagement et de construction.",
      link: "/services#topographie",
    },
    {
      title: "Cartographie",
      description:
        "Production de cartes marines, terrestres et documents nautiques conformes aux standards internationaux.",
      icon: <FileText size={40} className="text-ocean-500" />,
      link: "/services#cartographie",
    },
    {
      title: "Géodésie",
      description:
        "Établissement de réseaux géodésiques, mesures GPS/GNSS et référencement spatial de haute précision.",
      icon: <Ruler size={40} className="text-ocean-500" />,
      link: "/services#geodesie",
    },
    {
      title: "Courantologie",
      description:
        "Mesures et analyses des courants marins à l’aide de profileurs acoustiques pour comprendre les dynamiques océaniques.",
      icon: <Compass size={40} className="text-ocean-500" />,
      link: "/services#courantologie",
    },
    {
      title: "Marégraphie",
      description:
        "Études de marées, mesures de niveaux d'eau et modélisation des marées.",
      icon: <Waves size={40} className="text-ocean-500" />,
      link: "/services#maregraphie",
    },
  ];

  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="section-title">Nos Services</h2>
          <p className="section-subtitle">
            Géopolynésie met à votre disposition une expertise complète en
            hydrographie et topographie pour des relevés de précision en milieu
            terrestre et maritime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="border rounded-lg p-6 flex flex-col h-full"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-ocean-800">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6 flex-grow">
                {service.description}
              </p>
              <Link
                href={service.link}
                className="mt-auto text-ocean-600 font-medium hover:text-ocean-800 inline-flex items-center"
              >
                En savoir plus <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12" data-aos="fade-up">
          <Link href="/services" className="btn-ocean px-6 py-3">
            Tous nos services <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
