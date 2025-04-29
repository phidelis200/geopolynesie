import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import Provider from '@/provider';
import { NewsDetailPageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';

interface Props extends Partial<NewsDetailPageProps> {
    error?: 'not_found';
}

export default function NewDetailPage({ newsItem, relatedNews, categories, error }: Props) {
    if (error === 'not_found') {
        return (
            <>
                <Head title="Article non trouvé | Géopolynésie">
                    <meta name="description" content="L'article que vous recherchez n'existe pas ou a été déplacé." />
                    <meta property="og:title" content="Article non trouvé | Géopolynésie" />
                    <meta property="og:description" content="L'article que vous recherchez n'existe pas ou a été déplacé." />
                </Head>
                <Provider>
                    <div className="flex min-h-screen flex-col bg-white">
                        <Navbar />
                        <main className="flex-grow pt-24">
                            <div className="container mx-auto max-w-7xl px-4 py-16">
                                <div className="text-center">
                                    <h1 className="text-2xl font-bold text-gray-700">Article non trouvé</h1>
                                    <p className="mt-4 text-gray-600">L'article que vous recherchez n'existe pas ou a été déplacé.</p>
                                    <Link href="/news" className="btn-ocean mt-6 inline-block">
                                        <ArrowLeft size={18} className="mr-2 inline" /> Retour aux actualités
                                    </Link>
                                </div>
                            </div>
                        </main>
                        <Footer />
                    </div>
                </Provider>
            </>
        );
    }

    if (!newsItem) {
        return null;
    }

    const formattedDate = new Date(newsItem.date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <>
            <Head title={`${newsItem.title} - Géopolynésie`}>
                <meta name="description" content={newsItem.content.replace(/<[^>]*>/g, '')} />
                <meta
                    name="keywords"
                    content="hydrographie, topographie, Polynésie Française, cartographie marine, bathymétrie, Madagascar, géodésie, courantologie, marégraphie, levés bathymétriques, cartographie marine"
                />
                <meta property="og:type" content="article" />
                <meta property="og:locale" content="fr_FR" />
                <meta property="og:site_name" content="Géopolynésie" />
                <meta property="og:title" content={`${newsItem.title} | Géopolynésie - Expert en Hydrographie et Topographie`} />
                <meta property="og:description" content={newsItem.content.replace(/<[^>]*>/g, '')} />
                <meta property="og:image" content={newsItem.image || 'https://www.geopolynesie.com/assets/image4.jpg'} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content={newsItem.title} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${newsItem.title} | Géopolynésie - Expert en Hydrographie et Topographie`} />
                <meta name="twitter:description" content={newsItem.content.replace(/<[^>]*>/g, '')} />
                <meta name="twitter:image" content={newsItem.image || 'https://www.geopolynesie.com/assets/image4.jpg'} />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <Provider>
                <div className="flex min-h-screen flex-col bg-white">
                    <Navbar />
                    <main className="flex-grow pt-24">
                        {/* Hero Section */}
                        <div className="bg-ocean-800 py-16 text-white" data-aos="fade-down">
                            <div className="container mx-auto max-w-7xl px-4">
                                <div className="mx-auto max-w-4xl">
                                    <Link href="/news" className="text-ocean-100 mb-4 inline-flex items-center transition-colors hover:text-white">
                                        <ArrowLeft size={18} className="mr-2" /> Retour aux actualités
                                    </Link>
                                    <h1 className="mb-6 text-3xl font-bold md:text-4xl">{newsItem.title}</h1>
                                    <div className="text-ocean-100 flex items-center">
                                        <div className="mr-6 flex items-center">
                                            <Calendar size={16} className="mr-2" />
                                            <span>{formattedDate}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Clock size={16} className="mr-2" />
                                            <span>{newsItem.read_time} min</span>
                                        </div>
                                        <span className="mx-4">•</span>
                                        <span className="bg-ocean-600 rounded-full px-3 py-1 text-xs text-white">{newsItem.category}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Article Content */}
                        <div className="py-12">
                            <div className="container mx-auto max-w-7xl px-4">
                                <div className="flex flex-col gap-12 lg:flex-row">
                                    <div className="lg:w-3/4" data-aos="fade-right">
                                        <div className="overflow-hidden rounded-lg border-l-2 bg-white">
                                            <img
                                                src={newsItem.image || '/assets/image4.jpg'}
                                                alt={newsItem.title}
                                                className="h-auto w-full object-cover"
                                                data-aos="zoom-in"
                                            />
                                            <div className="p-8">
                                                <div
                                                    className="prose prose-ocean max-w-none text-justify text-gray-700"
                                                    dangerouslySetInnerHTML={{
                                                        __html: newsItem.content,
                                                    }}
                                                />

                                                {/* Share Buttons */}
                                                <div className="mt-8 border-t border-gray-200 pt-6">
                                                    <div className="flex items-center">
                                                        <span className="mr-4 font-medium text-gray-700">Partager:</span>
                                                        <div className="flex gap-2">
                                                            <button className="bg-ocean-100 text-ocean-700 hover:bg-ocean-200 cursor-pointer rounded-full p-2 transition-colors">
                                                                <Share2 size={18} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sidebar */}
                                    <div className="lg:w-1/4" data-aos="fade-left" data-aos-delay="200">
                                        {/* Related Articles */}
                                        {(relatedNews ?? []).length > 0 && (
                                            <div className="mb-8 rounded-lg border bg-white p-6">
                                                <h3 className="text-ocean-800 mb-6 border-b border-gray-200 pb-2 text-xl font-bold">
                                                    Articles Similaires
                                                </h3>
                                                <div className="space-y-6">
                                                    {(relatedNews ?? []).map((item, index) => (
                                                        <div key={index} className="group">
                                                            <Link href={`/news/${item.slug}`} className="block">
                                                                <div className="mb-2 overflow-hidden rounded-md">
                                                                    <img
                                                                        src={item.image || '/images/default-news.jpg'}
                                                                        alt={item.title}
                                                                        className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                                    />
                                                                </div>
                                                                <h4 className="text-md text-ocean-800 group-hover:text-ocean-600 mb-1 font-bold transition-colors">
                                                                    {item.title}
                                                                </h4>
                                                                <div className="text-xs text-gray-500">
                                                                    <span>{new Date(item.date).toLocaleDateString()}</span> •{' '}
                                                                    <span>{item.read_time} min</span>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Categories */}
                                        <div className="rounded-lg border bg-white p-6">
                                            <h3 className="text-ocean-800 mb-6 border-b border-gray-200 pb-2 text-xl font-bold">Catégories</h3>
                                            <div className="space-y-2">
                                                {(categories ?? []).map((category, index) => (
                                                    <Link
                                                        key={index}
                                                        href={`/news?category=${category}`}
                                                        className={`block w-full rounded px-4 py-2 text-left transition-colors duration-300 ${
                                                            newsItem.category === category
                                                                ? 'bg-ocean-600 text-white'
                                                                : 'hover:bg-ocean-50 text-gray-700'
                                                        }`}
                                                    >
                                                        {category}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    <Footer />
                </div>
            </Provider>
        </>
    );
}
