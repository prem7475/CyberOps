"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  Terminal,
  Compass,
  Trophy,
  Wrench,
  User,
  Settings,
  LogOut,
  Flame,
  Zap,
  Lock
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Terminal },
    { name: "Learning Paths", href: "/paths", icon: Compass },
    { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
    { name: "Tools Library", href: "/tools", icon: Wrench },
    { name: "Operator Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-[var(--border-primary)] bg-[var(--bg-secondary)] flex flex-col h-screen sticky top-0">
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-[var(--border-primary)]">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-[var(--accent-primary)] glow-green" />
          <span className="font-bold text-lg text-white">
            Cyber<span className="text-[var(--accent-primary)]">Ops</span>
          </span>
          <span className="text-[10px] bg-[var(--bg-tertiary)] border border-[var(--border-secondary)] text-[var(--text-tertiary)] px-1.5 py-0.5 rounded font-mono">
            SANDBOX
          </span>
        </Link>
      </div>

      {/* Operator Status Pill */}
      <div className="p-4 mx-3 my-3 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-[var(--text-tertiary)] font-mono">OPERATOR</span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-[var(--accent-primary-muted)] text-[var(--accent-primary)] border border-[var(--border-accent)]">
            LVL 3
          </span>
        </div>
        <div className="font-mono text-sm font-bold text-white truncate">operator_404</div>
        <div className="flex items-center gap-4 mt-3 pt-2 border-t border-[var(--border-primary)] text-xs text-[var(--text-secondary)] font-mono">
          <div className="flex items-center text-[var(--accent-orange)]">
            <Flame className="w-3.5 h-3.5 mr-1" />
            <span>4 Days</span>
          </div>
          <div className="flex items-center text-[var(--accent-primary)]">
            <Zap className="w-3.5 h-3.5 mr-1" />
            <span>850 PTS</span>
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 space-y-1 py-2 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                isActive
                  ? "bg-[var(--bg-tertiary)] text-[var(--accent-primary)] border border-[var(--border-accent)] shadow-sm font-semibold"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-white"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-4 w-4 transition-colors",
                  isActive ? "text-[var(--accent-primary)]" : "text-[var(--text-tertiary)] group-hover:text-white"
                )}
              />
              {item.name}
            </Link>
          );
        })}

        <div className="pt-4 mt-4 border-t border-[var(--border-primary)] px-3">
          <div className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-2">
            Administration
          </div>
          <Link
            href="/admin/dashboard"
            className="flex items-center px-3 py-2 rounded-lg text-xs font-mono text-[var(--text-tertiary)] hover:text-[var(--accent-blue)] hover:bg-[var(--bg-card)] transition-colors"
          >
            <Lock className="mr-2 h-3.5 w-3.5" />
            Instructor Control
          </Link>
        </div>
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-[var(--border-primary)]">
        <Link
          href="/"
          className="flex items-center px-3 py-2 text-xs font-medium text-[var(--text-tertiary)] hover:text-red-400 transition-colors"
        >
          <LogOut className="mr-3 h-4 w-4" />
          Terminate Session
        </Link>
      </div>
    </aside>
  );
}
