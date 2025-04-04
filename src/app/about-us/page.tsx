"use client";

import React from "react";
import { Award, Users, Calendar, MapPin, Compass, Globe } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  loading: () => (
    <div className="md:w-1/2 min-h-[300px] bg-ocean-100 flex items-center justify-center">
      <div className="text-center p-8">
        <Globe size={64} className="text-ocean-500 mx-auto mb-4" />
        <p className="text-gray-700">Chargement de la carte...</p>
      </div>
    </div>
  ),
  ssr: false,
});

const AboutPage = () => {
  const milestones = [
    {
      year: "2005",
      event:
        "Création de Géopolynésie par Christian Friot en Polynésie Française",
    },
    {
      year: "2008",
      event: "Premier grand projet de cartographie avec le SHOM",
    },
    {
      year: "2012",
      event: "Expansion des services aux îles éloignées de Polynésie",
    },
    {
      year: "2015",
      event: "Acquisition de nouveaux équipements multi-faisceaux",
    },
    { year: "2018", event: "Création de SURVEY OI pour l'Océan Indien" },
    {
      year: "2020",
      event: "Célébration des 15 ans d'expertise et 100 îles cartographiées",
    },
    {
      year: "2023",
      event: "Nouveau partenariat avec l'Université de Polynésie Française",
    },
  ];

  const teamMembers = [
    {
      name: "Christian Friot",
      position: "Fondateur et Directeur",
      description:
        "Hydrographe catégorie B (FIG-OHI-ACI) formé au SHOM, membre de l'AFHy, de MSF et de la FEPSM",
      image: "/assets/image-christian-friot.jpg",
    },
    {
      name: "Équipe Technique",
      position: "Hydrographes et Topographes",
      description:
        "Une équipe d'experts qualifiés en hydrographie, topographie et cartographie.",
      image: "/assets/image-11.jpg",
    },
  ];

  const values = [
    {
      title: "Précision",
      description:
        "Nous nous engageons à fournir des données de la plus haute précision, conformes aux standards internationaux.",
      icon: <Compass size={40} className="text-ocean-500" />,
    },
    {
      title: "Expertise",
      description:
        "Notre équipe possède une connaissance approfondie du terrain polynésien et des techniques de mesure les plus avancées.",
      icon: <Award size={40} className="text-ocean-500" />,
    },
    {
      title: "Adaptation",
      description:
        "Nous adaptons nos méthodes et équipements aux spécificités de chaque environnement et projet.",
      icon: <Users size={40} className="text-ocean-500" />,
    },
    {
      title: "Rayonnement",
      description:
        "Notre expertise s'étend au-delà de la Polynésie, dans le Pacifique Sud et l'Océan Indien.",
      icon: <Globe size={40} className="text-ocean-500" />,
    },
  ];

  return (
    <main className="flex-grow pt-24">
      {/* Header */}
      <div
        className="bg-ocean-800 text-white py-16 md:py-24"
        data-aos="fade-down"
      >
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            À Propos de Nous
          </h1>
          <p className="text-xl text-ocean-100 max-w-3xl mx-auto">
            Découvrez l'histoire, l'équipe et les valeurs qui font de
            Géopolynésie une référence en hydrographie et topographie depuis
            2005.
          </p>
        </div>
      </div>

      {/* Company Overview */}
      <section className="py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2" data-aos="fade-right">
              <h2 className="section-title">Notre Histoire</h2>
              <p className="text-gray-700 mb-6">
                Société d'hydrographie et de topographie, Géopolynésie a été
                créée en 2005 en Polynésie Française par Christian Friot,
                hydrographe catégorie B (FIG-OHI-ACI) formé au SHOM, membre de
                l'AFHy l'association francophone d'hydrographie, membre de MSF
                marins sans frontières, et membre de la fédération Polynésienne
                de secours en mer FEPSM.
              </p>
              <p className="text-gray-700 mb-6">
                Entreprise privée en Polynésie Française dont les levés sont
                validés par le SHOM, elle s'est déjà forgée une solide
                réputation de qualité d'exécution des travaux et de rédaction de
                ceux-ci. 20 annnées d'expérience avec le SHOM projeté dans le
                monde entier et depuis 2005 en Polynésie (106/120 îles/atolls
                touchés, dont certaines de nombreuses fois) avec des projections
                dans le pacifique Sud et l'Océan Indien.
              </p>
              <p className="text-gray-700">
                Au moyen de matériels performants (GPS géodésiques, théodolites,
                sondeur hydrographique mono ou multi-faisceau, kayaks
                instrumentés, logiciels adaptés), Géopolynésie peut répondre à
                toutes demandes de travaux, tant terrestres que maritimes.
                Géopolynésie dans le Pacifique Sud et SURVEY OI en Océan Indien,
                est capable d'effectuer ses missions dans le monde entier.
              </p>
            </div>
            <div className="md:w-1/2 relative" data-aos="fade-left">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/assets/image-3.jpg"
                  width={800}
                  height={1000}
                  priority
                  alt="Paysage maritime polynésien"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 w-3/4 h-3/4 border-4 border-ocean-500 rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-ocean-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="section-title">Nos Valeurs</h2>
            <p className="section-subtitle">
              Les principes qui guident notre travail et notre engagement envers
              nos clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="card-ocean p-6 flex flex-col items-center text-center h-full"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-ocean-800">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="section-title">Notre Équipe</h2>
            <p className="section-subtitle">
              Rencontrez les experts qui font de Géopolynésie une référence en
              hydrographie et topographie.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center gap-6"
                data-aos="fade-up"
                data-aos-delay={index * 200}
              >
                <div className="w-48 h-48 rounded-full overflow-hidden mb-6 md:mb-0">
                  <Image
                    width={192}
                    height={192}
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-ocean-800 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-ocean-600 font-medium mb-4">
                    {member.position}
                  </p>
                  <p className="text-gray-700">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-ocean-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 relative inline-block">
              Notre Parcours
              <span className="absolute bottom-0 left-0 w-2/3 h-1 bg-ocean-300 rounded-full"></span>
            </h2>
            <p className="text-xl text-ocean-100 mb-10 max-w-2xl mx-auto">
              Les étapes importantes qui ont marqué l'histoire de Géopolynésie
              depuis sa création en 2005.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-ocean-600"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="relative"
                  data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
                  data-aos-delay={index * 100}
                >
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-ocean-500 flex items-center justify-center z-10">
                    <Calendar size={16} className="text-white" />
                  </div>

                  <div
                    className={`flex flex-col md:flex-row items-center ${
                      index % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <div className="md:w-1/2 mb-4 md:mb-0">
                      <div
                        className={`bg-ocean-700 p-6 rounded-lg ${
                          index % 2 === 0 ? "md:ml-12" : "md:mr-12"
                        }`}
                      >
                        <span className="text-ocean-300 font-bold text-xl mb-2 block">
                          {milestone.year}
                        </span>
                        <p className="text-white">{milestone.event}</p>
                      </div>
                    </div>
                    <div className="md:w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="section-title">Où Nous Trouver</h2>
            <p className="section-subtitle">
              Basés en Polynésie Française, nous intervenons dans tout le
              Pacifique Sud et au-delà.
            </p>
          </div>

          <div
            className="flex flex-col md:flex-row items-center bg-white rounded-lg border overflow-hidden"
            data-aos="zoom-in"
          >
            <div className="md:w-1/2 p-8">
              <div className="flex items-center mb-6">
                <MapPin size={28} className="text-ocean-500 mr-3" />
                <h3 className="text-2xl font-bold text-ocean-800">
                  Nos Bureaux
                </h3>
              </div>

              <div className="space-y-4 mb-8">
                <p className="text-gray-700">
                  <strong>Siège social:</strong>
                  <br />
                  Polynésie Française
                </p>
                <p className="text-gray-700">
                  <strong>Bureau Océan Indien:</strong>
                  <br />
                  SURVEY OI
                </p>
              </div>

              <p className="text-gray-700 mb-4">
                Notre équipe est mobile et peut se déplacer pour des missions
                dans le monde entier.
              </p>
            </div>
            <MapComponent />
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
