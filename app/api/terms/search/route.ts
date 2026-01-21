import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateTermExplanation } from "@/lib/openai";
import { searchSchema } from "@/lib/validators";
import { getUserIdFromCookie } from "@/lib/session";

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = searchSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid query." }, { status: 400 });
  }

  const { query } = parsed.data;
  const result = await generateTermExplanation(query);
  const userId = await getUserIdFromCookie();
  const termLower = result.term.toLowerCase();
  const hasHangul = /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(result.term);
  const termKo = hasHangul ? result.term : null;
  const existingMaster = await prisma.masterTerm.findUnique({
    where: { termLower }
  });

  if (existingMaster) {
    await prisma.masterTerm.delete({ where: { termLower } });
  } else {
    await prisma.masterTerm.create({
      data: {
        term: result.term,
        termLower,
        termKo,
        summary: result.summary,
        description: result.description
      }
    });
  }

  if (userId) {
    const saved = await prisma.term.create({
      data: {
        term: result.term,
        summary: result.summary,
        description: result.description,
        query,
        userId
      }
    });
    return NextResponse.json({ ...result, id: saved.id });
  }

  return NextResponse.json(result);
}
