import React from "react";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

const Equipment = () => {
  const equipmentList = [
    "GPS géodésiques de haute précision",
    "Théodolites électroniques",
    "Sondeurs hydrographiques mono-faisceau",
    "Sondeurs hydrographiques multi-faisceaux",
    "Kayaks instrumentés pour zones peu profondes",
    "Logiciels spécialisés de traitement de données",
    "Systèmes de positionnement dynamique",
    "Stations totales robotisées",
    "Drones de cartographie aérienne",
    "Équipements de plongée sous-marine",
  ];

  return (
    <section id="equipment" className="py-16 md:py-24 bg-ocean-50">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div
            className="md:w-1/2 mb-10 md:mb-0 md:pr-12"
            data-aos="fade-right"
          >
            <h2 className="section-title">Notre Matériel</h2>
            <p className="text-gray-700 mb-8">
              Géopolynésie utilise des équipements de pointe pour garantir des
              relevés et des mesures de la plus haute précision. Notre parc
              d'instruments est régulièrement calibré et mis à jour selon les
              dernières avancées technologiques.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {equipmentList.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start"
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <CheckCircle
                    size={20}
                    className="text-ocean-500 mt-1 mr-2 flex-shrink-0"
                  />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="md:w-1/2 relative"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/assets/Drone Phantom 4 Pro.png"
                width={500}
                height={500}
                priority
                alt="Équipement de haute précision pour hydrographie"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 w-3/4 h-3/4 border-4 border-ocean-500 rounded-lg -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Equipment;
