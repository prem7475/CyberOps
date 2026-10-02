import { Trophy, Medal, Flame, ShieldAlert, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function LeaderboardPage() {
  const leaders = [
    { rank: 1, handle: "0xNeo", level: 42, points: 15400, streak: 12, badges: 8 },
    { rank: 2, handle: "root_cause", level: 38, points: 14250, streak: 8, badges: 6 },
    { rank: 3, handle: "cipher_byte", level: 35, points: 12800, streak: 21, badges: 7 },
    { rank: 4, handle: "kernel_panic", level: 31, points: 11500, streak: 3, badges: 4 },
    { rank: 5, handle: "null_pointer", level: 29, points: 10200, streak: 5, badges: 5 },
    { rank: 6, handle: "sudo_rm", level: 27, points: 9400, streak: 2, badges: 4 },
    { rank: 7, handle: "operator_404", level: 3, points: 850, streak: 4, badges: 1, isCurrentUser: true }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-end border-b border-[var(--border-primary)] pb-6">
        <div>
          <div className="text-xs font-mono text-[var(--accent-primary)] mb-1 flex items-center">
            <Trophy className="w-4 h-4 mr-1.5" /> GLOBAL RANKINGS
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Hall of Fame
          </h1>
        </div>

        <div className="hidden sm:flex bg-[var(--bg-card)] rounded-lg p-1 border border-[var(--border-secondary)]">
          <button className="px-4 py-1.5 text-xs font-mono font-bold bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded shadow-sm text-white">ALL TIME</button>
          <button className="px-4 py-1.5 text-xs font-mono font-medium text-[var(--text-secondary)] hover:text-white transition-colors">THIS MONTH</button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-secondary)] border-[var(--accent-orange)] shadow-[var(--shadow-glow)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-mono text-[var(--text-secondary)]">CURRENT RANK</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white font-mono">
              #1,248
            </div>
            <div className="text-xs text-[var(--accent-primary)] mt-1 font-mono">
              Top 15% globally
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--bg-card)] border-[var(--border-primary)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-mono text-[var(--text-secondary)]">ACTIVE STREAK</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white font-mono flex items-center">
              4 <Flame className="w-8 h-8 ml-2 text-[var(--accent-orange)]" />
            </div>
            <div className="text-xs text-[var(--text-tertiary)] mt-1 font-mono">
              1 freeze available
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--bg-card)] border-[var(--border-primary)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-mono text-[var(--text-secondary)]">TOTAL SCORE</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white font-mono flex items-center">
              850
            </div>
            <div className="text-xs text-[var(--text-tertiary)] mt-1 font-mono">
              Level 3 Operator
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[var(--bg-tertiary)] border-b border-[var(--border-primary)] text-xs font-mono font-bold text-[var(--text-secondary)]">
          <div className="col-span-1 text-center">RANK</div>
          <div className="col-span-5">OPERATOR</div>
          <div className="col-span-2 text-center">LEVEL</div>
          <div className="col-span-2 text-center hidden md:block">STREAK</div>
          <div className="col-span-2 text-right">POINTS</div>
        </div>

        <div className="divide-y divide-[var(--border-primary)]">
          {leaders.map((leader) => (
            <div
              key={leader.rank}
              className={`grid grid-cols-12 gap-4 px-6 py-4 items-center transition-colors ${
                leader.isCurrentUser
                  ? "bg-[var(--accent-primary-muted)] border-l-2 border-l-[var(--accent-primary)]"
                  : "hover:bg-[var(--bg-card-hover)]"
              }`}
            >
              <div className="col-span-1 flex justify-center">
                {leader.rank === 1 ? (
                  <Medal className="w-5 h-5 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                ) : leader.rank === 2 ? (
                  <Medal className="w-5 h-5 text-gray-300" />
                ) : leader.rank === 3 ? (
                  <Medal className="w-5 h-5 text-orange-400" />
                ) : (
                  <span className="font-mono text-[var(--text-secondary)] font-bold text-sm">
                    {leader.rank}
                  </span>
                )}
              </div>

              <div className="col-span-5 flex items-center space-x-3">
                <span className={`font-mono font-bold text-sm ${leader.isCurrentUser ? 'text-[var(--accent-primary)]' : 'text-white'}`}>
                  {leader.handle}
                </span>
                {leader.isCurrentUser && (
                  <Badge variant="outline" className="text-[10px] py-0 h-5">YOU</Badge>
                )}
              </div>

              <div className="col-span-2 text-center">
                <span className="font-mono text-sm text-[var(--text-secondary)]">Lv.{leader.level}</span>
              </div>

              <div className="col-span-2 hidden md:flex items-center justify-center space-x-1">
                <span className="font-mono text-sm text-white">{leader.streak}</span>
                <Flame className="w-3.5 h-3.5 text-[var(--accent-orange)]" />
              </div>

              <div className="col-span-4 md:col-span-2 text-right font-mono font-bold text-white tracking-tight">
                {leader.points.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
