import { Star } from 'lucide-react';

const Clients = () => {
    const testimonials = [
        {
            content:
                'Géopolynésie a réalisé un travail exceptionnel pour la cartographie de notre lagon. La précision des relevés et la qualité des livrables ont dépassé nos attentes.',
            author: 'Direction des Ressources Marines',
            position: 'Polynésie Française',
        },
        {
            content:
                "L'expertise et le professionnalisme de l'équipe de Géopolynésie nous ont permis de mener à bien notre projet d'aménagement portuaire dans les délais impartis.",
            author: 'Port Autonome de Papeete',
            position: 'Tahiti',
        },
        {
            content:
                "Nous faisons confiance à Géopolynésie depuis plus de 20 ans pour tous nos travaux d'hydrographie. Leur connaissance du terrain polynésien est inégalée.",
            author: "Ministère de l'Équipement",
            position: 'Polynésie Française',
        },
    ];

    type Client = {
        name: string;
        logo?: string;
        text?: string;
        url?: string;
    };

    const clients: Client[] = [
        {
            name: 'FUGRO LADS',
            logo: '/assets/clients/fugro.avif',
            url: 'https://www.fugro.com',
        },
        {
            name: "Service de l'urbanisme",
            logo: '/assets/clients/urbanisme.avif',
            url: 'https://www.urbanisme.pf',
        },
        {
            name: 'Port Autonome de Papeete',
            logo: '/assets/clients/port-autonome.avif',
            url: 'https://www.portdepapeete.pf',
        },
        {
            name: 'IRD',
            logo: '/assets/clients/ird.avif',
            url: 'https://www.ird.fr',
        },
        {
            name: 'Boyer Travaux Maritimes',
            logo: '/assets/clients/boyer.avif',
            url: 'https://www.boyer.tm',
        },
        { name: 'GEOMER', text: 'GEOMER', url: 'https://www.geomer.fr' },
        {
            name: 'IFREMER',
            text: 'IFREMER',
            url: 'https://www.ifremer.fr',
        },
        {
            name: 'ARVAm',
            logo: '/assets/clients/arvam.avif',
            url: 'http://www.arvam.com',
        },
        {
            name: 'Fenua Environnement',
            logo: '/assets/clients/fenua.avif',
            url: 'http://www.fenua-environnement.com',
        },
        {
            name: 'Pareto',
            logo: '/assets/clients/paretoec.avif',
            url: 'http://www.paretoec.fr',
        },
        {
            name: 'Interoute',
            logo: '/assets/clients/interoute.avif',
        },
        {
            name: 'Le Criobe',
            logo: '/assets/clients/criobe.avif',
        },
        {
            name: 'TIAIMOANA',
            logo: '/assets/clients/tiaimoana.avif',
        },
        {
            name: 'Petrocean',
            logo: '/assets/clients/petrocean.avif',
        },
        {
            name: 'Service Public Polynesie Française',
            logo: '/assets/clients/spf.avif',
        },
        {
            name: 'SUB TECHNOLOGY',
            logo: '/assets/clients/subtech.avif',
        },
        {
            name: 'BAUDRY MARINE',
            logo: '/assets/clients/baudry.avif',
        },
        {
            name: 'PACIFIC',
            logo: '/assets/clients/pacific.avif',
        },
        {
            name: 'Hydroconsult',
            logo: '/assets/clients/hydroconsult.avif',
        },
        {
            name: 'Helimap System',
            logo: '/assets/clients/helimap.avif',
        },
        {
            name: 'MSE GROUP',
            logo: '/assets/clients/mse.avif',
        },
        {
            name: 'Memantic',
            logo: '/assets/clients/memantic.avif',
        },
    ];

    return (
        <section id="clients" className="bg-ocean-50 py-16 md:py-24">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="mb-16 text-center" data-aos="fade-up">
                    <h2 className="section-title">Nos Clients</h2>
                    <p className="section-subtitle">
                        Géopolynésie travaille avec des clients institutionnels et privés en Polynésie et à l'international.
                    </p>
                </div>

                {/* Testimonials */}
                <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="border-ocean-500 relative rounded-lg border-t-4 bg-white p-6"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="bg-ocean-500 absolute -top-4 right-6 rounded-full p-2">
                                <Star size={20} className="text-white" />
                            </div>
                            <p className="mb-6 text-gray-700 italic">{testimonial.content}</p>
                            <div className="mt-auto">
                                <p className="text-ocean-800 font-bold">{testimonial.author}</p>
                                <p className="text-sm text-gray-600">{testimonial.position}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Client Slider */}
                <div className="relative overflow-hidden" data-aos="fade-up">
                    <div className="slider">
                        <div className="slide-track">
                            {/* First set of clients */}
                            {clients.map((client, index) => (
                                <a key={`first-${index}`} href={client.url} target="_blank" rel="noopener noreferrer" className="slide">
                                    {client.logo ? (
                                        <img src={client.logo} alt={client.name} className="h-16 w-auto object-contain" />
                                    ) : (
                                        <span className="text-2xl font-bold text-gray-700">{client.text || client.name}</span>
                                    )}
                                </a>
                            ))}
                            {/* Duplicate set of clients for seamless scrolling */}
                            {clients.map((client, index) => (
                                <a key={`second-${index}`} href={client.url} target="_blank" rel="noopener noreferrer" className="slide">
                                    {client.logo ? (
                                        <img src={client.logo} alt={client.name} className="h-16 w-auto object-contain" />
                                    ) : (
                                        <span className="text-2xl font-bold text-gray-700">{client.text || client.name}</span>
                                    )}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .slider {
                    overflow: hidden;
                    padding: 20px 0;
                    background: transparent;
                    width: 100%;
                }

                .slide-track {
                    display: flex;
                    gap: 32px;
                    width: calc(250px * ${clients.length} * 2);
                    animation: scroll 40s linear infinite;
                }

                .slide {
                    flex-shrink: 0;
                    width: 200px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(calc(-250px * ${clients.length}));
                    }
                }

                .slide-track:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};

export default Clients;
