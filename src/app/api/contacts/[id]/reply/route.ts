import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { id, message } = await request.json();

    // Here you would typically send the email
    // For now, we'll just update the status
    const contact = await prisma.contact.update({
      where: { id: id },
      data: { status: "PROCESSED" },
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.error("Failed to send reply:", error);
    return NextResponse.json(
      { error: "Failed to send reply" },
      { status: 500 }
    );
  }
}
