import { GlobeIcon, MapPin } from 'lucide-react';

const GeographicRange = () => {
    const regions = [
        {
            name: 'Polynésie Française',
            description: '106 îles et atolls sur 120 couverts',
            count: 106,
        },
        {
            name: 'Pacifique Sud',
            description: 'Projets dans plusieurs archipels et nations insulaires',
            count: null,
        },
        {
            name: 'Océan Indien',
            description: 'Présence via SURVEY OI avec des partenaires locaux',
            count: null,
        },
        {
            name: 'International',
            description: 'Capacité à intervenir mondialement selon les projets',
            count: null,
        },
    ];

    return (
        <section id="geographic-range" className="from-ocean-800 to-ocean-900 bg-gradient-to-b py-16 text-white md:py-24">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="mb-16 text-center" data-aos="fade-up">
                    <h2 className="relative mb-6 inline-block text-3xl font-bold md:text-4xl">
                        Rayonnement Géographique
                        <span className="bg-ocean-300 absolute bottom-0 left-0 h-1 w-2/3 rounded-full"></span>
                    </h2>
                    <p className="text-ocean-100 mx-auto mb-10 max-w-2xl text-xl">
                        Géopolynésie intervient principalement en Polynésie Française mais étend son expertise au Pacifique Sud et à l'Océan Indien.
                    </p>
                </div>

                <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {regions.map((region, index) => (
                        <div
                            key={index}
                            className="bg-ocean-800/50 border-ocean-700 hover:bg-ocean-700/50 rounded-lg border p-6 backdrop-blur-sm transition-colors duration-300"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="mb-4 flex items-start justify-between">
                                <div className="bg-ocean-700/50 rounded-full p-3">
                                    <GlobeIcon size={24} className="text-ocean-300" />
                                </div>
                                {region.count && (
                                    <div className="bg-ocean-500 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold text-white">
                                        {region.count}
                                    </div>
                                )}
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-white">{region.name}</h3>
                            <p className="text-ocean-100">{region.description}</p>
                        </div>
                    ))}
                </div>

                <div className="rounded-lg border border-white/20 bg-white/10 p-8 backdrop-blur-sm" data-aos="fade-up" data-aos-delay="200">
                    <div className="flex flex-col items-center md:flex-row">
                        <div className="mb-6 md:mb-0 md:w-1/2 md:pr-8">
                            <h3 className="mb-4 text-2xl font-bold">Une expertise mondiale</h3>
                            <p className="text-ocean-100 mb-4">
                                "Géopolynésie dans le Pacifique Sud et SURVEY OI en Océan Indien, est capable d'effectuer ses missions dans le monde
                                entier."
                            </p>
                            <p className="text-ocean-100">
                                Notre équipe d'experts peut se déplacer sur tous les continents pour réaliser vos projets hydrographiques et
                                topographiques.
                            </p>
                        </div>
                        <div className="flex justify-center md:w-1/2">
                            <div className="relative">
                                <div className="bg-ocean-700/50 flex h-64 w-64 items-center justify-center rounded-full">
                                    <MapPin size={80} className="text-ocean-300" />
                                </div>
                                <div className="bg-ocean-300 absolute top-6 left-6 h-4 w-4 animate-pulse rounded-full"></div>
                                <div
                                    className="bg-ocean-300 absolute right-8 bottom-12 h-3 w-3 animate-pulse rounded-full"
                                    style={{ animationDelay: '1s' }}
                                ></div>
                                <div
                                    className="bg-ocean-300 absolute top-1/2 left-1/4 h-5 w-5 animate-pulse rounded-full"
                                    style={{ animationDelay: '1.5s' }}
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
