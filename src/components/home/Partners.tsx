import React from "react";
import { Building } from "lucide-react";

const Partners = () => {
  const partners = [
    {
      name: "SHOM",
      description: "Service Hydrographique et Océanographique de la Marine",
    },
    { name: "AFHy", description: "Association Francophone d'Hydrographie" },
    { name: "MSF", description: "Marins Sans Frontières" },
    { name: "FEPSM", description: "Fédération Polynésienne de Secours en Mer" },
    { name: "OHI", description: "Organisation Hydrographique Internationale" },
    { name: "FIG", description: "Fédération Internationale des Géomètres" },
  ];

  return (
    <section id="partners" className="py-16 md:py-24">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="section-title">Nos Partenaires</h2>
          <p className="section-subtitle">
            Géopolynésie collabore avec des organismes reconnus dans le domaine
            de l'hydrographie, de la cartographie et de la sécurité maritime.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="border rounded-lg p-6 flex flex-col items-center text-center hover:bg-ocean-50 transition-colors duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="mb-4 p-3 bg-ocean-100 rounded-full">
                <Building size={30} className="text-ocean-700" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-ocean-800">
                {partner.name}
              </h3>
              <p className="text-gray-600">{partner.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 p-6 bg-ocean-100 rounded-lg" data-aos="fade-up">
          <p className="text-center text-gray-700">
            <span className="font-semibold">
              Vous êtes un organisme dans le domaine maritime ou topographique?
            </span>
            <br />
            Nous sommes ouverts à des partenariats stratégiques pour développer
            des projets innovants.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Partners;
