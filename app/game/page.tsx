"use client";

import { useEffect, useState } from "react";

type GameQuestion = {
  mode: "subjective";
  description: string;
  answer: string;
  answerKo?: string | null;
};

export default function GamePage() {
  const [questions, setQuestions] = useState<GameQuestion[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [results, setResults] = useState<(string | null)[]>([]);

  const loadSubjective = async () => {
    const response = await fetch("/api/game/question?mode=subjective&count=3");
    const data = await response.json();
    if (response.ok) {
      setQuestions(data);
      setAnswers(Array.from({ length: data.length }, () => ""));
      setResults(Array.from({ length: data.length }, () => null));
    }
  };

  useEffect(() => {
    loadSubjective();
  }, []);

  const checkSubjective = (index: number) => {
    const question = questions[index];
    if (!question) return;
    const normalized = answers[index].trim().toLowerCase();
    const candidates = [question.answer, question.answerKo]
      .filter((item): item is string => Boolean(item))
      .map((item) => item.trim().toLowerCase());
    const answerMatches = candidates.includes(normalized);
    const message =
      answerMatches ? "정답입니다!" : `오답입니다. 정답: ${question.answer}`;
    setResults((prev) => prev.map((item, i) => (i === index ? message : item)));
  };

  const revealSubjectiveAnswer = (index: number) => {
    const question = questions[index];
    if (!question) return;
    const label = question.answerKo
      ? `정답: ${question.answer} (${question.answerKo})`
      : `정답: ${question.answer}`;
    setResults((prev) =>
      prev.map((item, i) =>
        i === index ? label : item
      )
    );
  };

  return (
    <section className="grid" style={{ gap: 24 }}>
      <div className="card fade-in">
        <h1 style={{ fontFamily: "var(--font-heading)" }}>IT 용어 게임</h1>
        <p style={{ color: "var(--ink-500)" }}>
          설명을 보고 용어를 맞혀보세요. 주관식 3문제가 제공됩니다.
        </p>
      </div>

      <div className="card fade-in">
        <h2 style={{ marginTop: 0 }}>주관식 3문제</h2>
        <div className="grid" style={{ gap: 16 }}>
          {questions.length === 0 && (
            <p style={{ color: "var(--ink-500)" }}>문제를 불러오는 중...</p>
          )}
          {questions.map((question, index) => (
            <div key={`${question.answer}-${index}`} className="card">
              <p style={{ color: "var(--ink-500)" }}>{question.description}</p>
              <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                <input
                  type="text"
                  value={answers[index] ?? ""}
                  onChange={(event) =>
                    setAnswers((prev) =>
                      prev.map((value, i) =>
                        i === index ? event.target.value : value
                      )
                    )
                  }
                  placeholder="정답을 입력하세요"
                  style={{ flex: 1, padding: 10 }}
                />
                <button
                  className="btn"
                  type="button"
                  onClick={() => checkSubjective(index)}
                >
                  확인
                </button>
                <button
                  className="btn secondary"
                  type="button"
                  onClick={() => revealSubjectiveAnswer(index)}
                >
                  정답 확인
                </button>
              </div>
              {results[index] && (
                <p style={{ color: "var(--ink-500)", marginTop: 12 }}>
                  {results[index]}
                </p>
              )}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <button className="btn secondary" type="button" onClick={loadSubjective}>
            새 문제 3개
          </button>
        </div>
      </div>
    </section>
  );
}
