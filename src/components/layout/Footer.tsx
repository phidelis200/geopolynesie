import React from "react";
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-ocean-900 text-white">
      {/* Wave divider */}
      <div className="h-10 bg-wave-pattern bg-repeat-x bg-bottom rotate-180"></div>

      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Géo<span className="text-ocean-300">polynésie</span>
            </h3>
            <p className="mb-4 text-ocean-100 leading-relaxed">
              Société d'hydrographie et de topographie, créée en 2005 en
              Polynésie Française par Christian Friot, hydrographe catégorie B
              (FIG-OHI-ACI) formé au SHOM.
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="#"
                className="text-ocean-300 hover:text-white transition-colors duration-300"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-ocean-300 hover:text-white transition-colors duration-300"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-ocean-300 hover:text-white transition-colors duration-300"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-ocean-300 hover:text-white transition-colors duration-300"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services"
                  className="text-ocean-100 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2">›</span> Services
                </Link>
              </li>
              <li>
                <Link
                  href="/presentation"
                  className="text-ocean-100 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2">›</span> Presentations
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="text-ocean-100 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2">›</span> À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-ocean-100 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2">›</span> Actualités
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-ocean-100 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2">›</span> Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Nos Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services#hydrographie"
                  className="text-ocean-100 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2">›</span> Hydrographie
                </Link>
              </li>
              <li>
                <Link
                  href="/services#topographie"
                  className="text-ocean-100 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2">›</span> Topographie
                </Link>
              </li>
              <li>
                <Link
                  href="/services#cartographie"
                  className="text-ocean-100 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2">›</span> Cartographie
                </Link>
              </li>
              <li>
                <Link
                  href="/services#bathymetrie"
                  className="text-ocean-100 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2">›</span> Bathymétrie
                </Link>
              </li>
              <li>
                <Link
                  href="/services#geodesie"
                  className="text-ocean-100 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2">›</span> Géodésie
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin
                  size={20}
                  className="text-ocean-300 mt-1 flex-shrink-0"
                />
                <span className="text-ocean-100">Polynésie Française</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-ocean-300 flex-shrink-0" />
                <a
                  href="tel:+689123456"
                  className="text-ocean-100 hover:text-white transition-colors duration-300"
                >
                  +689 12 34 56
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-ocean-300 flex-shrink-0" />
                <a
                  href="mailto:contact@geopolynesie.com"
                  className="text-ocean-100 hover:text-white transition-colors duration-300"
                >
                  contact@geopolynesie.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Globe size={20} className="text-ocean-300 flex-shrink-0" />
                <a
                  href="https://www.geopolynesie.com"
                  className="text-ocean-100 hover:text-white transition-colors duration-300"
                >
                  www.geopolynesie.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-ocean-800 py-6 text-center text-ocean-300">
        <div className="container mx-auto px-4">
          <p>
            &copy; {new Date().getFullYear()} Géopolynésie. Tous droits
            réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
