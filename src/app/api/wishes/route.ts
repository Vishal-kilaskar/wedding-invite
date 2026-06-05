import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, message } = body;

    if (!name || !message) {
      return NextResponse.json({ error: "Name and message are required" }, { status: 400 });
    }

    const wish = await prisma.wish.create({
      data: {
        name,
        message,
        approved: false, // Requires admin approval
      },
    });

    return NextResponse.json(wish, { status: 201 });
  } catch (error) {
    console.error("Wish error:", error);
    return NextResponse.json({ error: "Failed to save wish" }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Only return approved wishes for public view
    const wishes = await prisma.wish.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(wishes);
  } catch (error) {
    console.error("Failed to fetch wishes:", error);
    return NextResponse.json({ error: "Failed to fetch wishes" }, { status: 500 });
  }
}
