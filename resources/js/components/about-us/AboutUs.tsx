import { Award, Calendar, Compass, Globe, MapPin, Users } from 'lucide-react';

const AboutUs = () => {
    const milestones = [
        {
            year: '2005',
            event: 'Création de Géopolynésie par Christian Friot en Polynésie Française',
        },
        {
            year: '2008',
            event: 'Premier grand projet de cartographie avec le SHOM',
        },
        {
            year: '2012',
            event: 'Expansion des services aux îles éloignées de Polynésie',
        },
        {
            year: '2015',
            event: 'Acquisition de nouveaux équipements multi-faisceaux',
        },
        { year: '2018', event: "Création de SURVEY OI pour l'Océan Indien" },
        {
            year: '2020',
            event: "Célébration des 15 ans d'expertise et 100 îles cartographiées",
        },
        {
            year: '2023',
            event: "Nouveau partenariat avec l'Université de Polynésie Française",
        },
    ];

    const teamMembers = [
        {
            name: 'Christian Friot',
            position: 'Fondateur et Directeur',
            description: "Hydrographe catégorie B (FIG-OHI-ACI) formé au SHOM, membre de l'AFHy, de MSF et de la FEPSM",
            image: '/assets/image-christian-friot.jpg',
        },
        {
            name: 'Équipe Technique',
            position: 'Hydrographes et Topographes',
            description: "Une équipe d'experts qualifiés en hydrographie, topographie et cartographie.",
            image: '/assets/image-11.jpg',
        },
    ];

    const values = [
        {
            title: 'Précision',
            description: 'Nous nous engageons à fournir des données de la plus haute précision, conformes aux standards internationaux.',
            icon: <Compass size={40} className="text-ocean-500" />,
        },
        {
            title: 'Expertise',
            description: 'Notre équipe possède une connaissance approfondie du terrain polynésien et des techniques de mesure les plus avancées.',
            icon: <Award size={40} className="text-ocean-500" />,
        },
        {
            title: 'Adaptation',
            description: 'Nous adaptons nos méthodes et équipements aux spécificités de chaque environnement et projet.',
            icon: <Users size={40} className="text-ocean-500" />,
        },
        {
            title: 'Rayonnement',
            description: "Notre expertise s'étend au-delà de la Polynésie, dans le Pacifique Sud et l'Océan Indien.",
            icon: <Globe size={40} className="text-ocean-500" />,
        },
    ];

    return (
        <main className="flex-grow pt-24">
            {/* Header */}
            <div className="bg-ocean-800 py-16 text-white md:py-24" data-aos="fade-down">
                <div className="container mx-auto max-w-7xl px-4 text-center">
                    <h1 className="mb-6 text-4xl font-bold md:text-5xl">À Propos de Nous</h1>
                    <p className="text-ocean-100 mx-auto max-w-3xl text-xl">
                        Découvrez l'histoire, l'équipe et les valeurs qui font de Géopolynésie une référence en hydrographie et topographie depuis
                        2005.
                    </p>
                </div>
            </div>

            {/* Company Overview */}
            <section className="py-16">
                <div className="container mx-auto max-w-7xl px-4">
                    <div className="flex flex-col items-center gap-12 md:flex-row">
                        <div className="md:w-1/2" data-aos="fade-right">
                            <h2 className="section-title">Notre Histoire</h2>
                            <p className="mb-6 text-gray-700">
                                Société d'hydrographie et de topographie, Géopolynésie a été créée en 2005 en Polynésie Française par Christian Friot,
                                hydrographe catégorie B (FIG-OHI-ACI) formé au SHOM, membre de l'AFHy l'association francophone d'hydrographie, membre
                                de MSF marins sans frontières, et membre de la fédération Polynésienne de secours en mer FEPSM.
                            </p>
                            <p className="mb-6 text-gray-700">
                                Entreprise privée en Polynésie Française dont les levés sont validés par le SHOM, elle s'est déjà forgée une solide
                                réputation de qualité d'exécution des travaux et de rédaction de ceux-ci. 20 annnées d'expérience avec le SHOM projeté
                                dans le monde entier et depuis 2005 en Polynésie (106/120 îles/atolls touchés, dont certaines de nombreuses fois) avec
                                des projections dans le pacifique Sud et l'Océan Indien.
                            </p>
                            <p className="text-gray-700">
                                Au moyen de matériels performants (GPS géodésiques, théodolites, sondeur hydrographique mono ou multi-faisceau, kayaks
                                instrumentés, logiciels adaptés), Géopolynésie peut répondre à toutes demandes de travaux, tant terrestres que
                                maritimes. Géopolynésie dans le Pacifique Sud et SURVEY OI en Océan Indien, est capable d'effectuer ses missions dans
                                le monde entier.
                            </p>
                        </div>
                        <div className="relative md:w-1/2" data-aos="fade-left">
                            <div className="overflow-hidden rounded-lg shadow-lg">
                                <img
                                    src="/assets/image4.jpg"
                                    width={600}
                                    height={400}
                                    alt="Paysage maritime polynésien"
                                    className="h-[400px] w-auto"
                                />
                            </div>
                            <div className="border-ocean-500 absolute -right-5 -bottom-5 -z-10 h-3/4 w-3/4 rounded-lg border-4"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="bg-ocean-50 py-16">
                <div className="container mx-auto px-4">
                    <div className="mb-16 text-center" data-aos="fade-up">
                        <h2 className="section-title">Nos Valeurs</h2>
                        <p className="section-subtitle">Les principes qui guident notre travail et notre engagement envers nos clients.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="card-ocean flex h-full flex-col items-center p-6 text-center"
                                data-aos="zoom-in"
                                data-aos-delay={index * 100}
                            >
                                <div className="mb-4">{value.icon}</div>
                                <h3 className="text-ocean-800 mb-3 text-xl font-bold">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="mb-16 text-center" data-aos="fade-up">
                        <h2 className="section-title">Notre Équipe</h2>
                        <p className="section-subtitle">
                            Rencontrez les experts qui font de Géopolynésie une référence en hydrographie et topographie.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="flex flex-col items-center gap-6 md:flex-row" data-aos="fade-up" data-aos-delay={index * 200}>
                                <div className="mb-6 h-48 w-48 overflow-hidden rounded-full md:mb-0">
                                    <img width={192} height={192} src={member.image} alt={member.name} className="h-full w-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-ocean-800 mb-2 text-2xl font-bold">{member.name}</h3>
                                    <p className="text-ocean-600 mb-4 font-medium">{member.position}</p>
                                    <p className="text-gray-700">{member.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="bg-ocean-800 py-16 text-white">
                <div className="container mx-auto px-4">
                    <div className="mb-16 text-center" data-aos="fade-up">
                        <h2 className="relative mb-6 inline-block text-3xl font-bold md:text-4xl">
                            Notre Parcours
                            <span className="bg-ocean-300 absolute bottom-0 left-0 h-1 w-2/3 rounded-full"></span>
                        </h2>
                        <p className="text-ocean-100 mx-auto mb-10 max-w-2xl text-xl">
                            Les étapes importantes qui ont marqué l'histoire de Géopolynésie depuis sa création en 2005.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="bg-ocean-600 absolute left-1/2 h-full w-1 -translate-x-1/2 transform"></div>

                        <div className="space-y-12">
                            {milestones.map((milestone, index) => (
                                <div
                                    key={index}
                                    className="relative"
                                    data-aos={index % 2 === 0 ? 'fade-left' : 'fade-right'}
                                    data-aos-delay={index * 100}
                                >
                                    <div className="bg-ocean-500 absolute left-1/2 z-10 flex h-8 w-8 -translate-x-1/2 transform items-center justify-center rounded-full">
                                        <Calendar size={16} className="text-white" />
                                    </div>

                                    <div className={`flex flex-col items-center md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                        <div className="mb-4 md:mb-0 md:w-1/2">
                                            <div className={`bg-ocean-700 rounded-lg p-6 ${index % 2 === 0 ? 'md:ml-12' : 'md:mr-12'}`}>
                                                <span className="text-ocean-300 mb-2 block text-xl font-bold">{milestone.year}</span>
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
                    <div className="mb-16 text-center" data-aos="fade-up">
                        <h2 className="section-title">Où Nous Trouver</h2>
                        <p className="section-subtitle">Basés en Polynésie Française, nous intervenons dans tout le Pacifique Sud et au-delà.</p>
                    </div>

                    <div
                        className="flex flex-col items-center overflow-hidden rounded-lg border border-gray-200 bg-white md:flex-row"
                        data-aos="zoom-in"
                    >
                        <div className="p-8 md:w-1/2">
                            <div className="mb-6 flex items-center">
                                <MapPin size={28} className="text-ocean-500 mr-3" />
                                <h3 className="text-ocean-800 text-2xl font-bold">Nos Bureaux</h3>
                            </div>

                            <div className="mb-8 space-y-4">
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
                        </div>
                        <div className="bg-ocean-100 flex min-h-[300px] items-center justify-center md:w-1/2">
                            <div className="p-8 text-center">
                                <Globe size={64} className="text-ocean-500 mx-auto mb-4" />
                                <p className="text-gray-700">Notre équipe est mobile et peut se déplacer pour des missions dans le monde entier.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutUs;
