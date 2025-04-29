import { NewsHomePage } from '@/types';
import { Link } from '@inertiajs/react';
import { ArrowRight, Calendar } from 'lucide-react';

const News = ({ newsItems }: NewsHomePage) => {
    const truncateHTML = (html: string, maxLength: number) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        const text = div.textContent || div.innerText || '';
        if (text.length <= maxLength) return html;
        return text.substring(0, maxLength) + '...';
    };

    const createMarkup = (html: string) => {
        return { __html: html };
    };

    return (
        <section id="news" className="py-16 text-gray-700 md:py-24">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="mb-16 text-center" data-aos="fade-up">
                    <h2 className="section-title">Nouvelles et Publications</h2>
                    <p className="section-subtitle">Restez informé des dernières actualités et publications de Géopolynésie.</p>
                </div>

                <div className="flex flex-col">
                    {/* News */}
                    <div className="w-full">
                        <h3 className="text-ocean-800 mb-6 text-2xl font-bold" data-aos="fade-up">
                            Actualités Récentes
                        </h3>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {newsItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-300 p-0"
                                    data-aos="zoom-in"
                                    data-aos-delay={index * 100}
                                >
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                                        />
                                    </div>
                                    <div className="flex flex-grow flex-col p-6">
                                        <div className="mb-3 flex items-center text-sm text-gray-500">
                                            <div className="mr-4 flex items-center">
                                                <Calendar size={14} className="mr-1" />
                                                <span>{new Date(item.date).toLocaleDateString('fr-FR')}</span>
                                            </div>
                                        </div>
                                        <h4 className="text-ocean-800 mb-3 text-lg font-bold">{item.title}</h4>
                                        <div
                                            className="prose mb-4 flex-grow text-gray-600"
                                            dangerouslySetInnerHTML={createMarkup(truncateHTML(item.content, 150))}
                                        />
                                        <Link
                                            href={`/news/${item.slug}`}
                                            className="text-ocean-600 hover:text-ocean-800 mt-auto inline-flex items-center font-medium"
                                        >
                                            Lire la suite <ArrowRight size={16} className="ml-1" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 text-center" data-aos="fade-up">
                            <Link href="/news" className="btn-outline-ocean">
                                Toutes les actualités <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Publications */}
                    {/* <div className="lg:w-1/4">
                        <h3 className="text-ocean-800 mb-6 text-2xl font-bold" data-aos="fade-up">
                            Publications
                        </h3>
                        <div className="space-y-6">
                            {newsItems.map((pub, index) => (
                                <div
                                    key={index}
                                    className="border-ocean-500 rounded-lg border border-l-4 bg-white p-6"
                                    data-aos="fade-left"
                                    data-aos-delay={index * 100}
                                >
                                    <h4 className="text-ocean-800 mb-3 text-lg font-bold">{pub.title}</h4>
                                    <p className="mb-2 text-gray-600">{pub.authors}</p>
                                    <p className="mb-4 text-sm text-gray-500">{pub.journal},</p>
                                    <a href={pub.link} className="text-ocean-600 hover:text-ocean-800 inline-flex items-center font-medium">
                                        Voir la publication <ArrowRight size={16} className="ml-1" />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div> */}
                </div>
            </div>
        </section>
    );
};

export default News;
