import React from "react";
import { Star, Users } from "lucide-react";

const Clients = () => {
  const testimonials = [
    {
      content:
        "Géopolynésie a réalisé un travail exceptionnel pour la cartographie de notre lagon. La précision des relevés et la qualité des livrables ont dépassé nos attentes.",
      author: "Direction des Ressources Marines",
      position: "Polynésie Française",
    },
    {
      content:
        "L'expertise et le professionnalisme de l'équipe de Géopolynésie nous ont permis de mener à bien notre projet d'aménagement portuaire dans les délais impartis.",
      author: "Port Autonome de Papeete",
      position: "Tahiti",
    },
    {
      content:
        "Nous faisons confiance à Géopolynésie depuis plus de 10 ans pour tous nos travaux d'hydrographie. Leur connaissance du terrain polynésien est inégalée.",
      author: "Ministère de l'Équipement",
      position: "Polynésie Française",
    },
  ];

  const clients = [
    "Gouvernement de la Polynésie Française",
    "SHOM (Service Hydrographique et Océanographique de la Marine)",
    "Direction des Ressources Marines",
    "Ports Autonomes",
    "Communes de Polynésie",
    "Organismes de recherche",
    "Secteur privé (hôtellerie, immobilier, aquaculture)",
    "Projets d'infrastructures",
  ];

  return (
    <section id="clients" className="py-16 md:py-24 bg-ocean-50">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="section-title">Nos Clients</h2>
          <p className="section-subtitle">
            Géopolynésie travaille avec des clients institutionnels et privés en
            Polynésie et à l'international.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border-t-4 border-ocean-500 relative"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="absolute -top-4 right-6 bg-ocean-500 p-2 rounded-full">
                <Star size={20} className="text-white" />
              </div>
              <p className="text-gray-700 mb-6 italic">{testimonial.content}</p>
              <div className="mt-auto">
                <p className="font-bold text-ocean-800">{testimonial.author}</p>
                <p className="text-gray-600 text-sm">{testimonial.position}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Client List */}
        <div className="bg-white rounded-lg p-8" data-aos="fade-up">
          <div className="flex flex-col md:flex-row items-center mb-8">
            <div className="mb-6 md:mb-0 md:mr-8">
              <div className="p-4 bg-ocean-100 rounded-full inline-block">
                <Users size={32} className="text-ocean-600" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-ocean-800 mb-2">
                Ils nous font confiance
              </h3>
              <p className="text-gray-600">
                Depuis 2005, Géopolynésie met son expertise au service de
                nombreux clients publics et privés pour des projets de petite et
                grande envergure.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {clients.map((client, index) => (
              <div
                key={index}
                className="bg-ocean-50 p-4 rounded border border-ocean-100 text-center"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <p className="text-ocean-700 font-medium">{client}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
