import React from "react";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Await the params to get the slug value

  if (!process.env.DATABASE_URL) {
    return {
      title: "Database not configured",
    };
  }
  const { slug } = await params;

  const news = await prisma.news.findUnique({
    where: { slug },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  if (!news) {
    return {
      title: "Article non trouvé | Géopolynésie",
      description:
        "L'article que vous recherchez n'existe pas ou a été déplacé.",
    };
  }

  return {
    title: `${news.title} | Géopolynésie`,
    description: news.content,
    openGraph: {
      title: news.title,
      description: news.content,
      images: [news.image || "/images/default-news.jpg"],
      type: "article",
      authors: news.author.name,
      publishedTime: news.date.toISOString(),
      modifiedTime: news.updatedAt.toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description: news.content,
      images: [news.image || "/images/default-news.jpg"],
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  if (!process.env.DATABASE_URL) {
    return "Database not configured";
  }
  // Await params to extract the slug
  const { slug } = await params;

  const newsItem = await prisma.news.findUnique({
    where: { slug },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  if (!newsItem) {
    notFound();
  }

  const relatedNews = await prisma.news.findMany({
    where: {
      category: newsItem.category,
      NOT: { slug: newsItem.slug },
    },
    take: 3,
    orderBy: { date: "desc" },
  });

  // Format the date
  const formattedDate = new Date(newsItem.date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="flex-grow pt-24">
      {/* Hero Section */}
      <div className="bg-ocean-800 text-white py-16" data-aos="fade-down">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/news"
              className="inline-flex items-center text-ocean-100 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft size={18} className="mr-2" /> Retour aux actualités
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              {newsItem.title}
            </h1>
            <div className="flex items-center text-ocean-100">
              <div className="flex items-center mr-6">
                <Calendar size={16} className="mr-2" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                <span>{newsItem.readTime}</span>
              </div>
              <span className="mx-4">•</span>
              <span className="bg-ocean-600 text-white text-xs px-3 py-1 rounded-full">
                {newsItem.category}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="py-12">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-3/4" data-aos="fade-right">
              <div className="bg-white rounded-lg border-l-2 overflow-hidden">
                <Image
                  src={newsItem.image || "/images/default-news.jpg"}
                  width={800}
                  height={400}
                  priority
                  alt={newsItem.title}
                  className="w-full h-80 object-cover"
                  data-aos="zoom-in"
                />
                <div className="p-8">
                  <div
                    className="prose prose-ocean max-w-none"
                    dangerouslySetInnerHTML={{ __html: newsItem.content }}
                  />

                  {/* Share Buttons */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex items-center">
                      <span className="text-gray-700 font-medium mr-4">
                        Partager:
                      </span>
                      <div className="flex gap-2">
                        <button className="p-2 cursor-pointer bg-ocean-100 text-ocean-700 rounded-full hover:bg-ocean-200 transition-colors">
                          <Share2 size={18} />
                        </button>
                        {/* Add additional social media buttons here */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/4" data-aos="fade-left" data-aos-delay="200">
              {/* Related Articles */}
              {relatedNews.length > 0 && (
                <div className="bg-white rounded-lg border p-6 mb-8">
                  <h3 className="text-xl font-bold text-ocean-800 mb-6 pb-2 border-b border-gray-200">
                    Articles Similaires
                  </h3>
                  <div className="space-y-6">
                    {relatedNews.map((item, index) => (
                      <div key={index} className="group">
                        <Link href={`/news/${item.slug}`} className="block">
                          <div className="mb-2 overflow-hidden rounded-md">
                            <Image
                              src={item.image || "/images/default-news.jpg"}
                              width={400}
                              height={200}
                              priority
                              alt={item.title}
                              className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                          <h4 className="text-md font-bold mb-1 text-ocean-800 group-hover:text-ocean-600 transition-colors">
                            {item.title}
                          </h4>
                          <div className="text-xs text-gray-500">
                            <span>
                              {new Date(item.date).toLocaleDateString()}
                            </span>{" "}
                            • <span>{item.readTime}</span>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories */}
              <div className="bg-white rounded-lg border p-6">
                <h3 className="text-xl font-bold text-ocean-800 mb-6 pb-2 border-b border-gray-200">
                  Catégories
                </h3>
                <div className="space-y-2">
                  {[
                    "Projets",
                    "Partenariats",
                    "Événements",
                    "Équipements",
                    "Formation",
                  ].map((category, index) => (
                    <Link
                      key={index}
                      href={`/news?category=${category}`}
                      className={`block w-full text-left px-4 py-2 rounded transition-colors duration-300 ${
                        newsItem.category === category
                          ? "bg-ocean-600 text-white"
                          : "text-gray-700 hover:bg-ocean-50"
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
  );
}
