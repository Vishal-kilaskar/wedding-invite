import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, attendees, events, message } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const rsvp = await prisma.rsvp.create({
      data: {
        name,
        phone: phone || null,
        attendees: parseInt(attendees) || 1,
        events: JSON.stringify(events || []),
        message: message || null,
      },
    });

    return NextResponse.json(rsvp, { status: 201 });
  } catch (error) {
    console.error("RSVP error:", error);
    return NextResponse.json({ error: "Failed to save RSVP" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const rsvps = await prisma.rsvp.findMany({
      orderBy: { createdAt: "desc" },
    });
    const parsed = rsvps.map((rsvp) => ({
      ...rsvp,
      events: JSON.parse(rsvp.events as string || "[]"),
    }));
    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Failed to fetch RSVPs:", error);
    return NextResponse.json({ error: "Failed to fetch RSVPs" }, { status: 500 });
  }
}
