import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import Provider from '@/provider';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, CompassIcon } from 'lucide-react';

export default function NotFoundPage() {
    return (
        <>
            <Head>
                <title>404 - Géopolynésie </title>
            </Head>
            <Provider>
                <div className="flex min-h-screen flex-col">
                    <Navbar />
                    <div className="bg-ocean-800 py-16 text-white md:py-24">
                        <div className="container mx-auto max-w-7xl px-4 text-center">
                            <div className="mb-8">
                                <CompassIcon size={64} className="text-ocean-300 mx-auto" />
                            </div>
                            <h1 className="mb-6 text-4xl font-bold md:text-5xl">404</h1>
                            <p className="text-ocean-100 mx-auto max-w-3xl text-xl">La page que vous recherchez n'existe pas ou a été déplacée.</p>
                        </div>
                    </div>

                    <div className="py-16">
                        <div className="container mx-auto max-w-2xl px-4 text-center">
                            <h2 className="text-ocean-800 mb-6 text-2xl font-bold">Vous êtes perdu?</h2>
                            <p className="mb-8 text-gray-600">
                                Ne vous inquiétez pas, notre équipe d'experts en navigation peut vous guider vers votre destination.
                            </p>
                            <Link href="/" className="btn-ocean inline-flex items-center px-6 py-3">
                                <ArrowLeft size={20} className="mr-2" />
                                Retour à l'accueil
                            </Link>
                        </div>
                    </div>
                    <Footer />
                </div>
            </Provider>
        </>
    );
}
