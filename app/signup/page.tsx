"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("계정 생성 중...");
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });
    const data = await response.json();
    if (!response.ok) {
      setStatus(data.error ?? "회원가입에 실패했어요.");
      return;
    }
    setStatus("계정이 생성됐어요. 로그인 페이지로 이동합니다.");
    router.push("/login");
  };

  return (
    <div className="card fade-in" style={{ maxWidth: 520 }}>
      <h1 style={{ fontFamily: "var(--font-heading)" }}>회원가입</h1>
      <form onSubmit={onSubmit} className="grid">
        <label>
          이름
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            style={{ width: "100%", marginTop: 6, padding: 10 }}
          />
        </label>
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
          계정 만들기
        </button>
        {status && <p style={{ color: "var(--ink-500)" }}>{status}</p>}
      </form>
    </div>
  );
}
