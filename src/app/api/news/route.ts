import { verifyJwtToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import slugify from "slugify";

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

export async function POST(req: Request) {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const isValidToken = await verifyJwtToken(token);

    if (!isValidToken || isValidToken.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const json = await req.json();
    const { title, content, category, image, status } = json;

    // Calculate read time (assuming 200 words per minute)
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200) + " min";

    const news = await prisma.news.create({
      data: {
        title,
        slug: slugify(title, { lower: true }),
        content,
        category,
        image,
        status,
        readTime,
        summary: content.substring(0, 200), // First 200 characters as summary
        authorId: isValidToken.id as string,
      },
    });

    return NextResponse.json(news);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
