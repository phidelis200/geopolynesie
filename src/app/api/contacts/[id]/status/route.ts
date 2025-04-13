import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json();

    const contact = await prisma.contact.update({
      where: { id: id },
      data: { status },
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.error("Failed to update contact status:", error);
    return NextResponse.json(
      { error: "Failed to update contact status" },
      { status: 500 }
    );
  }
}
