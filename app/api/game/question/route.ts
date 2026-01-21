import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("mode") ?? "subjective";
  const countParam = searchParams.get("count");
  const count = Math.max(1, Math.min(10, Number(countParam) || 1));

  const rows = await prisma.$queryRaw<
    { id: string; term: string; termKo: string | null; description: string }[]
  >(
    Prisma.sql`SELECT id, term, "termKo", description FROM "MasterTerm" ORDER BY RANDOM() LIMIT ${count}`
  );
  const [correct] = rows;

  if (!correct) {
    return NextResponse.json(
      { error: "No terms available." },
      { status: 404 }
    );
  }

  const escapeRegex = (value: string) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const mask = (term: string, termKo: string | null, description: string) => {
    let masked = description.replace(new RegExp(escapeRegex(term), "gi"), "____");
    if (termKo) {
      masked = masked.replace(new RegExp(escapeRegex(termKo), "gi"), "____");
    }
    return masked;
  };

  if (mode === "objective") {
    const options = await prisma.$queryRaw<{ term: string }[]>(
      Prisma.sql`
        SELECT term
        FROM "MasterTerm"
        WHERE id != ${correct.id}
        ORDER BY RANDOM()
        LIMIT 3
      `
    );
    const allOptions = [
      { term: correct.term },
      ...options.map((opt) => ({ term: opt.term }))
    ];
    for (let i = allOptions.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
    }

    return NextResponse.json({
      mode: "objective",
      description: mask(correct.term, correct.termKo, correct.description),
      options: allOptions.map((opt) => opt.term),
      answer: correct.term,
      answerKo: correct.termKo
    });
  }

  if (count > 1) {
    return NextResponse.json(
      rows.map((row) => ({
        mode: "subjective",
        description: mask(row.term, row.termKo, row.description),
        answer: row.term,
        answerKo: row.termKo
      }))
    );
  }

  return NextResponse.json({
    mode: "subjective",
    description: mask(correct.term, correct.termKo, correct.description),
    answer: correct.term,
    answerKo: correct.termKo
  });
}
