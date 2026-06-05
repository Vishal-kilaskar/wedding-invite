import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Get ALL wishes (including unapproved) for admin
export async function GET() {
  try {
    const wishes = await prisma.wish.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(wishes);
  } catch (error) {
    console.error("Failed to fetch wishes:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// Approve a wish
export async function PATCH(req: Request) {
  try {
    const { id, approved } = await req.json();

    const wish = await prisma.wish.update({
      where: { id },
      data: { approved },
    });

    return NextResponse.json(wish);
  } catch (error) {
    console.error("Failed to update wish:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

// Delete a wish
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await prisma.wish.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete wish:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
