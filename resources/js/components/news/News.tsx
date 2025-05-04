import { NewsItem, PaginatedData, RecentNews } from '@/types';
import { PageProps } from '@inertiajs/core';
import { Link, router, usePage } from '@inertiajs/react';
import { ArrowRight, Calendar, Clock, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

interface NewsPageProps extends PageProps {
    newsItems: PaginatedData<NewsItem>;
    recentPublications: RecentNews[];
}

const News = () => {
    const { newsItems, recentPublications } = usePage<NewsPageProps>().props;
    const { url } = usePage();
    const searchParams = new URLSearchParams(url.split('?')[1]);
    const categoryParam = searchParams.get('category');

    const categories = ['Tous', 'Projets', 'Partenariats', 'Événements', 'Équipements', 'Formation'];

    const [activeCategory, setActiveCategory] = useState(categoryParam || 'Tous');
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

    useEffect(() => {
        router.get('/news', { category: activeCategory, search: searchQuery }, { preserveState: true, preserveScroll: true });
    }, [activeCategory, searchQuery]);

    useEffect(() => {
        if (categoryParam) {
            setActiveCategory(categoryParam);
        }
    }, [categoryParam]);

    const truncateHTML = (html: string, maxLength: number) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        const text = div.textContent || div.innerText || '';
        return text.length <= maxLength ? text : text.substring(0, maxLength) + '...'; // Return plain text
    };

    const createMarkup = (html: string) => {
        return { __html: html };
    };

    return (
        <main className="flex-grow pt-24">
            {/* Header */}
            <div className="bg-ocean-800 py-16 text-white md:py-24" data-aos="fade-down">
                <div className="container mx-auto max-w-7xl px-4 text-center">
                    <h1 className="mb-6 text-4xl font-bold md:text-5xl">Actualités</h1>
                    <p className="text-ocean-100 mx-auto max-w-3xl text-xl">
                        Découvrez les dernières nouvelles, projets et publications de Géopolynésie.
                    </p>
                </div>
            </div>

            <div className="py-16">
                <div className="container mx-auto max-w-7xl px-4">
                    <div className="flex flex-col gap-12 lg:flex-row">
                        {/* Main Content */}
                        <div className="lg:w-3/4">
                            {/* Filter and Search */}
                            <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row" data-aos="fade-up">
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((category, index) => (
                                        <button
                                            key={index}
                                            className={`cursor-pointer rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                                                activeCategory === category
                                                    ? 'bg-ocean-600 text-white'
                                                    : 'bg-ocean-50 text-ocean-700 hover:bg-ocean-100'
                                            }`}
                                            onClick={() => setActiveCategory(category)}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Rechercher..."
                                        className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 text-gray-700 md:w-64"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <Search size={18} className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
                                </div>
                            </div>

                            {/* News Grid */}
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                {newsItems.data && newsItems.data.length > 0 ? (
                                    newsItems.data.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex h-full flex-col overflow-hidden rounded-b-lg border border-gray-200"
                                            data-aos="fade-up"
                                            data-aos-delay={index * 100}
                                        >
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                                                />
                                                <span className="bg-ocean-600 absolute top-4 right-4 rounded-full px-3 py-1 text-xs text-white">
                                                    {item.category}
                                                </span>
                                            </div>
                                            <div className="flex flex-grow flex-col p-6">
                                                <div className="mb-3 flex items-center text-sm text-gray-500">
                                                    <div className="mr-4 flex items-center">
                                                        <Calendar size={14} className="mr-1" />
                                                        <span>{new Date(item.date).toLocaleDateString('fr-FR')}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Clock size={14} className="mr-1" />
                                                        <span>{item.read_time} min</span>
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
                                    ))
                                ) : (
                                    <div className="col-span-2 py-8 text-center">
                                        <p className="text-gray-600">Aucun résultat ne correspond à votre recherche.</p>
                                    </div>
                                )}
                            </div>

                            {/* Pagination */}
                            {newsItems.links && newsItems.links.length > 3 && (
                                <div className="mt-8 flex justify-center gap-2">
                                    {newsItems.links.map((link, i) => (
                                        <Link
                                            key={i}
                                            href={link.url || '#'}
                                            className={`rounded px-4 py-2 ${
                                                link.active
                                                    ? 'bg-ocean-600 text-white'
                                                    : link.url
                                                      ? 'bg-ocean-50 text-ocean-700 hover:bg-ocean-100'
                                                      : 'cursor-not-allowed bg-gray-100 text-gray-400'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:w-1/4">
                            {/* Publications */}
                            <div className="mb-8 rounded-lg bg-white p-6" data-aos="fade-left">
                                <h3 className="text-ocean-800 mb-6 border-b border-gray-200 pb-2 text-xl font-bold">Publications Récentes</h3>
                                <div className="space-y-6">
                                    {recentPublications.map((pub, index) => (
                                        <div key={index} className="border-ocean-500 rounded-lg border border-l-4 p-2 pl-4">
                                            <h4 className="text-md text-ocean-800 mb-2 font-bold">{pub.title}</h4>
                                            <p className="mb-1 text-sm text-gray-600">{pub.author}</p>
                                            <p className="mb-2 text-xs text-gray-500">
                                                {truncateHTML(pub.journal, 30)}, {pub.year}
                                            </p>
                                            <a
                                                href={`/news/${pub.slug}`}
                                                className="text-ocean-600 hover:text-ocean-800 inline-flex items-center text-sm font-medium"
                                            >
                                                Lire <ArrowRight size={14} className="ml-1" />
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="rounded-lg border bg-white p-6" data-aos="fade-left" data-aos-delay="200">
                                <h3 className="text-ocean-800 mb-6 border-b border-gray-200 pb-2 text-xl font-bold">Catégories</h3>
                                <div className="space-y-2">
                                    {categories.slice(1).map((category, index) => (
                                        <button
                                            key={index}
                                            className={`block w-full cursor-pointer rounded px-4 py-2 text-left transition-colors duration-300 ${
                                                activeCategory === category ? 'bg-ocean-600 text-white' : 'hover:bg-ocean-50 text-gray-700'
                                            }`}
                                            onClick={() => setActiveCategory(category)}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default News;
