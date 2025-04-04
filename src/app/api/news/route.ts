import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 500 }
    );
  }
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const limit = searchParams.get("limit");
    const search = searchParams.get("search");

    const where = {
      ...(category && category !== "Tous" ? { category } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" as const } },
              { summary: { contains: search, mode: "insensitive" as const } },
            ],
          }
        : {}),
    };

    const news = await prisma.news.findMany({
      where,
      orderBy: { date: "desc" },
      ...(limit ? { take: parseInt(limit) } : {}),
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
