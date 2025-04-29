import { Link } from '@inertiajs/react';
import { Anchor, ArrowRight, MapPin, Ship } from 'lucide-react';
import { useEffect, useState } from 'react';

const Hero = () => {
    const [activeImage, setActiveImage] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const images = ['/assets/image-8.jpg', '/assets/image4.jpg', '/assets/image-9.jpg', '/assets/image7.jpg', '/assets/image-4.jpg'];

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setActiveImage((current) => (current + 1) % images.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [isPaused, images.length]);

    return (
        <div className="from-ocean-900 to-ocean-700 relative overflow-hidden bg-gradient-to-r text-white">
            {/* Background pattern and overlay */}
            <div className="bg-topo-pattern absolute inset-0 opacity-20"></div>
            <div className="bg-wave-pattern absolute right-0 bottom-0 left-0 h-16 bg-bottom bg-repeat-x opacity-40"></div>

            <div className="relative z-10 container mx-auto max-w-7xl px-4 py-20 lg:py-28">
                <div className="flex flex-col items-center gap-12 lg:flex-row">
                    <div className="mb-10 w-full lg:mb-0 lg:w-1/2 lg:pr-8" data-aos="fade-right">
                        <span className="bg-ocean-500 mb-4 inline-block rounded-full px-4 py-1 text-sm font-medium text-white">
                            Experts en hydrographie et topographie
                        </span>
                        <h1 className="mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
                            <span className="block">Société d'hydrographie</span>
                            <span className="text-ocean-100 block">et de topographie</span>
                        </h1>
                        <p className="text-ocean-50 mb-8 max-w-lg text-lg md:text-xl">
                            Géopolynésie, fondée en 2005, offre des services d'hydrographie, de topographie et de cartographie de haute précision en
                            Polynésie Française et dans le monde entier.
                        </p>

                        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                            <div className="text-ocean-100 flex items-center gap-2">
                                <MapPin size={18} className="text-ocean-300" />
                                <span>Basé en Polynésie Française et à Madagascar</span>
                            </div>
                            <div className="text-ocean-100 flex items-center gap-2">
                                <Anchor size={18} className="text-ocean-300" />
                                <span>Expertise maritime depuis 2005</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <div>
                                <Link href="/services" className="btn-ocean border-2 px-6 py-3">
                                    Nos Services <ArrowRight size={20} />
                                </Link>
                            </div>
                            <div>
                                <Link href="/contact-us" className="btn-outline-ocean">
                                    Contactez-nous
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="relative w-full lg:w-1/2" data-aos="fade-left">
                        <div className="relative z-10 overflow-hidden rounded-lg bg-white p-2">
                            {/* Carousel container */}
                            <div className="relative h-[400px] w-full" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
                                {images.map((src, index) => (
                                    <div
                                        key={src}
                                        className="absolute inset-0 transition-opacity duration-1000"
                                        style={{
                                            opacity: index === activeImage ? 1 : 0,
                                        }}
                                    >
                                        <img src={src} alt={`Image ${index + 1}`} className="h-full w-full rounded object-cover" />
                                    </div>
                                ))}

                                {/* Add navigation dots */}
                                <div className="absolute right-4 bottom-4 flex gap-2">
                                    {images.map((_, index) => (
                                        <button
                                            key={index}
                                            className={`h-2 w-2 cursor-pointer rounded-full transition-all ${
                                                index === activeImage ? 'scale-125 bg-white' : 'bg-white/50'
                                            }`}
                                            onClick={() => setActiveImage(index)}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="bg-ocean-600/90 absolute bottom-4 left-4 rounded-lg p-3 shadow-lg backdrop-blur-sm">
                                <div className="flex items-center gap-2">
                                    <Ship size={18} className="text-white" />
                                    <span className="font-medium text-white">Basé en Polynésie française et à Madagascar</span>
                                </div>
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="bg-ocean-500 absolute -bottom-6 -left-6 -z-10 h-24 w-24 rounded-lg"></div>
                        <div className="bg-ocean-300 absolute -top-6 -right-6 -z-10 h-24 w-24 rounded-lg"></div>
                        <div className="bg-ocean-400 absolute top-1/2 right-1/2 -z-10 h-12 w-12 rounded-full opacity-50"></div>

                        {/* Pattern overlay for the image */}
                        <div className="bg-topo-pattern pointer-events-none absolute inset-0 z-10 opacity-10 mix-blend-overlay"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
