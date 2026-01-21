import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getUserIdFromCookie } from "@/lib/session";

export async function GET() {
  const userId = await getUserIdFromCookie();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const terms = await prisma.term.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: { id: true, term: true, summary: true }
  });

  return NextResponse.json(terms);
}
