export default function HomePage() {
  return (
    <section className="grid two-col">
      <div className="card fade-in">
        <span className="pill">AI 기반 용어사전</span>
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "40px",
            lineHeight: 1.1,
            margin: "18px 0"
          }}
        >
          나만의 IT 용어사전을 만들어보세요.
        </h1>
        <p style={{ color: "var(--ink-500)", fontSize: "16px" }}>
          IT 용어를 검색하면 한줄 요약과 상세 설명을 받아보고, 내 리스트에
          저장해 언제든 다시 확인할 수 있어요.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          <a className="btn" href="/search">
            용어 검색
          </a>
          <a className="btn secondary" href="/signup">
            계정 만들기
          </a>
        </div>
      </div>
      <div className="card fade-in">
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "26px",
            marginTop: 0
          }}
        >
          이용 방법
        </h2>
        <div className="grid" style={{ marginTop: 16 }}>
          <div>
            <strong>1. 질문하기</strong>
            <p style={{ color: "var(--ink-500)" }}>
              IT 용어를 입력하면 ChatGPT가 요약과 설명을 만들어줍니다.
            </p>
          </div>
          <div>
            <strong>2. 저장하기</strong>
            <p style={{ color: "var(--ink-500)" }}>
              결과를 Postgres에 저장해 브라우저를 닫아도 남아있게 합니다.
            </p>
          </div>
          <div>
            <strong>3. 복습하기</strong>
            <p style={{ color: "var(--ink-500)" }}>
              요약 목록을 보고 원하는 용어를 클릭해 상세 설명을 확인합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
