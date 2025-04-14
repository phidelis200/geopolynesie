"use client";

import React, { useEffect } from "react";
import { Anchor, ArrowRight, MapPin, Ship } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  const [activeImage, setActiveImage] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const images = [
    "/assets/image-8.jpg",
    "/assets/image4.jpg",
    "/assets/image-9.jpg",
    "/assets/image7.jpg",
    "/assets/image-4.jpg",
  ];

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveImage((current) => (current + 1) % images.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isPaused, images.length]);

  return (
    <div className="relative bg-gradient-to-r from-ocean-900 to-ocean-700 text-white overflow-hidden">
      {/* Background pattern and overlay */}
      <div className="absolute inset-0 bg-topo-pattern opacity-20"></div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-wave-pattern bg-repeat-x bg-bottom opacity-40"></div>

      <div className="container max-w-7xl mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 md:pr-8 mb-10 md:mb-0" data-aos="fade-right">
            <span className="inline-block bg-ocean-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
              Experts en hydrographie et topographie
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="block">Société d'hydrographie</span>
              <span className="block text-ocean-100">et de topographie</span>
            </h1>
            <p className="text-lg md:text-xl text-ocean-50 mb-8 max-w-lg">
              Géopolynésie, fondée en 2005, offre des services d'hydrographie,
              de topographie et de cartographie de haute précision en Polynésie
              Française et dans le monde entier.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-ocean-100">
                <MapPin size={18} className="text-ocean-300" />
                <span>Basé en Polynésie Française et à Madagascar</span>
              </div>
              <div className="flex items-center gap-2 text-ocean-100">
                <Anchor size={18} className="text-ocean-300" />
                <span>Expertise maritime depuis 2005</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div>
                <Link href="/services" className="btn-ocean px-6 py-3 border-2">
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

          <div
            className="md:w-1/2 relative"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <div className="rounded-lg overflow-hidden bg-white p-2 relative z-10">
              {/* Carousel container */}
              <div
                className="relative w-full h-[400px]"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {images.map((src, index) => (
                  <div
                    key={src}
                    className="absolute inset-0 transition-opacity duration-1000"
                    style={{
                      opacity: index === activeImage ? 1 : 0,
                    }}
                  >
                    <Image
                      src={src}
                      fill
                      priority
                      alt={`Image ${index + 1}`}
                      className="object-cover rounded"
                    />
                  </div>
                ))}

                {/* Add navigation dots */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                        index === activeImage
                          ? "bg-white scale-125"
                          : "bg-white/50"
                      }`}
                      onClick={() => setActiveImage(index)}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-ocean-600/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <Ship size={18} className="text-white" />
                  <span className="text-white font-medium">
                    Courantologie basé en Polynésie française et à Madagascar
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-ocean-500 rounded-lg -z-10"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-ocean-300 rounded-lg -z-10"></div>
            <div className="absolute top-1/2 right-1/2 w-12 h-12 bg-ocean-400 rounded-full -z-10 opacity-50"></div>

            {/* Pattern overlay for the image */}
            <div className="absolute inset-0 bg-topo-pattern opacity-10 mix-blend-overlay z-10 pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-background z-10"></div>
    </div>
  );
};

export default Hero;
