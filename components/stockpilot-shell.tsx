"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/inventory", label: "Inventory" },
  { href: "/uploads", label: "Uploads" },
  { href: "/analytics", label: "Analytics" },
  { href: "/reports", label: "AI Report" },
  { href: "/orders", label: "Orders" },
];

type StockPilotShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function StockPilotShell({
  eyebrow,
  title,
  description,
  children,
}: StockPilotShellProps) {
  const pathname = usePathname();

  return (
    <div className="app-shell">
      <div className="bg-orb bg-orb-left" />
      <div className="bg-orb bg-orb-right" />

      <header className="hero">
        <nav className="topbar">
          <div>
            <p className="eyebrow">A.I. Inventory Dashboard</p>
            <h1>StockPilot</h1>
          </div>
          <div className="nav-links">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={pathname === item.href ? "nav-link-active" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <section className="hero-grid hero-grid-single">
          <div className="hero-copy card">
            <p className="eyebrow">{eyebrow}</p>
            <h2>{title}</h2>
            <p className="lede">{description}</p>
          </div>
        </section>
      </header>

      <main>{children}</main>
    </div>
  );
}
