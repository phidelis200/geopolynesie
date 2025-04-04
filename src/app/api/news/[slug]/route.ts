import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 500 }
    );
  }
  try {
    const { slug } = await params;
    const news = await prisma.news.findUnique({
      where: { slug: slug },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    const relatedNews = await prisma.news.findMany({
      where: {
        category: news.category,
        NOT: { slug: news.slug },
      },
      take: 3,
      orderBy: { date: "desc" },
    });

    return NextResponse.json({ news, relatedNews });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
