"use client";

import { useEffect, useState } from "react";

type TermSummary = {
  id: string;
  term: string;
  summary: string;
};

type TermDetail = {
  id: string;
  description: string;
};

export default function MyTermsPage() {
  const [terms, setTerms] = useState<TermSummary[]>([]);
  const [selected, setSelected] = useState<TermDetail | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setStatus("내 용어를 불러오는 중...");
      const response = await fetch("/api/terms/mine");
      const data = await response.json();
      if (!response.ok) {
        setStatus(data.error ?? "목록을 불러오지 못했어요.");
        return;
      }
      setTerms(data);
      setStatus(null);
    };
    load();
  }, []);

  const onSelect = async (id: string) => {
    const response = await fetch(`/api/terms/${id}`);
    const data = await response.json();
    if (!response.ok) {
      setStatus(data.error ?? "상세 내용을 불러오지 못했어요.");
      return;
    }
    setSelected(data);
  };

  const onDelete = async (id: string) => {
    const response = await fetch(`/api/terms/${id}`, { method: "DELETE" });
    const data = await response.json();
    if (!response.ok) {
      setStatus(data.error ?? "삭제에 실패했어요.");
      return;
    }
    setTerms((prev) => prev.filter((term) => term.id !== id));
    if (selected?.id === id) {
      setSelected(null);
    }
  };

  return (
    <section className="grid two-col">
      <div className="card fade-in">
        <h1 style={{ fontFamily: "var(--font-heading)" }}>내 용어리스트</h1>
        {status && <p style={{ color: "var(--ink-500)" }}>{status}</p>}
        <div className="grid" style={{ marginTop: 12 }}>
          {terms.map((term) => (
            <div
              key={term.id}
              className="btn secondary"
              style={{
                textAlign: "left",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12
              }}
              onClick={() => onSelect(term.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter") onSelect(term.id);
              }}
            >
              <div>
                <strong>{term.term}</strong>
                <div style={{ color: "var(--ink-500)" }}>{term.summary}</div>
              </div>
              <button
                type="button"
                aria-label="삭제"
                className="btn secondary"
                style={{ padding: "8px 12px" }}
                onClick={(event) => {
                  event.stopPropagation();
                  onDelete(term.id);
                }}
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="card fade-in">
        <h2 style={{ marginTop: 0 }}>설명</h2>
        {selected ? (
          <p style={{ color: "var(--ink-500)" }}>{selected.description}</p>
        ) : (
          <p style={{ color: "var(--ink-500)" }}>
            용어를 클릭하면 상세 설명이 표시됩니다.
          </p>
        )}
      </div>
    </section>
  );
}
