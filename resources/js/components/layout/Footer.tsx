import { Link } from '@inertiajs/react';
import { Facebook, Globe, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-ocean-900 text-white">
            {/* Wave divider */}
            <div className="bg-wave-pattern h-10 rotate-180 bg-bottom bg-repeat-x"></div>

            <div className="container mx-auto max-w-7xl px-4 py-12">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
                    {/* Company Info */}
                    <div>
                        <h3 className="mb-4 text-xl font-bold">
                            Géo<span className="text-ocean-300">polynésie</span>
                        </h3>
                        <p className="text-ocean-100 mb-4 leading-relaxed">
                            Société d'hydrographie et de topographie, créée en 2005 en Polynésie Française par Christian Friot, hydrographe catégorie
                            B (FIG-OHI-ACI) formé au SHOM.
                        </p>
                        <div className="mt-6 flex space-x-4">
                            <a href="#" className="text-ocean-300 transition-colors duration-300 hover:text-white">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="text-ocean-300 transition-colors duration-300 hover:text-white">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="text-ocean-300 transition-colors duration-300 hover:text-white">
                                <Linkedin size={20} />
                            </a>
                            <a href="#" className="text-ocean-300 transition-colors duration-300 hover:text-white">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-4 text-xl font-bold">Liens Rapides</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-ocean-100 flex items-center transition-colors duration-300 hover:text-white">
                                    <span className="mr-2">›</span> Accueil
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="text-ocean-100 flex items-center transition-colors duration-300 hover:text-white">
                                    <span className="mr-2">›</span> Services
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/presentation"
                                    className="text-ocean-100 flex items-center transition-colors duration-300 hover:text-white"
                                >
                                    <span className="mr-2">›</span> Presentations
                                </Link>
                            </li>
                            <li>
                                <Link href="/about-us" className="text-ocean-100 flex items-center transition-colors duration-300 hover:text-white">
                                    <span className="mr-2">›</span> À propos
                                </Link>
                            </li>
                            <li>
                                <Link href="/news" className="text-ocean-100 flex items-center transition-colors duration-300 hover:text-white">
                                    <span className="mr-2">›</span> Actualités
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact-us" className="text-ocean-100 flex items-center transition-colors duration-300 hover:text-white">
                                    <span className="mr-2">›</span> Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="mb-4 text-xl font-bold">Nos Services</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/services#hydrographie"
                                    className="text-ocean-100 flex items-center transition-colors duration-300 hover:text-white"
                                >
                                    <span className="mr-2">›</span> Hydrographie
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services#topographie"
                                    className="text-ocean-100 flex items-center transition-colors duration-300 hover:text-white"
                                >
                                    <span className="mr-2">›</span> Topographie
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services#cartographie"
                                    className="text-ocean-100 flex items-center transition-colors duration-300 hover:text-white"
                                >
                                    <span className="mr-2">›</span> Cartographie
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services#geodesie"
                                    className="text-ocean-100 flex items-center transition-colors duration-300 hover:text-white"
                                >
                                    <span className="mr-2">›</span> Géodésie
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services#courantologie"
                                    className="text-ocean-100 flex items-center transition-colors duration-300 hover:text-white"
                                >
                                    <span className="mr-2">›</span> Courantologie
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services#maregraphie"
                                    className="text-ocean-100 flex items-center transition-colors duration-300 hover:text-white"
                                >
                                    <span className="mr-2">›</span> Marégraphie
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="mb-4 text-xl font-bold">Contact</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <MapPin size={20} className="text-ocean-300 mt-1 flex-shrink-0" />
                                <span className="text-ocean-100">Polynésie Française et Madagascar</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone size={20} className="text-ocean-300 flex-shrink-0" />
                                <a href="tel:+68987765849" className="text-ocean-100 transition-colors duration-300 hover:text-white">
                                    +689 87765849
                                </a>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail size={20} className="text-ocean-300 flex-shrink-0" />
                                <div className="flex flex-col">
                                    <a
                                        href="mailto:geopolynesie@gmail.com"
                                        className="text-ocean-100 transition-colors duration-300 hover:text-white"
                                    >
                                        geopolynesie@gmail.com
                                    </a>
                                    <a
                                        href="mailto:surveyinternational.mada@gmail.com"
                                        className="text-ocean-100 transition-colors duration-300 hover:text-white"
                                    >
                                        surveyinternational.mada@gmail.com
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Globe size={20} className="text-ocean-300 flex-shrink-0" />
                                <a href="https://www.geopolynesie.com" className="text-ocean-100 transition-colors duration-300 hover:text-white">
                                    www.geopolynesie.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-ocean-800 text-ocean-300 border-t py-6 text-center">
                <div className="container mx-auto px-4">
                    <p>&copy; {new Date().getFullYear()} Géopolynésie. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
