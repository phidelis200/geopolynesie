import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import Service from '@/components/services/Service';
import Provider from '@/provider';
import { Head } from '@inertiajs/react';

export default function ServicesPage() {
    return (
        <>
            <Head>
                <title>Services - Géopolynésie</title>
                <meta
                    name="description"
                    content="Découvrez nos services d'hydrographie, topographie, bathymétrie, cartographie et géodésie en Polynésie Française. Expertise complète en mesures et cartographie marine."
                />
                <meta
                    name="keywords"
                    content="hydrographie, topographie, Polynésie Française, cartographie marine, bathymétrie, Madagascar, géodésie, courantologie, marégraphie, levés bathymétriques, cartographie marine"
                />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="fr_FR" />
                <meta property="og:site_name" content="Géopolynésie" />
                <meta property="og:title" content="Services - Géopolynésie" />
                <meta
                    property="og:description"
                    content="Découvrez nos services d'hydrographie, topographie, bathymétrie, cartographie et géodésie en Polynésie Française. Expertise complète en mesures et cartographie marine."
                />
                <meta property="og:image" content="https://www.geopolynesie.com/assets/image4.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="Géopolynésie" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Services - Géopolynésie" />
                <meta
                    name="twitter:description"
                    content="Découvrez nos services d'hydrographie, topographie, bathymétrie, cartographie et géodésie en Polynésie Française. Expertise complète en mesures et cartographie marine."
                />
                <meta name="twitter:image" content="https://www.geopolynesie.com/assets/image4.jpg" />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <Provider>
                <div className="flex min-h-screen flex-col bg-white">
                    <Navbar />
                    <Service />
                    <Footer />
                </div>
            </Provider>
        </>
    );
}
