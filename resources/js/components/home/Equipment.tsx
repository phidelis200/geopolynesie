import { CheckCircle } from 'lucide-react';

const Equipment = () => {
    const equipmentList = [
        'GPS géodésiques de haute précision',
        'Théodolites électroniques',
        'Sondeurs hydrographiques mono-faisceau',
        'Sondeurs hydrographiques multi-faisceaux',
        'Kayaks instrumentés pour zones peu profondes',
        'Logiciels spécialisés de traitement de données',
        'Systèmes de positionnement dynamique',
        'Stations totales robotisées',
        'Drones de cartographie aérienne',
        'Équipements de plongée sous-marine',
    ];

    return (
        <section id="equipment" className="bg-ocean-50 py-16 md:py-24">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="flex flex-col items-center md:flex-row">
                    <div className="mb-10 md:mb-0 md:w-1/2 md:pr-12" data-aos="fade-right">
                        <h2 className="section-title">Notre Matériel</h2>
                        <p className="mb-8 text-gray-700">
                            Géopolynésie utilise des équipements de pointe pour garantir des relevés et des mesures de la plus haute précision. Notre
                            parc d'instruments est régulièrement calibré et mis à jour selon les dernières avancées technologiques.
                        </p>

                        <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                            {equipmentList.map((item, index) => (
                                <div key={index} className="flex items-start" data-aos="fade-up" data-aos-delay={index * 50}>
                                    <CheckCircle size={20} className="text-ocean-500 mt-1 mr-2 flex-shrink-0" />
                                    <span className="text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative md:w-1/2" data-aos="fade-left" data-aos-delay="200">
                        <div className="overflow-hidden rounded-lg shadow-lg">
                            <img
                                src="/assets/Drone Phantom 4 Pro.png"
                                width={500}
                                height={500}
                                alt="Équipement de haute précision pour hydrographie"
                                className="h-auto w-full"
                            />
                        </div>
                        <div className="border-ocean-500 absolute -right-5 -bottom-5 -z-10 h-3/4 w-3/4 rounded-lg border-4"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Equipment;
