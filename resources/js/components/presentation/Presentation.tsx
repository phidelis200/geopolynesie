import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from '@inertiajs/react';
import { Building, Check, ChevronRight, Compass, MapPin, Ship } from 'lucide-react';

const Presentation = () => {
    const isMobile = useIsMobile();

    const hydrographicSurveys = [
        'Acquisition et traitement des données bathymétriques',
        'Levés portuaires et fluviaux',
        'Enquêtes des quais et port autonome de Papeete',
        'Levés dans les îles hautes et atolls',
        "Contrôle d'approfondissement",
        'Études de stabilité des fonds',
        "Prises de Sondes pour mise en place d'une canalisation",
        "Levés pour travaux d'aménagement",
        "Levés pour projet d'aménagement",
        'Levés pour établir un plan de prévention des risques',
        "Contrôles d'érosion",
        'Études de faisabilité pour projets immergés',
        'Cartographie des milieux sensibles (coraux, herbiers)',
        "Suivi de l'évolution des fonds marins",
        'Levés de reconnaissance internationale (Wallis, Îles Cook)',
        "Exploration des zones difficiles d'accès par mini-bateau",
    ];

    const topographicSurveys = [
        'Prises de points de contrôle (GCP) positionnement en centimétrique',
        'Points spécifiques pour caler et associer les images aériennes',
        'Création de modèles numériques de terrain',
    ];

    const otherStudies = [
        'Études de faisabilité pour la détermination du niveau bathymétrique',
        "Création d'outils spécifiques pour des entreprises privées (portuaires et hôtelières)",
    ];

    const dataTypes = ['Mesures bathymétriques', 'Mesures de marée', 'Images aériennes', 'Mesures topographiques', 'Levé magnétométrie'];

    const clients = [
        {
            category: 'Administrations',
            list: [
                'Service Hydrographique et Océanographique de la Marine',
                "Service de l'Urbanisme",
                'Service des Ressources Marines',
                "Direction de l'Équipement",
                'Service du Développement Rural',
                'Direction des Affaires Maritimes',
                "Ministère de l'Environnement et du Développement Durable",
                'Communes et Syndicats',
                'Direction des Ressources Marines',
                "Direction de l'Équipement de Wallis",
                'Direction des Affaires Foncières',
                'Service du Tourisme',
                'GEGDP',
                'ISPF',
                'Port Autonome',
            ],
        },
        {
            category: "Bureaux d'études",
            list: [
                'Pae Tai - Pae Uta (environnement)',
                'Créocéan',
                'Ptpu',
                'Safege',
                'Benetec',
                'Speed',
                'Cabinet Duculet',
                'Ocean Data System',
                'Progem',
                'Poros',
            ],
        },
        {
            category: 'Secteur Touristique',
            list: ['Hôtels 5 étoiles', 'Pearl Beach', 'Intercontinental'],
        },
    ];

    return (
        <main className="flex-grow pt-24">
            {/* Header */}
            <div className="bg-ocean-800 py-12 text-white md:py-20" data-aos="fade-down">
                <div className="container mx-auto max-w-7xl px-4 text-center">
                    <h1 className="mb-4 text-3xl font-bold md:mb-6 md:text-4xl lg:text-5xl">Prestations</h1>
                    <p className="text-ocean-100 mx-auto max-w-3xl px-2 text-base md:text-lg lg:text-xl" data-aos="fade-up" data-aos-delay="200">
                        L'acquisition et le traitement des données hydrographiques sont effectués au moyen du logiciel Hypack©. Ce logiciel permet
                        d'acquérir les données sous différents formats et de fournir les fichiers exportables (dwg, géotiff, plans scannés, etc.). Il
                        calcule les volumes à draguer mais également des exports sous différents formats pour les projets portuaires.
                    </p>
                </div>
            </div>

            {/* Hypack Partnership */}
            <div className="bg-ocean-50 py-8 md:py-12">
                <div className="container mx-auto max-w-7xl px-4">
                    <div className="border-ocean-100 rounded-lg border bg-white p-4 md:p-6" data-aos="fade-up" data-aos-delay="200">
                        <h2 className="text-ocean-800 mb-3 text-xl font-bold md:mb-4 md:text-2xl">Nouveau Partenariat</h2>
                        <p className="mb-2 text-sm text-gray-700 md:text-base">
                            Géopolynésie a maintenant un nouveau partenariat et peut donc répondre à des marchés de topographie par Lidar aéroporté
                            ultra terrestre. Des zones difficiles d'accès, îlots, hauts plateaux peuvent être relevés précisément.
                        </p>
                        <p className="mb-2 text-sm text-gray-700 md:text-base">Réalisation de topographie par photos aériennes sur drone.</p>
                        <p className="text-sm font-medium text-gray-700 md:text-base">
                            Depuis juin 2021 Survey a acquis un magnétomètre SYQWEST, pour la recherche d'objets métalliques.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Services */}
            <div className="py-8 md:py-16">
                <div className="container mx-auto max-w-7xl px-4">
                    <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-2">
                        {/* Surveys Column */}
                        <div data-aos="fade-right" data-aos-delay="200">
                            <div className="mb-8 md:mb-12">
                                <div className="mb-4 flex items-center gap-2 md:mb-6 md:gap-3">
                                    <div className="bg-ocean-100 rounded-full p-2 md:p-3">
                                        <Ship size={isMobile ? 18 : 24} className="text-ocean-600" />
                                    </div>
                                    <h2 className="text-ocean-800 text-xl font-bold md:text-2xl">Principaux chantiers réalisés</h2>
                                </div>

                                <div className="mb-6 md:mb-8">
                                    <h3 className="text-ocean-700 mb-3 text-lg font-bold md:mb-4 md:text-xl">Levés bathymétriques</h3>
                                    <ul className="space-y-1 text-sm md:space-y-2 md:text-base">
                                        {hydrographicSurveys.map((survey, index) => (
                                            <li key={index} className="flex items-start">
                                                <ChevronRight size={isMobile ? 16 : 18} className="text-ocean-500 mt-1 mr-1 flex-shrink-0 md:mr-2" />
                                                <span className="text-gray-700">{survey}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mb-6 md:mb-8">
                                    <h3 className="text-ocean-700 mb-3 text-lg font-bold md:mb-4 md:text-xl">Levés topographiques</h3>
                                    <ul className="space-y-1 text-sm md:space-y-2 md:text-base">
                                        {topographicSurveys.map((survey, index) => (
                                            <li key={index} className="flex items-start">
                                                <ChevronRight size={isMobile ? 16 : 18} className="text-ocean-500 mt-1 mr-1 flex-shrink-0 md:mr-2" />
                                                <span className="text-gray-700">{survey}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-ocean-700 mb-3 text-lg font-bold md:mb-4 md:text-xl">Études diverses</h3>
                                    <ul className="space-y-1 text-sm md:space-y-2 md:text-base">
                                        {otherStudies.map((study, index) => (
                                            <li key={index} className="flex items-start">
                                                <ChevronRight size={isMobile ? 16 : 18} className="text-ocean-500 mt-1 mr-1 flex-shrink-0 md:mr-2" />
                                                <span className="text-gray-700">{study}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-ocean-50 border-ocean-100 rounded-lg border p-4 text-sm md:p-6 md:text-base">
                                <p className="mb-3 text-gray-700 md:mb-4">
                                    Des mesures de marée sont liées aux levés bathymétriques réalisés par Géopolynésie.
                                </p>
                                <p className="mb-3 text-gray-700 md:mb-4">
                                    La topographie est également représentée au moyen de mesures faites au GPS/DGPS (réseau de points) et sous forme
                                    de documents papiers et/ou numériques.
                                </p>
                                <p className="text-gray-700">Les sources de données seront adaptées selon vos besoins.</p>
                            </div>
                        </div>

                        {/* Clients Column */}
                        <div data-aos="fade-left" data-aos-delay="200">
                            <div className="mb-4 flex items-center gap-2 md:mb-6 md:gap-3">
                                <div className="bg-ocean-100 rounded-full p-2 md:p-3">
                                    <Building size={isMobile ? 18 : 24} className="text-ocean-600" />
                                </div>
                                <h2 className="text-ocean-800 text-xl font-bold md:text-2xl">Nos principaux clients</h2>
                            </div>

                            {clients.map((category, idx) => (
                                <div key={idx} className="mb-6 md:mb-8">
                                    <h3 className="text-ocean-700 mb-3 text-lg font-bold md:mb-4 md:text-xl">{category.category}</h3>
                                    <ul className="space-y-1 text-sm md:space-y-2 md:text-base">
                                        {category.list.map((client, index) => (
                                            <li key={index} className="flex items-start">
                                                <ChevronRight size={isMobile ? 16 : 18} className="text-ocean-500 mt-1 mr-1 flex-shrink-0 md:mr-2" />
                                                <span className="text-gray-700">{client}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}

                            <div className="mb-6 md:mb-8">
                                <h3 className="text-ocean-700 mb-3 text-lg font-bold md:mb-4 md:text-xl">
                                    Des études spécifiques et ponctuelles peuvent également délivrer
                                </h3>
                                <ul className="space-y-1 text-sm md:space-y-2 md:text-base">
                                    {dataTypes.map((type, index) => (
                                        <li key={index} className="flex items-start">
                                            <Check size={isMobile ? 16 : 18} className="text-ocean-500 mt-1 mr-1 flex-shrink-0 md:mr-2" />
                                            <span className="text-gray-700">{type}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Examples Section */}
            <div className="bg-ocean-50 py-8 md:py-16">
                <div className="container mx-auto max-w-7xl px-4">
                    <h2 className="text-ocean-800 mb-8 text-center text-2xl font-bold md:mb-12 md:text-3xl">Exemples de nos travaux</h2>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                        <Card className="overflow-hidden bg-white !shadow-none" data-aos="fade-right">
                            <div className="h-48 overflow-hidden md:h-64">
                                <img
                                    src="/assets/presentation-2.png"
                                    height={192}
                                    width={500}
                                    alt="Cartographie bathymétrique"
                                    className="h-full w-full object-contain"
                                />
                            </div>
                            <CardContent className="p-4 md:p-6">
                                <h3 className="text-ocean-800 mb-2 text-lg font-bold md:text-xl">Cartographie bathymétrique</h3>
                                <p className="mb-4 text-sm text-gray-700 md:text-base">
                                    Exemple de levé bathymétrique réalisé dans un lagon polynésien. Cette carte montre les profondeurs et la
                                    topographie des fonds marins avec une précision centimétrique.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="overflow-hidden bg-white !shadow-none" data-aos="fade-left">
                            <div className="h-48 overflow-hidden md:h-64">
                                <img
                                    src="/assets/presentation-1.png"
                                    height={192}
                                    width={500}
                                    alt="Modèle numérique de terrain"
                                    className="h-full w-full object-contain"
                                />
                            </div>
                            <CardContent className="p-4 md:p-6">
                                <h3 className="text-ocean-800 mb-2 text-lg font-bold md:text-xl">Modèle numérique de terrain</h3>
                                <p className="mb-4 text-sm text-gray-700 md:text-base">
                                    Exemple de modèle numérique de terrain réalisé à partir de relevés topographiques. Ce type de modélisation permet
                                    une visualisation précise du relief et facilite les projets d'aménagement.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-white py-8 md:py-16">
                <div className="container mx-auto max-w-4xl px-4 text-center" data-aos="fade-up" data-aos-delay="200">
                    <h2 className="text-ocean-800 mb-3 text-2xl font-bold md:mb-4 md:text-3xl">Besoin d'une prestation sur mesure?</h2>
                    <p className="mb-6 px-2 text-base text-gray-700 md:mb-8 md:text-xl">
                        Notre équipe peut adapter nos prestations à vos besoins spécifiques. Contactez-nous pour discuter de votre projet et obtenir
                        un devis personnalisé.
                    </p>
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link href="/contact-us" className="btn-ocean border-ocean-600 flex items-center justify-center gap-2 border-2 px-6 py-3">
                            <MapPin size={isMobile ? 16 : 18} />
                            <span>Nous contacter</span>
                        </Link>
                        <Link href="/services" className="btn-outline-ocean flex items-center justify-center gap-2">
                            <Compass size={isMobile ? 16 : 18} />
                            <span>Voir nos services</span>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Presentation;
