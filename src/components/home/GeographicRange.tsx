import React from "react";
import { GlobeIcon, MapPin } from "lucide-react";

const GeographicRange = () => {
  const regions = [
    {
      name: "Polynésie Française",
      description: "106 îles et atolls sur 120 couverts",
      count: 106,
    },
    {
      name: "Pacifique Sud",
      description: "Projets dans plusieurs archipels et nations insulaires",
      count: null,
    },
    {
      name: "Océan Indien",
      description: "Présence via SURVEY OI avec des partenaires locaux",
      count: null,
    },
    {
      name: "International",
      description: "Capacité à intervenir mondialement selon les projets",
      count: null,
    },
  ];

  return (
    <section
      id="geographic-range"
      className="py-16 md:py-24 bg-gradient-to-b from-ocean-800 to-ocean-900 text-white"
    >
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 relative inline-block">
            Rayonnement Géographique
            <span className="absolute bottom-0 left-0 w-2/3 h-1 bg-ocean-300 rounded-full"></span>
          </h2>
          <p className="text-xl text-ocean-100 mb-10 max-w-2xl mx-auto">
            Géopolynésie intervient principalement en Polynésie Française mais
            étend son expertise au Pacifique Sud et à l'Océan Indien.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {regions.map((region, index) => (
            <div
              key={index}
              className="bg-ocean-800/50 backdrop-blur-sm border border-ocean-700 rounded-lg p-6 hover:bg-ocean-700/50 transition-colors duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-ocean-700/50 rounded-full">
                  <GlobeIcon size={24} className="text-ocean-300" />
                </div>
                {region.count && (
                  <div className="bg-ocean-500 text-white text-xl font-bold h-12 w-12 rounded-full flex items-center justify-center">
                    {region.count}
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">
                {region.name}
              </h3>
              <p className="text-ocean-100">{region.description}</p>
            </div>
          ))}
        </div>

        <div
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-bold mb-4">
                Une expertise mondiale
              </h3>
              <p className="text-ocean-100 mb-4">
                "Géopolynésie dans le Pacifique Sud et SURVEY OI en Océan
                Indien, est capable d'effectuer ses missions dans le monde
                entier."
              </p>
              <p className="text-ocean-100">
                Notre équipe d'experts peut se déplacer sur tous les continents
                pour réaliser vos projets hydrographiques et topographiques.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 rounded-full bg-ocean-700/50 flex items-center justify-center">
                  <MapPin size={80} className="text-ocean-300" />
                </div>
                <div className="absolute top-6 left-6 w-4 h-4 bg-ocean-300 rounded-full animate-pulse"></div>
                <div
                  className="absolute bottom-12 right-8 w-3 h-3 bg-ocean-300 rounded-full animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute top-1/2 left-1/4 w-5 h-5 bg-ocean-300 rounded-full animate-pulse"
                  style={{ animationDelay: "1.5s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeographicRange;
