import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const { theme } = await req.json();

    const config = await prisma.siteConfig.upsert({
      where: { id: "main" },
      update: { theme },
      create: { id: "main", theme },
    });

    return NextResponse.json(config);
  } catch (error) {
    console.error("Failed to update settings:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const config = await prisma.siteConfig.findUnique({
      where: { id: "main" },
    });
    return NextResponse.json(config || { theme: "default" });
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return NextResponse.json({ theme: "default" });
  }
}
