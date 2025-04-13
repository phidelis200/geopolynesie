"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, MapPin, Mail, Phone, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("geopolynesie@gmail.com");
  const [currentLocation, setCurrentLocation] = useState("Polynésie Française");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Presentations", path: "/presentation" },
    { name: "À propos", path: "/about-us" },
    { name: "Actualités", path: "/news" },
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

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Email and location animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentEmail((current) =>
          current === "geopolynesie@gmail.com"
            ? "surveyinternational.mada@gmail.com"
            : "geopolynesie@gmail.com"
        );
        setCurrentLocation((current) =>
          current === "Polynésie Française"
            ? "Madagascar"
            : "Polynésie Française"
        );
        setIsTransitioning(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300">
      {/* Top contact bar */}
      <div className="hidden md:block bg-ocean-900 text-white py-1.5">
        <div className="container max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="flex-shrink-0" />
              <span
                className={`whitespace-nowrap transition-opacity duration-300 ${
                  isTransitioning ? "opacity-0" : "opacity-100"
                }`}
              >
                {currentLocation}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail size={14} className="flex-shrink-0" />
              <a
                href={`mailto:${currentEmail}`}
                className={`hover:underline transition-opacity duration-300 ${
                  isTransitioning ? "opacity-0" : "opacity-100"
                }`}
              >
                {currentEmail}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone size={14} className="flex-shrink-0" />
            <a
              href="tel:+68987765849"
              className="hover:underline whitespace-nowrap"
            >
              +689 87765849
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div
        className={`${
          scrolled
            ? "bg-white shadow-md py-2"
            : "bg-white/90 backdrop-blur-md py-3 lg:py-4"
        } transition-all duration-300`}
      >
        <div className="container max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="relative z-20">
            <div className="flex items-center">
              <span
                className={`${
                  scrolled
                    ? "text-xl lg:text-2xl"
                    : "text-xl md:text-2xl lg:text-3xl"
                } font-bold text-ocean-800 transition-all duration-300`}
              >
                Géo<span className="text-ocean-500">polynésie</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-3 lg:px-4 py-2 rounded-md transition-colors duration-300 text-sm lg:text-base font-medium ${
                  pathname === link.path
                    ? "text-ocean-600 bg-ocean-50"
                    : "text-gray-700 hover:text-ocean-600 hover:bg-ocean-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button
              asChild
              className="ml-1 lg:ml-2 bg-ocean-600 hover:bg-ocean-700 text-white"
              size={isMobile ? "sm" : "default"}
            >
              <Link href="/contact-us" className="flex items-center gap-1">
                <Phone size={isMobile ? 14 : 16} />
                <span>Contact</span>
              </Link>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md text-gray-700 md:hidden focus:outline-none cursor-pointer z-40"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 bg-white z-10 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col h-full pt-16 px-4 overflow-y-auto">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`block px-4 py-2.5 text-base rounded-md ${
                  pathname === link.path
                    ? "text-ocean-600 bg-ocean-50 font-medium"
                    : "text-gray-700 hover:text-ocean-600 hover:bg-ocean-50"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <Button
              asChild
              className="w-full mt-4 bg-ocean-600 hover:bg-ocean-700 text-white"
              size="default"
            >
              <Link
                href="/contact-us"
                className="flex items-center justify-center gap-2"
              >
                <Phone size={18} />
                <span>Nous contacter</span>
              </Link>
            </Button>
          </div>

          {/* Mobile contact info */}
          <div className="mt-6 border-t border-gray-200 pt-4 space-y-3">
            <div className="flex items-center gap-2.5">
              <MapPin size={18} className="text-ocean-500 flex-shrink-0" />
              <span>Polynésie Française</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail size={18} className="text-ocean-500 flex-shrink-0" />
              <a
                href="mailto:contact@geopolynesie.com"
                className="hover:underline break-all"
              >
                contact@geopolynesie.com
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone size={18} className="text-ocean-500 flex-shrink-0" />
              <a href="tel:+689123456" className="hover:underline">
                +689 12 34 56
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
