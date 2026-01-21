"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/login", label: "로그인" },
  { href: "/signup", label: "회원가입" },
  { href: "/search", label: "IT 용어검색" },
  { href: "/my-terms", label: "내 용어리스트" },
  { href: "/game", label: "게임" }
];

export default function NavBar() {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (!response.ok) return;
        const data = await response.json();
        setUserName(data.name ?? null);
      } catch {
        setUserName(null);
      }
    };
    load();
  }, []);

  const onLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUserName(null);
    window.location.href = "/login";
  };

  return (
    <header className="container" style={{ padding: "28px 24px 0" }}>
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          flexWrap: "wrap"
        }}
        className="fade-in"
      >
        <Link href="/" style={{ fontWeight: 700, letterSpacing: "0.5px" }}>
          IT Terms Atlas
        </Link>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {links
            .filter((link) => {
              if (!userName) return true;
              return link.href !== "/login" && link.href !== "/signup";
            })
            .map((link) => (
            <Link key={link.href} href={link.href} className="pill">
              {link.label}
            </Link>
            ))}
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {userName ? (
            <>
              <span className="pill">{userName} 님</span>
              <button className="btn secondary" onClick={onLogout}>
                로그아웃
              </button>
            </>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
