"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const galleryImages = [
    {
      src: "/assets/image-2.jpg",
      alt: "Paysage maritime polynésien",
      caption: "Relevé topographique des côtes polynésiennes",
    },
    {
      src: "/assets/image-8.jpg",
      alt: "Travaux hydrographiques",
      caption: "Travaux hydrographiques dans un lagon",
    },
    {
      src: "/assets/image-15.jpg",
      alt: "Cartographie sous-marine",
      caption: "Cartographie des récifs coralliens",
    },
    {
      src: "/assets/image-11.jpg",
      alt: "Équipement de mesure",
      caption: "Utilisation de nos équipements de mesure",
    },
    {
      src: "/assets/image-13.jpg",
      alt: "Relevés topographiques",
      caption: "Relevés topographiques sur une île",
    },
    {
      src: "/assets/image-17.jpg",
      alt: "Relevés topographiques",
      caption: "Relevés topographiques sur une île",
    },
  ];

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
    // Disable body scroll when lightbox is open
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    // Re-enable body scroll when lightbox is closed
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  // Handle key presses for lightbox navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen]);

  return (
    <section id="gallery" className="py-16 md:py-24">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="section-title">Notre Galerie</h2>
          <p className="section-subtitle">
            Découvrez nos projets et missions à travers la Polynésie Française
            et au-delà.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg shadow-md cursor-pointer group relative"
              onClick={() => openLightbox(index)}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <Image
                src={image.src}
                width={500}
                height={500}
                priority
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white p-4">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxOpen && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
            <button
              className="absolute top-4 right-4 text-white p-2 cursor-pointer"
              onClick={closeLightbox}
            >
              <X size={32} />
            </button>

            <button
              className="absolute left-4 text-white p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
              onClick={prevImage}
            >
              <ChevronLeft size={32} />
            </button>

            <div className="max-w-4xl max-h-[80vh] relative">
              <Image
                width={800}
                height={600}
                src={galleryImages[currentImage].src}
                alt={galleryImages[currentImage].alt}
                className="max-w-full max-h-[80vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 text-center">
                {galleryImages[currentImage].caption}
              </div>
            </div>

            <button
              className="absolute right-4 text-white p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
              onClick={nextImage}
            >
              <ChevronRight size={32} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
