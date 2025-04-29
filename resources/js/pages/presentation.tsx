import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import Presentation from '@/components/presentation/Presentation';
import Provider from '@/provider';
import { Head } from '@inertiajs/react';

export default function PresentationPage() {
    return (
        <>
            <Head>
                <title>Présentation - Géopolynésie</title>
                <meta
                    name="description"
                    content="Découvrez les services et l'expertise de Géopolynésie en matière d'hydrographie et de topographie en Polynésie Française."
                />
                <meta
                    name="keywords"
                    content="hydrographie, topographie, Polynésie Française, cartographie marine, bathymétrie, Madagascar, géodésie, courantologie, marégraphie, levés bathymétriques, cartographie marine"
                />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="fr_FR" />
                <meta property="og:site_name" content="Géopolynésie" />
                <meta property="og:title" content="Présentation - Géopolynésie" />
                <meta
                    property="og:description"
                    content="Découvrez les services et l'expertise de Géopolynésie en matière d'hydrographie et de topographie en Polynésie Française."
                />
                <meta property="og:image" content="https://www.geopolynesie.com/assets/image4.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="Géopolynésie" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Présentation - Géopolynésie" />
                <meta
                    name="twitter:description"
                    content="Découvrez les services et l'expertise de Géopolynésie en matière d'hydrographie et de topographie en Polynésie Française."
                />
                <meta name="twitter:image" content="https://www.geopolynesie.com/assets/image4.jpg" />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <Provider>
                <div className="flex min-h-screen flex-col bg-white">
                    <Navbar />
                    <Presentation />
                    <Footer />
                </div>
            </Provider>
        </>
    );
}
