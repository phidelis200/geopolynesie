import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { cookies } from "next/headers";
import { verifyJwtToken } from "@/lib/jwt";
import { Role } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const isValidToken = await verifyJwtToken(token);

    if (!isValidToken || isValidToken.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Convert buffer to base64
    const base64String = buffer.toString("base64");
    const uploadStr = `data:${file.type};base64,${base64String}`;

    const result = await cloudinary.uploader.upload(uploadStr, {
      folder: "news",
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
