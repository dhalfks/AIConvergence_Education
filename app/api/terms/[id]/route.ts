import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getUserIdFromCookie } from "@/lib/session";

type Params = {
  params: { id: string };
};

export async function GET(_: Request, { params }: Params) {
  const userId = await getUserIdFromCookie();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const term = await prisma.term.findFirst({
    where: { id: params.id, userId },
    select: { id: true, description: true }
  });

  if (!term) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  return NextResponse.json(term);
}

export async function DELETE(_: Request, { params }: Params) {
  const userId = await getUserIdFromCookie();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const existing = await prisma.term.findFirst({
    where: { id: params.id, userId },
    select: { id: true }
  });

  if (!existing) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  await prisma.term.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
