"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("로그인 중...");
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (!response.ok) {
      setStatus(data.error ?? "로그인에 실패했어요.");
      return;
    }
    setStatus("로그인 완료! 홈으로 이동합니다.");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="card fade-in" style={{ maxWidth: 520 }}>
      <h1 style={{ fontFamily: "var(--font-heading)" }}>로그인</h1>
      <form onSubmit={onSubmit} className="grid">
        <label>
          이메일
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            style={{ width: "100%", marginTop: 6, padding: 10 }}
          />
        </label>
        <label>
          비밀번호
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            style={{ width: "100%", marginTop: 6, padding: 10 }}
          />
        </label>
        <button type="submit" className="btn">
          로그인
        </button>
        {status && <p style={{ color: "var(--ink-500)" }}>{status}</p>}
      </form>
    </div>
  );
}
