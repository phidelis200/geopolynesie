import { Globe, Mail, MapPin, MessageSquare, Phone, Send } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import DynamicMap from './DynamicMap';

type ContactDetails = {
    icon: React.ReactNode;
    title: string;
    details_1: string;
    details_2?: string;
};

const ContactUs = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        try {
            const response = await fetch('/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 422) {
                    setErrors(data.errors);
                    toast('Veuillez vérifier les champs du formulaire.');
                    return;
                }
                throw new Error(data.message || 'Failed to send message');
            }

            toast('Message envoyé \n\n Nous vous répondrons dans les plus brefs délais.');

            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
            });
        } catch (error: any) {
            toast("Une erreur est survenue lors de l'envoi du message.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactDetails: ContactDetails[] = [
        {
            icon: <MapPin size={24} className="text-ocean-500" />,
            title: 'Adresse',
            details_1: 'BP 44041',
            details_2: '98713 Papeete, Polynésie Française',
        },
        {
            icon: <Phone size={24} className="text-ocean-500" />,
            title: 'Téléphone',
            details_1: '+689 87765849',
        },
        {
            icon: <Mail size={24} className="text-ocean-500" />,
            title: 'Email',
            details_1: 'geopolynesie@gmail.com',
            details_2: 'surveyinternational.mada@gmail.com',
        },
        {
            icon: <Globe size={24} className="text-ocean-500" />,
            title: 'Site Web',
            details_1: 'www.geopolynesie.com',
        },
    ];
    return (
        <main className="flex-grow pt-24">
            {/* Header */}
            <div className="bg-ocean-800 py-16 text-white md:py-24" data-aos="fade-down">
                <div className="container mx-auto max-w-7xl px-4 text-center">
                    <h1 className="mb-6 text-4xl font-bold md:text-5xl">Contactez-Nous</h1>
                    <p className="text-ocean-100 mx-auto max-w-3xl text-xl">
                        Vous avez un projet ou des questions? N'hésitez pas à nous contacter, notre équipe vous répondra dans les plus brefs délais.
                    </p>
                </div>
            </div>

            <div className="py-16">
                <div className="container mx-auto max-w-7xl px-4">
                    <div className="flex flex-col gap-12 lg:flex-row">
                        {/* Contact Details */}
                        <div className="lg:w-1/3" data-aos="fade-right">
                            <h2 className="text-ocean-800 mb-8 text-2xl font-bold">Nos Coordonnées</h2>

                            <div className="mb-12 space-y-8">
                                {contactDetails.map((item, index) => (
                                    <div key={index} className="flex">
                                        <div className="mt-1 mr-4">{item.icon}</div>
                                        <div>
                                            <h3 className="mb-1 font-bold text-gray-800">{item.title}</h3>
                                            <p className="text-gray-600">
                                                {item.details_1} {item.details_2 && '/'} {item.details_2}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-ocean-50 rounded-lg p-6">
                                <div className="mb-4 flex items-center">
                                    <MessageSquare size={20} className="text-ocean-600 mr-2" />
                                    <h3 className="text-ocean-800 font-bold">Heures d'ouverture</h3>
                                </div>
                                <p className="mb-2 text-gray-700">Lundi - Samedi: 7h00 - 18h00</p>
                                <p className="text-gray-700">Fermé le dimanche et jours fériés</p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="rounded-lg border border-gray-200 bg-white p-8 lg:w-2/3" data-aos="fade-left">
                            <h2 className="text-ocean-800 mb-6 text-2xl font-bold">Envoyez-nous un message</h2>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="name" className="mb-2 block text-gray-700">
                                            Nom et prénom*
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`focus:ring-ocean-500 w-full rounded-md border ${
                                                errors.name ? 'border-red-500' : 'border-gray-300'
                                            } px-4 py-2 text-gray-700 focus:ring-2 focus:outline-none`}
                                            required
                                            placeholder="Votre nom et prénom.."
                                        />
                                        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="mb-2 block text-gray-700">
                                            E-mail*
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`focus:ring-ocean-500 w-full rounded-md border ${
                                                errors.email ? 'border-red-500' : 'border-gray-300'
                                            } px-4 py-2 text-gray-700 focus:ring-2 focus:outline-none`}
                                            required
                                            placeholder="Votre e-mail..."
                                        />
                                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                                    </div>
                                </div>

                                <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="phone" className="mb-2 block text-gray-700">
                                            Téléphone
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className={`focus:ring-ocean-500 w-full rounded-md border ${
                                                errors.phone ? 'border-red-500' : 'border-gray-300'
                                            } px-4 py-2 text-gray-700 focus:ring-2 focus:outline-none`}
                                            placeholder="Votre téléphone..."
                                        />
                                        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="mb-2 block text-gray-700">
                                            Objet*
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className={`focus:ring-ocean-500 w-full rounded-md border ${
                                                errors.subject ? 'border-red-500' : 'border-gray-300'
                                            } px-4 py-2 text-gray-700 focus:ring-2 focus:outline-none`}
                                            placeholder="Objet..."
                                        />
                                        {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="message" className="mb-2 block text-gray-700">
                                        Message*
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        className={`focus:ring-ocean-500 w-full rounded-md border ${
                                            errors.message ? 'border-red-500' : 'border-gray-300'
                                        } px-4 py-2 text-gray-700 focus:ring-2 focus:outline-none`}
                                        required
                                        placeholder="Ecrire message..."
                                    ></textarea>
                                    {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                                </div>

                                <button type="submit" className="btn-ocean w-full cursor-pointer md:w-auto" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center">
                                            <svg
                                                className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
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
            <div className="bg-ocean-50 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="section-title" data-aos="fade-up">
                        Rayonnement Géographique
                    </h2>
                    <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
                        Géopolynésie intervient principalement en Polynésie Française mais étend son expertise au Pacifique Sud et à l'Océan Indien
                        grâce à son réseau de partenaires.
                    </p>

                    <div className="mt-8 rounded-lg bg-white p-2" data-aos="zoom-in" data-aos-delay="200">
                        <div className="h-[500px] w-full">
                            <DynamicMap />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ContactUs;
