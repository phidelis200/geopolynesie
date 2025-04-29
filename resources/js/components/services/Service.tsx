import { Link } from '@inertiajs/react';
import { Anchor, ArrowRight, CheckCircle, Compass, FileText, Map, Ruler, Waves } from 'lucide-react';

const Service = () => {
    const services = [
        {
            id: 'hydrographie',
            title: 'Hydrographie',
            description:
                'Notre expertise en hydrographie comprend des levés bathymétriques de précision, la cartographie des fonds marins et des études pour la sécurité de la navigation maritime.',
            icon: <Anchor size={40} className="text-ocean-500" />,
            features: [
                'Levés bathymétriques mono et multi-faisceaux',
                'Cartographie des fonds marins',
                'Études hydrographiques pour la navigation',
                "Détection d'obstacles sous-marins",
                "Inspection d'ouvrages immergés",
                "Suivi de l'évolution des fonds",
            ],
            image: '/assets/image-13.jpg',
        },
        {
            id: 'topographie',
            title: 'Topographie',
            description:
                "Nos services de topographie couvrent tous les types de relevés terrestres, de la modélisation 3D à la cartographie de précision pour les projets d'aménagement.",
            icon: <Map size={40} className="text-ocean-500" />,
            features: [
                'Relevés topographiques terrestres',
                'Modélisation 3D du terrain',
                "Cartographie précise pour projets d'aménagement",
                'Relevés pour permis de construire',
                'Bornage et délimitation de propriétés',
                'Établissement de plans topographiques',
            ],
            image: '/assets/image-12.jpg',
        },
        {
            id: 'cartographie',
            title: 'Cartographie',
            description:
                'Nous produisons des cartes marines et terrestres de haute qualité conformes aux standards internationaux pour divers usages professionnels.',
            icon: <FileText size={40} className="text-ocean-500" />,
            features: [
                'Production de cartes marines et terrestres',
                'Conformité aux standards internationaux',
                'Documents nautiques professionnels',
                'Cartes thématiques',
                "SIG (Systèmes d'Information Géographique)",
                'Visualisation de données géospatiales',
            ],
            image: '/assets/image.png',
        },
        {
            id: 'geodesie',
            title: 'Géodésie',
            description:
                "Nos services de géodésie permettent l'établissement de réseaux géodésiques précis et le référencement spatial pour tous types de projets.",
            icon: <Ruler size={40} className="text-ocean-500" />,
            features: [
                'Établissement de réseaux géodésiques',
                'Mesures GPS/GNSS de haute précision',
                'Référencement spatial',
                'Détermination de systèmes de coordonnées locaux',
                'Rattachement aux systèmes de référence mondiaux',
                'Établissement de points de calage',
            ],
            image: '/assets/image-19.png',
        },
        {
            id: 'courantologie',
            title: 'Courantologie',
            description:
                'Nous réalisons des études courantologiques pour analyser la dynamique des courants marins, essentielles à la navigation, l’ingénierie côtière et la modélisation océanographique.',
            icon: <Compass size={40} className="text-ocean-500" />,
            features: [
                'Mesures de courant à l’aide de profileurs ADCP',
                'Études de courant de marée et de dérive',
                'Profil vertical de la vitesse des courants',
                'Analyse de la dynamique marine locale',
                'Implantation et suivi d’appareils de mesure',
                'Fourniture de données pour modélisation numérique',
            ],
            image: '/assets/image-20.jpg',
        },
        {
            id: 'maregraphie',
            title: 'Marégraphie',
            description:
                'Nous assurons l’observation et l’analyse des niveaux d’eau grâce à des stations marégraphiques modernes, pour des études côtières, portuaires et scientifiques précises.',
            icon: <Waves size={40} className="text-ocean-500" />,
            features: [
                'Installation de stations marégraphiques',
                'Mesures continues des niveaux d’eau',
                'Études des marées et des ondes de tempête',
                'Analyse des cycles de marée à court et long terme',
                'Étalonnage et maintenance des capteurs',
                'Fourniture de données pour la modélisation hydrodynamique',
            ],
            image: '/assets/image-21.jpg',
        },
    ];

    return (
        <main className="flex-grow pt-24">
            {/* Header */}
            <div className="bg-ocean-800 py-16 text-white md:py-24" data-aos="fade-down">
                <div className="container mx-auto max-w-7xl px-4 text-center">
                    <h1 className="mb-6 text-4xl font-bold md:text-5xl">Nos Services</h1>
                    <p className="text-ocean-100 mx-auto max-w-3xl text-xl" data-aos="fade-up" data-aos-delay="200">
                        Géopolynésie offre une gamme complète de services en hydrographie, topographie et cartographie de haute précision pour
                        répondre à tous vos besoins de mesure et de représentation spatiale.
                    </p>
                </div>
            </div>

            {/* Services List */}
            <div className="py-16">
                <div className="container mx-auto max-w-7xl px-4">
                    <div className="space-y-24">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                id={service.id}
                                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}
                                data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                            >
                                <div className="md:w-1/2">
                                    <div className="mb-4">{service.icon}</div>
                                    <h2 className="text-ocean-800 mb-4 text-3xl font-bold">{service.title}</h2>
                                    <p className="mb-6 text-gray-700">{service.description}</p>

                                    <div className="mb-8 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                                        {service.features.map((feature, i) => (
                                            <div key={i} className="flex items-start">
                                                <CheckCircle size={20} className="text-ocean-500 mt-1 mr-2 flex-shrink-0" />
                                                <span className="text-gray-700">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Link href="/contact-us" className="btn-ocean px-6 py-3">
                                        Demander un devis <ArrowRight size={20} />
                                    </Link>
                                </div>

                                <div className="relative md:w-1/2">
                                    <div
                                        className={`overflow-hidden rounded-lg shadow-lg ${
                                            service.id === 'geodesie' && 'max-h-[600px] max-w-[500px]'
                                        } ${service.id === 'courantologie' && 'max-h-[600px] max-w-[550px]'} ${
                                            service.id === 'maregraphie' && 'max-h-[550px] max-w-[450px]'
                                        }`}
                                    >
                                        <img width={500} height={600} src={service.image} alt={service.title} className="h-auto w-full" />
                                    </div>
                                    {index % 2 === 0 ? (
                                        <div className="border-ocean-500 absolute -right-5 -bottom-5 -z-10 h-3/4 w-3/4 rounded-lg border-4"></div>
                                    ) : (
                                        <div className="border-ocean-500 absolute -bottom-5 -left-5 -z-10 h-3/4 w-3/4 rounded-lg border-4"></div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-ocean-50 py-16" data-aos="fade-up">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-ocean-800 mb-4 text-3xl font-bold">Besoin d'un service sur mesure?</h2>
                    <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-700">
                        Notre équipe peut adapter nos services à vos besoins spécifiques. Contactez-nous pour discuter de votre projet.
                    </p>
                    <Link href="/contact-us" className="btn-ocean px-6 py-3">
                        Nous contacter
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default Service;
