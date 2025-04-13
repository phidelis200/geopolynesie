"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Link from "next/link";

const News = () => {
  interface NewsItem {
    image: string;
    title: string;
    date: string;
    content: string;
    summary: string;
    slug: string;
  }

  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [publications, setPublications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/news?limit=3");
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
  }, []);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section id="news" className="py-16 md:py-24">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="section-title">Nouvelles et Publications</h2>
          <p className="section-subtitle">
            Restez informé des dernières actualités et publications de
            Géopolynésie.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* News */}
          <div className="lg:w-3/4">
            <h3
              className="text-2xl font-bold text-ocean-800 mb-6"
              data-aos="fade-up"
            >
              Actualités Récentes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {newsItems.map((item, index) => (
                <div
                  key={index}
                  className="border rounded-lg overflow-hidden flex flex-col h-full"
                  data-aos="zoom-in"
                  data-aos-delay={index * 100}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <div className="flex items-center mr-4">
                        <Calendar size={14} className="mr-1" />
                        <span>
                          {new Date(item.date).toLocaleDateString("fr-FR")}
                        </span>
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
          <div className="lg:w-1/4">
            <h3
              className="text-2xl font-bold text-ocean-800 mb-6"
              data-aos="fade-up"
            >
              Publications
            </h3>
            <div className="space-y-6">
              {publications.map((pub, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg border-l-4 border border-ocean-500"
                  data-aos="fade-left"
                  data-aos-delay={index * 100}
                >
                  <h4 className="text-lg font-bold mb-3 text-ocean-800">
                    {pub.title}
                  </h4>
                  <p className="text-gray-600 mb-2">{pub.authors}</p>
                  <p className="text-gray-500 text-sm mb-4">{pub.journal},</p>
                  <a
                    href={pub.link}
                    className="text-ocean-600 font-medium hover:text-ocean-800 inline-flex items-center"
                  >
                    Voir la publication{" "}
                    <ArrowRight size={16} className="ml-1" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
