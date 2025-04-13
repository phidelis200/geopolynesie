"use client";

import React, { useEffect, useState } from "react";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NewsPage = () => {
  const pathname = usePathname();
  const searchParams = new URLSearchParams(pathname.split("?")[1]);
  const categoryParam = searchParams.get("category");

  const categories = [
    "Tous",
    "Projets",
    "Partenariats",
    "Événements",
    "Équipements",
    "Formation",
  ];

  const publications = [
    {
      title: "Évolution des techniques hydrographiques en milieu corallien",
      authors: "Christian Friot, Jean Dupont",
      journal: "Revue Hydrographique Internationale",
      year: "2022",
      link: "#",
    },
    {
      title:
        "Impact du changement climatique sur la topographie des atolls polynésiens",
      authors: "Christian Friot et al.",
      journal: "Journal of Pacific Geography",
      year: "2021",
      link: "#",
    },
    {
      title:
        "Méthodes innovantes de cartographie des passes de lagon en Polynésie",
      authors: "Christian Friot",
      journal: "Conférence Hydrographique du Pacifique",
      year: "2020",
      link: "#",
    },
  ];

  interface NewsItem {
    image: string;
    title: string;
    category: string;
    date: string;
    readTime: string;
    content: string;
    slug: string;
  }

  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(categoryParam || "Tous");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (activeCategory !== "Tous") {
          params.append("category", activeCategory);
        }
        if (searchQuery) {
          params.append("search", searchQuery);
        }

        const response = await fetch(`/api/news?${params}`);
        if (response.ok) {
          const data = await response.json();
          setNewsItems(data);
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  const truncateHTML = (html: string, maxLength: number) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    if (text.length <= maxLength) return html;
    return text.substring(0, maxLength) + "...";
  };

  const createMarkup = (html: string) => {
    return { __html: html };
  };

  return (
    <main className="flex-grow pt-24">
      {/* Header */}
      <div
        className="bg-ocean-800 text-white py-16 md:py-24"
        data-aos="fade-down"
      >
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Actualités</h1>
          <p className="text-xl text-ocean-100 max-w-3xl mx-auto">
            Découvrez les dernières nouvelles, projets et publications de
            Géopolynésie.
          </p>
        </div>
      </div>

      <div className="py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="lg:w-3/4">
              {/* Filter and Search */}
              <div
                className="mb-10 flex flex-col md:flex-row justify-between gap-6"
                data-aos="fade-up"
              >
                <div className="flex flex-wrap gap-2">
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      className={`px-4 py-2 rounded-full text-sm transition-colors duration-300 ${
                        activeCategory === category
                          ? "bg-ocean-600 text-white"
                          : "bg-ocean-50 text-ocean-700 hover:bg-ocean-100"
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
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              {/* News Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {loading ? (
                  <div className="col-span-2 py-8 text-center">
                    <p className="text-gray-600">Chargement...</p>
                  </div>
                ) : newsItems.length > 0 ? (
                  newsItems.map((item, index) => (
                    <div
                      key={index}
                      className="border rounded-b-lg overflow-hidden flex flex-col h-full"
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                    >
                      <div className="h-48 overflow-hidden relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <span className="absolute top-4 right-4 bg-ocean-600 text-white text-xs px-3 py-1 rounded-full">
                          {item.category}
                        </span>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <div className="flex items-center mr-4">
                            <Calendar size={14} className="mr-1" />
                            <span>
                              {new Date(item.date).toLocaleDateString("fr-FR")}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            <span>{item.readTime}</span>
                          </div>
                        </div>
                        <h4 className="text-lg font-bold mb-3 text-ocean-800">
                          {item.title}
                        </h4>
                        <div
                          className="text-gray-600 mb-4 flex-grow prose"
                          dangerouslySetInnerHTML={createMarkup(
                            truncateHTML(item.content, 150)
                          )}
                        />
                        <Link
                          href={`/news/${item.slug}`}
                          className="mt-auto text-ocean-600 font-medium hover:text-ocean-800 inline-flex items-center"
                        >
                          Lire la suite{" "}
                          <ArrowRight size={16} className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 py-8 text-center">
                    <p className="text-gray-600">
                      Aucun résultat ne correspond à votre recherche.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/4">
              {/* Publications */}
              <div
                className="bg-white rounded-lg p-6 mb-8"
                data-aos="fade-left"
              >
                <h3 className="text-xl font-bold text-ocean-800 mb-6 pb-2 border-b border-gray-200">
                  Publications Récentes
                </h3>
                <div className="space-y-6">
                  {publications.map((pub, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-ocean-500 pl-4 border rounded-lg p-2"
                    >
                      <h4 className="text-md font-bold mb-2 text-ocean-800">
                        {pub.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-1">
                        {pub.authors}
                      </p>
                      <p className="text-gray-500 text-xs mb-2">
                        {pub.journal}, {pub.year}
                      </p>
                      <a
                        href={pub.link}
                        className="text-ocean-600 text-sm font-medium hover:text-ocean-800 inline-flex items-center"
                      >
                        Lire <ArrowRight size={14} className="ml-1" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div
                className="bg-white rounded-lg border p-6"
                data-aos="fade-left"
                data-aos-delay="200"
              >
                <h3 className="text-xl font-bold text-ocean-800 mb-6 pb-2 border-b border-gray-200">
                  Catégories
                </h3>
                <div className="space-y-2">
                  {categories.slice(1).map((category, index) => (
                    <button
                      key={index}
                      className={`block w-full cursor-pointer text-left px-4 py-2 rounded transition-colors duration-300 ${
                        activeCategory === category
                          ? "bg-ocean-600 text-white"
                          : "text-gray-700 hover:bg-ocean-50"
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

export default NewsPage;
