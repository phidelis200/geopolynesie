import ContactUs from '@/components/contact-us/ContactUs';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import Provider from '@/provider';
import { Head } from '@inertiajs/react';

export default function ContactUsPage() {
    return (
        <>
            <Head>
                <title>Contact - Géopolynésie</title>
                <meta
                    name="description"
                    content="Contactez Géopolynésie pour vos projets d'hydrographie et de topographie en Polynésie Française. Experts en cartographie marine et terrestre."
                />
                <meta
                    name="keywords"
                    content="hydrographie, topographie, Polynésie Française, cartographie marine, bathymétrie, Madagascar, géodésie, courantologie, marégraphie, levés bathymétriques, cartographie marine"
                />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="fr_FR" />
                <meta property="og:site_name" content="Géopolynésie" />
                <meta property="og:title" content="Contact - Géopolynésie" />
                <meta
                    property="og:description"
                    content="Contactez Géopolynésie pour vos projets d'hydrographie et de topographie en Polynésie Française. Experts en cartographie marine et terrestre."
                />
                <meta property="og:image" content="https://www.geopolynesie.com/assets/image4.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="Géopolynésie" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Contact - Géopolynésie" />
                <meta
                    name="twitter:description"
                    content="Contactez Géopolynésie pour vos projets d'hydrographie et de topographie en Polynésie Française. Experts en cartographie marine et terrestre."
                />
                <meta name="twitter:image" content="https://www.geopolynesie.com/assets/image4.jpg" />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <Provider>
                <div className="flex min-h-screen flex-col bg-white">
                    <Navbar />
                    <ContactUs />
                    <Footer />
                </div>
            </Provider>
        </>
    );
}
