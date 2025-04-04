"use client";

import React, { useState } from "react";
import { MapPin, Mail, Phone, Globe, Send, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-ocean-50">
      <div className="text-center">
        <Globe size={64} className="text-ocean-500 mx-auto mb-4" />
        <p className="text-gray-700">Chargement de la carte...</p>
      </div>
    </div>
  ),
  ssr: false,
});

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast({
        title: "Message envoyé",
        description: "Nous vous répondrons dans les plus brefs délais.",
        variant: "default",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactDetails = [
    {
      icon: <MapPin size={24} className="text-ocean-500" />,
      title: "Adresse",
      details: "Polynésie Française",
    },
    {
      icon: <Phone size={24} className="text-ocean-500" />,
      title: "Téléphone",
      details: "+689 12 34 56",
    },
    {
      icon: <Mail size={24} className="text-ocean-500" />,
      title: "Email",
      details: "contact@geopolynesie.com",
    },
    {
      icon: <Globe size={24} className="text-ocean-500" />,
      title: "Site Web",
      details: "www.geopolynesie.com",
    },
  ];

  const serviceOptions = [
    "Hydrographie",
    "Topographie",
    "Bathymétrie",
    "Cartographie",
    "Géodésie",
    "Conseil et expertise",
    "Autre",
  ];

  return (
    <main className="flex-grow pt-24">
      {/* Header */}
      <div
        className="bg-ocean-800 text-white py-16 md:py-24"
        data-aos="fade-down"
      >
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Contactez-Nous
          </h1>
          <p className="text-xl text-ocean-100 max-w-3xl mx-auto">
            Vous avez un projet ou des questions? N'hésitez pas à nous
            contacter, notre équipe vous répondra dans les plus brefs délais.
          </p>
        </div>
      </div>

      <div className="py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Contact Details */}
            <div className="lg:w-1/3" data-aos="fade-right">
              <h2 className="text-2xl font-bold text-ocean-800 mb-8">
                Nos Coordonnées
              </h2>

              <div className="space-y-8 mb-12">
                {contactDetails.map((item, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4 mt-1">{item.icon}</div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.details}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-ocean-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <MessageSquare size={20} className="text-ocean-600 mr-2" />
                  <h3 className="font-bold text-ocean-800">
                    Heures d'ouverture
                  </h3>
                </div>
                <p className="text-gray-700 mb-2">
                  Lundi - Vendredi: 8h00 - 17h00
                </p>
                <p className="text-gray-700">
                  Fermé les week-ends et jours fériés
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div
              className="lg:w-2/3 bg-white rounded-lg border p-8"
              data-aos="fade-left"
            >
              <h2 className="text-2xl font-bold text-ocean-800 mb-6">
                Envoyez-nous un message
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-2">
                      Nom*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2">
                      Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-gray-700 mb-2"
                    >
                      Service*
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-500"
                      required
                    >
                      <option value="" disabled>
                        Sélectionnez un service
                      </option>
                      {serviceOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 mb-2">
                    Message*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-500"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn-ocean w-full md:w-auto cursor-pointer"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Envoi en cours...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send size={18} className="mr-2" />
                      Envoyer le message
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="py-16 bg-ocean-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="section-title" data-aos="fade-up">
            Rayonnement Géographique
          </h2>
          <p
            className="section-subtitle"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Géopolynésie intervient principalement en Polynésie Française mais
            étend son expertise au Pacifique Sud et à l'Océan Indien grâce à son
            réseau de partenaires.
          </p>

          <div
            className="bg-white rounded-lg p-8 mt-8"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <div className="h-[500px] w-full">
              <MapComponent />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
