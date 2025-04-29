import { Anchor, Building2, MapPin, Waves } from 'lucide-react';
import { useState } from 'react';

const Partners = () => {
    const [activeTab, setActiveTab] = useState(0);

    const partnerCategories = [
        {
            title: "Bureaux d'études & Ingénierie",
            icon: Building2,
            partners: [
                {
                    name: 'GEDES',
                    location: "Côte d'Ivoire",
                    description: "Bureau d'étude technique & ingénierie",
                },
                { name: 'PTPU', location: 'Polynésie française' },
                { name: 'ARVAM-PARETO', location: 'Réunion' },
                { name: 'Tonkin et Taylor', location: 'Nouvelle Zélande' },
                { name: 'BEST PACIFIC', location: 'Polynésie française' },
                { name: 'CREOCEAN', location: 'Polynésie française' },
                { name: 'EGIS', location: 'Polynésie française' },
                { name: 'FUTURMAP', location: 'Madagascar' },
            ],
        },
        {
            title: 'Cabinets de Géomètre-Topographe',
            icon: MapPin,
            partners: [
                {
                    name: 'Cabinets Tahiti',
                    location: 'Polynésie française',
                    description: 'Plusieurs cabinets partenaires',
                },
                { name: 'Cabinet Hydrographie', location: 'Nouvelle Calédonie' },
                { name: 'Cabinet Topographie', location: 'Nouvelle Calédonie' },
                { name: 'Cabinet Topographie', location: 'La Réunion' },
                {
                    name: 'Cabinet Topographie',
                    location: 'Madagascar',
                    description: 'Basé à Antananarivo',
                },
            ],
        },
        {
            title: 'Travaux Sous-marins',
            icon: Anchor,
            partners: [
                {
                    name: 'Entreprises locales',
                    location: 'Polynésie française',
                    description: '3 entreprises partenaires',
                },
                { name: 'Entreprise Océan Indien', location: 'Océan Indien' },
            ],
        },
        {
            title: 'Services Spécialisés',
            icon: Waves,
            partners: [
                {
                    name: 'LIDAR aéroporté',
                    description: 'Bureau spécialisé dans les levés',
                },
                { name: 'Club de plongée Raiatea', location: 'Polynésie française' },
                {
                    name: 'Bathymétrie',
                    location: 'France',
                    description: '2 entreprises spécialisées',
                },
            ],
        },
    ];

    return (
        <section id="partners" className="py-16 md:py-24">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="mb-8 text-center" data-aos="fade-up">
                    <h2 className="section-title">Nos Partenaires</h2>
                    <p className="section-subtitle">Notre réseau de partenaires à travers l'Océanie et l'Océan Indien</p>
                </div>

                <div className="scrollbar-hide -mx-4 mb-6 flex overflow-x-auto px-4 py-2">
                    <div className="mx-auto flex space-x-2">
                        {partnerCategories.map((category, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveTab(index)}
                                className={`flex cursor-pointer items-center rounded-full px-4 py-2 whitespace-nowrap transition-colors ${
                                    activeTab === index ? 'bg-ocean-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <category.icon size={18} className="mr-2" />
                                {category.title}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {partnerCategories[activeTab].partners.map((partner, index) => (
                        <div
                            key={index}
                            className="rounded-lg border border-gray-200 bg-white p-4 transition-shadow"
                            data-aos="fade-up"
                            data-aos-delay={index * 50}
                        >
                            <h4 className="text-ocean-800 text-lg font-bold">{partner.name}</h4>
                            {partner.location && <p className="text-ocean-600 text-sm">{partner.location}</p>}
                            {partner.description && <p className="mt-1 text-sm text-gray-600">{partner.description}</p>}
                        </div>
                    ))}
                </div>

                {partnerCategories[activeTab].partners.length === 0 && (
                    <div className="py-8 text-center text-gray-500">Aucun partenaire trouvé pour votre recherche</div>
                )}

                <div className="bg-ocean-50 mt-12 rounded-lg p-4 text-center" data-aos="fade-up">
                    <p className="text-gray-700">
                        <span className="font-semibold">Intéressé par un partenariat?</span>
                        <br />
                        Contactez-nous pour explorer les possibilités de collaboration.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Partners;
