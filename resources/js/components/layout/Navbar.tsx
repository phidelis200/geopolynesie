import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link, usePage } from '@inertiajs/react';
import { Mail, MapPin, Menu, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [currentEmail, setCurrentEmail] = useState('geopolynesie@gmail.com');
    const [currentLocation, setCurrentLocation] = useState('Polynésie Française');
    const [isTransitioning, setIsTransitioning] = useState(false);
    const { url } = usePage();
    const isMobile = useIsMobile();

    const navLinks = [
        { name: 'Services', path: '/services' },
        { name: 'Presentations', path: '/presentation' },
        { name: 'À propos', path: '/about-us' },
        { name: 'Actualités', path: '/news' },
    ];

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Close mobile menu when changing routes
    useEffect(() => {
        setIsMenuOpen(false);
    }, []);

    // Email and location animation
    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentEmail((current) =>
                    current === 'geopolynesie@gmail.com' ? 'surveyinternational.mada@gmail.com' : 'geopolynesie@gmail.com',
                );
                setCurrentLocation((current) => (current === 'Polynésie Française' ? 'Madagascar' : 'Polynésie Française'));
                setIsTransitioning(false);
            }, 300);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <header className="fixed top-0 z-50 w-full transition-all duration-300">
            {/* Top contact bar */}
            <div className="bg-ocean-900 hidden py-1.5 text-white md:block">
                <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 text-sm font-medium">
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center gap-1.5">
                            <MapPin size={14} className="mt-1 flex-shrink-0" />
                            <span className={`whitespace-nowrap transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                                {currentLocation}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Mail size={14} className="mt-1 flex-shrink-0" />
                            <a
                                href={`mailto:${currentEmail}`}
                                className={`transition-opacity duration-300 hover:underline ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
                            >
                                {currentEmail}
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Phone size={14} className="flex-shrink-0" />
                        <a href="tel:+68987765849" className="whitespace-nowrap hover:underline">
                            +689 87765849
                        </a>
                    </div>
                </div>
            </div>

            {/* Main navbar */}
            <div className={`${scrolled ? 'bg-white py-2 shadow-md' : 'bg-white/90 py-3 backdrop-blur-md lg:py-4'} transition-all duration-300`}>
                <div className="container mx-auto flex max-w-7xl items-center justify-between px-4">
                    {/* Logo */}
                    <Link href="/" className="relative z-20">
                        <div className="flex items-center">
                            <span
                                className={`${
                                    scrolled ? 'text-xl lg:text-2xl' : 'text-xl md:text-2xl lg:text-3xl'
                                } text-ocean-800 font-bold transition-all duration-300`}
                            >
                                Géo<span className="text-ocean-500">polynésie</span>
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center space-x-1 md:flex">
                        <Link
                            href="/"
                            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors duration-300 lg:px-4 lg:text-base ${
                                url === '/' ? 'text-ocean-600 bg-ocean-50' : 'hover:text-ocean-600 hover:bg-ocean-50 text-gray-700'
                            }`}
                        >
                            Accueil
                        </Link>
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors duration-300 lg:px-4 lg:text-base ${
                                    url.startsWith(link.path) ? 'text-ocean-600 bg-ocean-50' : 'hover:text-ocean-600 hover:bg-ocean-50 text-gray-700'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Button asChild className="bg-ocean-600 hover:bg-ocean-700 ml-1 text-white lg:ml-2" size={isMobile ? 'sm' : 'default'}>
                            <Link href="/contact-us" className="flex items-center gap-1">
                                <Phone size={isMobile ? 14 : 16} />
                                <span>Contact</span>
                            </Link>
                        </Button>
                    </nav>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="z-40 cursor-pointer rounded-md p-2 text-gray-700 focus:outline-none md:hidden"
                        aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div
                className={`fixed inset-0 z-10 transform bg-white transition-transform duration-300 ease-in-out ${
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                } md:hidden`}
            >
                <div className="flex h-full flex-col overflow-y-auto px-4 pt-16">
                    <div className="space-y-2">
                        <Link
                            href="/"
                            className={`block rounded-md px-4 py-2.5 text-base ${
                                url === '/' ? 'text-ocean-600 bg-ocean-50 font-medium' : 'hover:text-ocean-600 hover:bg-ocean-50 text-gray-700'
                            }`}
                        >
                            Accueil
                        </Link>
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={`block rounded-md px-4 py-2.5 text-base ${
                                    url === link.path
                                        ? 'text-ocean-600 bg-ocean-50 font-medium'
                                        : 'hover:text-ocean-600 hover:bg-ocean-50 text-gray-700'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <Button asChild className="bg-ocean-600 hover:bg-ocean-700 mt-4 w-full text-white" size="default">
                            <Link href="/contact-us" className="flex items-center justify-center gap-2">
                                <Phone size={18} />
                                <span>Nous contacter</span>
                            </Link>
                        </Button>
                    </div>

                    {/* Mobile contact info */}
                    <div className="mt-6 space-y-3 border-t border-gray-200 pt-4">
                        <div className="flex items-center gap-2.5">
                            <MapPin size={18} className="text-ocean-500 flex-shrink-0" />
                            <span className="text-base text-gray-700">{currentLocation}</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <Mail size={18} className="text-ocean-500 flex-shrink-0" />
                            <a href={`mailto:${currentEmail}`} className="text-base break-all text-gray-700 hover:underline">
                                {currentEmail}
                            </a>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <Phone size={18} className="text-ocean-500 flex-shrink-0" />
                            <a href="tel:+68987765849" className="text-base text-gray-700 hover:underline">
                                +689 87765849
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
