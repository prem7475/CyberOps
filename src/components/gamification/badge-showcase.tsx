import React from "react";
import { Award, Shield, Terminal, Zap, Lock, Bug, Target, Flame } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface BadgeItem {
  id: string;
  name: string;
  description: string;
  category: "offensive" | "defense" | "streak" | "mastery";
  unlocked: boolean;
  unlockedAt?: string;
  icon: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
}

export const MOCK_BADGES: BadgeItem[] = [
  {
    id: "first-blood",
    name: "First Blood",
    description: "Successfully exploit your first vulnerable target room and submit a valid flag.",
    category: "offensive",
    unlocked: true,
    unlockedAt: "2026-09-28",
    icon: "Target",
    rarity: "Common",
  },
  {
    id: "shell-master",
    name: "Reverse Shell Crafter",
    description: "Catch 5 interactive reverse shell sessions via netcat or socat.",
    category: "offensive",
    unlocked: true,
    unlockedAt: "2026-10-01",
    icon: "Terminal",
    rarity: "Rare",
  },
  {
    id: "streak-warrior",
    name: "Relentless Operator",
    description: "Maintain a continuous 7-day hacking and room completion streak.",
    category: "streak",
    unlocked: false,
    icon: "Flame",
    rarity: "Rare",
  },
  {
    id: "patch-hero",
    name: "Hardened Guardian",
    description: "Complete 3 secure remediation fix modules after capturing a room flag.",
    category: "defense",
    unlocked: true,
    unlockedAt: "2026-10-02",
    icon: "Shield",
    rarity: "Epic",
  },
  {
    id: "priv-esc-god",
    name: "Root Authority",
    description: "Escalate privileges to root/SYSTEM across 10 distinct simulated operating systems.",
    category: "mastery",
    unlocked: false,
    icon: "Lock",
    rarity: "Legendary",
  },
  {
    id: "sqli-slayer",
    name: "Injection Architect",
    description: "Exfiltrate database credentials via union-based and blind SQL injection techniques.",
    category: "offensive",
    unlocked: false,
    icon: "Bug",
    rarity: "Epic",
  },
];

export function BadgeShowcase() {
  const getBadgeIcon = (icon: string, unlocked: boolean) => {
    const props = {
      className: `w-6 h-6 ${unlocked ? "text-[var(--accent-primary)]" : "text-[var(--text-tertiary)]"}`
    };

    switch (icon) {
      case "Target": return <Target {...props} />;
      case "Terminal": return <Terminal {...props} />;
      case "Flame": return <Flame {...props} className={unlocked ? "text-[var(--accent-orange)]" : props.className} />;
      case "Shield": return <Shield {...props} className={unlocked ? "text-[var(--accent-blue)]" : props.className} />;
      case "Lock": return <Lock {...props} className={unlocked ? "text-[var(--accent-purple)]" : props.className} />;
      case "Bug": return <Bug {...props} className={unlocked ? "text-[var(--accent-red)]" : props.className} />;
      default: return <Award {...props} />;
    }
  };

  const getRarityBadge = (rarity: BadgeItem["rarity"]) => {
    switch (rarity) {
      case "Legendary":
        return <Badge variant="outline" className="text-yellow-400 border-yellow-400/30 bg-yellow-400/10">Legendary</Badge>;
      case "Epic":
        return <Badge variant="purple">Epic</Badge>;
      case "Rare":
        return <Badge variant="blue">Rare</Badge>;
      default:
        return <Badge variant="outline">Common</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white font-mono flex items-center">
            <Award className="w-4 h-4 mr-2 text-[var(--accent-primary)]" />
            OPERATOR BADGES
          </h3>
          <p className="text-xs text-[var(--text-secondary)]">
            Unlocked 3 of 6 commendations
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_BADGES.map((badge) => (
          <Card
            key={badge.id}
            className={`border transition-all ${
              badge.unlocked
                ? "bg-[var(--bg-card)] border-[var(--border-secondary)] hover:border-[var(--accent-primary)] shadow-sm"
                : "bg-[var(--bg-secondary)] border-[var(--border-primary)] opacity-60"
            }`}
          >
            <CardContent className="p-4 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center border ${
                      badge.unlocked
                        ? "bg-[var(--bg-tertiary)] border-[var(--border-accent)]"
                        : "bg-[var(--bg-card)] border-[var(--border-primary)]"
                    }`}
                  >
                    {getBadgeIcon(badge.icon, badge.unlocked)}
                  </div>
                  {getRarityBadge(badge.rarity)}
                </div>

                <h4 className={`text-sm font-bold font-mono mb-1 ${badge.unlocked ? "text-white" : "text-[var(--text-secondary)]"}`}>
                  {badge.name}
                </h4>
                <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                  {badge.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--border-primary)] flex justify-between items-center text-[10px] font-mono text-[var(--text-tertiary)]">
                {badge.unlocked ? (
                  <>
                    <span className="text-[var(--accent-primary)] font-bold">UNLOCKED</span>
                    <span>{badge.unlockedAt}</span>
                  </>
                ) : (
                  <span className="text-[var(--text-tertiary)] flex items-center">
                    <Lock className="w-3 h-3 mr-1" /> LOCKED
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
