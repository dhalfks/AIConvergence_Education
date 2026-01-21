"use client";

import { useState } from "react";

type SearchResult = {
  id?: string;
  term: string;
  summary: string;
  description: string;
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<SearchResult | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const onSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("ChatGPT에 요청 중...");
    setResult(null);
    const response = await fetch("/api/terms/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });
    const data = await response.json();
    if (!response.ok) {
      setStatus(data.error ?? "검색에 실패했어요.");
      return;
    }
    setResult(data);
    setStatus("완료!");
  };

  return (
    <section className="grid" style={{ gap: 28 }}>
      <div className="card fade-in">
        <h1 style={{ fontFamily: "var(--font-heading)" }}>IT 용어검색</h1>
        <form onSubmit={onSearch} style={{ display: "flex", gap: 12 }}>
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="예: JWT, REST, Kubernetes"
            required
            style={{ flex: 1, padding: 12 }}
          />
          <button type="submit" className="btn">
            검색
          </button>
        </form>
        {status && <p style={{ color: "var(--ink-500)" }}>{status}</p>}
      </div>
      {result && (
        <div className="card fade-in">
          <h2 style={{ marginTop: 0 }}>{result.term}</h2>
          <p>
            <strong>한줄 요약</strong> {result.summary}
          </p>
          <p style={{ color: "var(--ink-500)" }}>{result.description}</p>
        </div>
      )}
    </section>
  );
}
