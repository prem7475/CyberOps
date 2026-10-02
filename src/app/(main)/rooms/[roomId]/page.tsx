"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Terminal as TerminalIcon,
  Play,
  RotateCcw,
  Clock,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Send,
  Lock,
  ChevronRight,
  ShieldCheck,
  Zap,
  Activity,
  Award,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_ROOM } from "@/data/mock-data";

export default function RoomPage() {
  const params = useParams();
  const room = MOCK_ROOM;

  // Lab container state
  const [isProvisioning, setIsProvisioning] = useState(true);
  const [provisionProgress, setProvisionProgress] = useState(0);
  const [sessionTime, setSessionTime] = useState(1200); // 20 min timer
  const [servicesDiscovered, setServicesDiscovered] = useState(0);

  // Terminal state
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "=== CyberOps Isolated Environment v2.0 ===",
    "Target host reachable at 10.50.12.20 (private bridge network)",
    "Type 'help' for available practice commands.",
    ""
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const [ftpState, setFtpState] = useState<"none" | "user" | "pass" | "connected">("none");
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Tasks state
  const [tasks, setTasks] = useState(room.tasks);
  const [flagInput, setFlagInput] = useState("");
  const [flagSolved, setFlagSolved] = useState(false);
  const [flagError, setFlagError] = useState(false);
  const [showReflection, setShowReflection] = useState(false);

  // Hints state
  const [hints, setHints] = useState(room.hints);
  const [pointsDeducted, setPointsDeducted] = useState(0);

  // Provisioning countdown effect
  useEffect(() => {
    const interval = setInterval(() => {
      setProvisionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProvisioning(false);
          return 100;
        }
        return prev + 25;
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (isProvisioning) return;
    const timer = setInterval(() => {
      setSessionTime((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isProvisioning]);

  // Scroll terminal to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim();
    const newHistory = [...terminalHistory, `operator@cyberops:~$ ${cmd}`];
    setTerminalInput("");

    // Custom simulated shell interpreter for high realism
    if (ftpState === "user") {
      newHistory.push("331 Please specify the password.");
      setFtpState("pass");
    } else if (ftpState === "pass") {
      newHistory.push("230 Login successful.");
      newHistory.push("Remote system type is UNIX.");
      newHistory.push("Using binary mode to transfer files.");
      setFtpState("connected");
      // Mark task 2 completed
      setTasks((prev) =>
        prev.map((t) => (t.id === 2 ? { ...t, completed: true } : t))
      );
    } else if (ftpState === "connected") {
      if (cmd === "ls" || cmd === "ls -la" || cmd === "dir") {
        newHistory.push("drwxr-xr-x    2 0        0            4096 Oct 02 14:22 .");
        newHistory.push("drwxr-xr-x    2 0        0            4096 Oct 02 14:22 ..");
        newHistory.push("-rw-r--r--    1 0        0              33 Oct 02 14:23 flag.txt");
        newHistory.push("-rw-r--r--    1 0        0            1024 Oct 02 14:20 notes.txt");
      } else if (cmd.startsWith("get flag.txt") || cmd.startsWith("cat flag.txt") || cmd === "more flag.txt") {
        newHistory.push("200 PORT command successful. Consider using PASV.");
        newHistory.push("150 Opening BINARY mode data connection for flag.txt (33 bytes).");
        newHistory.push("CYBEROPS{an0nym0u5_l0g1n_d3t3ct3d}");
        newHistory.push("226 Transfer complete.");
      } else if (cmd === "exit" || cmd === "quit" || cmd === "bye") {
        newHistory.push("221 Goodbye.");
        setFtpState("none");
      } else {
        newHistory.push(`?Invalid command.`);
      }
    } else {
      // Standard shell mode
      if (cmd === "help") {
        newHistory.push("Supported tools in sandbox:");
        newHistory.push("  nmap <target>          - Network exploration tool & port scanner");
        newHistory.push("  ftp <target>           - File Transfer Protocol client");
        newHistory.push("  ping -c 3 <target>     - Send ICMP ECHO_REQUEST to network hosts");
        newHistory.push("  id, whoami             - Display current operator privileges");
        newHistory.push("  clear                  - Clear terminal scrollback buffer");
      } else if (cmd === "clear") {
        setTerminalHistory([]);
        return;
      } else if (cmd.startsWith("ping")) {
        newHistory.push("PING 10.50.12.20 (10.50.12.20) 56(84) bytes of data.");
        newHistory.push("64 bytes from 10.50.12.20: icmp_seq=1 ttl=64 time=0.045 ms");
        newHistory.push("64 bytes from 10.50.12.20: icmp_seq=2 ttl=64 time=0.038 ms");
        newHistory.push("--- 10.50.12.20 ping statistics ---");
        newHistory.push("2 packets transmitted, 2 received, 0% packet loss");
      } else if (cmd.startsWith("nmap")) {
        newHistory.push("Starting Nmap 7.93 ( https://nmap.org )");
        newHistory.push("Nmap scan report for 10.50.12.20");
        newHistory.push("Host is up (0.0012s latency).");
        newHistory.push("PORT     STATE SERVICE VERSION");
        newHistory.push("21/tcp   open  ftp     vsftpd 2.3.4 (Anonymous access enabled)");
        newHistory.push("80/tcp   open  http    Apache/2.4.41 (Ubuntu)");
        newHistory.push("Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel");
        newHistory.push("Nmap done: 1 IP address (1 host up) scanned in 2.14 seconds");
        setServicesDiscovered(2);
        // Mark task 1 completed
        setTasks((prev) =>
          prev.map((t) => (t.id === 1 ? { ...t, completed: true } : t))
        );
      } else if (cmd.startsWith("ftp 10.50.12.20") || cmd === "ftp") {
        newHistory.push("Connected to 10.50.12.20.");
        newHistory.push("220 (vsFTPd 2.3.4)");
        newHistory.push("Name (10.50.12.20:operator): ");
        setFtpState("user");
      } else if (cmd === "whoami") {
        newHistory.push("operator");
      } else if (cmd === "id") {
        newHistory.push("uid=1000(operator) gid=1000(operator) groups=1000(operator),27(sudo)");
      } else {
        newHistory.push(`bash: ${cmd}: command not found. Type 'help' for available tools.`);
      }
    }

    setTerminalHistory(newHistory);
  };

  const handleFlagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (flagInput.trim() === room.flag) {
      setFlagSolved(true);
      setFlagError(false);
      setShowReflection(true);
      setTasks((prev) =>
        prev.map((t) => (t.requiresFlag ? { ...t, completed: true } : t))
      );
    } else {
      setFlagError(true);
    }
  };

  const handleRevealHint = (hintId: number, cost: number) => {
    setHints((prev) =>
      prev.map((h) => (h.id === hintId ? { ...h, revealed: true } : h))
    );
    setPointsDeducted((prev) => prev + cost);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Bar / Room Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[var(--border-primary)] pb-4">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <Badge variant="cyber">{room.category}</Badge>
            <Badge variant="outline">{room.difficulty.toUpperCase()}</Badge>
            <span className="text-xs font-mono text-[var(--accent-primary)]">
              +{room.points - pointsDeducted} PTS
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            {room.title}
          </h1>
        </div>

        {/* Live Lab Control & Status */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-primary)] text-xs font-mono text-white">
            <Clock className="w-3.5 h-3.5 text-[var(--accent-orange)]" />
            <span>EXPIRES: {formatTimer(sessionTime)}</span>
          </div>

          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-primary)] text-xs font-mono">
            <Activity className="w-3.5 h-3.5 text-[var(--accent-blue)]" />
            <span className="text-[var(--text-secondary)]">TARGET:</span>
            <span className="text-white">{room.targetIp}</span>
          </div>

          <Button variant="secondary" size="sm" className="h-8 text-xs font-mono">
            <RotateCcw className="w-3 h-3 mr-1" /> Reset Box
          </Button>
        </div>
      </div>

      {/* Main Workspace Split: Tasks Panel + Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Tasks, Submission & Hints (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Objectives Card */}
          <Card>
            <CardHeader className="pb-3 border-b border-[var(--border-primary)]">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base font-mono flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-2 text-[var(--accent-primary)]" />
                  MISSION OBJECTIVES
                </CardTitle>
                <span className="text-xs font-mono text-[var(--text-tertiary)]">
                  {tasks.filter((t) => t.completed).length}/{tasks.length} DONE
                </span>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-3 rounded-lg border text-xs transition-all ${
                    task.completed
                      ? "bg-[var(--accent-primary-muted)] border-[var(--border-accent)] text-white"
                      : "bg-[var(--bg-tertiary)] border-[var(--border-secondary)] text-[var(--text-secondary)]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start space-x-2">
                      <span className="font-mono font-bold text-[var(--accent-primary)]">
                        {task.id}.
                      </span>
                      <div>
                        <div className="font-bold text-white mb-0.5">{task.title}</div>
                        <div>{task.description}</div>
                      </div>
                    </div>
                    {task.completed && (
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent-primary)] flex-shrink-0 mt-0.5" />
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Flag Submission Box */}
          <Card className="border-[var(--border-accent)] bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-secondary)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-mono flex items-center text-[var(--accent-primary)]">
                <Sparkles className="w-4 h-4 mr-2" /> SUBMIT PROOF (FLAG)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!flagSolved ? (
                <form onSubmit={handleFlagSubmit} className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="CYBEROPS{...}"
                      value={flagInput}
                      onChange={(e) => {
                        setFlagInput(e.target.value);
                        setFlagError(false);
                      }}
                      className="font-mono text-xs"
                      error={flagError}
                    />
                    <Button type="submit" variant="cyber" size="sm" className="whitespace-nowrap">
                      Submit <Send className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                  {flagError && (
                    <div className="text-xs text-[var(--accent-red)] flex items-center">
                      <AlertTriangle className="w-3.5 h-3.5 mr-1" /> Invalid flag. Keep investigating the target.
                    </div>
                  )}
                </form>
              ) : (
                <div className="p-3 bg-[var(--accent-primary-muted)] border border-[var(--border-accent)] rounded-lg text-center space-y-2">
                  <div className="flex items-center justify-center space-x-1 text-[var(--accent-primary)] font-bold text-sm">
                    <Award className="w-4 h-4" />
                    <span>FLAG VERIFIED // ROOM COMPLETE</span>
                  </div>
                  <div className="text-xs text-[var(--text-secondary)]">
                    +100 Points awarded to your operator profile.
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Hint Ladder */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-mono text-[var(--text-tertiary)] flex items-center">
                <HelpCircle className="w-3.5 h-3.5 mr-1.5" /> HINT LADDER (COSTS POINTS)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              {hints.map((hint, idx) => (
                <div
                  key={hint.id}
                  className="p-3 rounded-lg border border-[var(--border-secondary)] bg-[var(--bg-tertiary)] text-xs"
                >
                  {hint.revealed ? (
                    <div className="text-[var(--text-primary)] font-mono">{hint.text}</div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <span className="text-[var(--text-tertiary)]">Hint #{idx + 1}</span>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-6 text-[10px] font-mono"
                        onClick={() => handleRevealHint(hint.id, hint.cost)}
                      >
                        Unlock (-{hint.cost} PTS)
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Live Browser Terminal (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center text-xs font-mono text-[var(--text-secondary)]">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] status-dot-live"></span>
              <span>ISOLATED PTY SESSION // 10.50.12.10</span>
            </div>
            <div className="text-[var(--text-tertiary)]">
              DISCOVERED SERVICES: <span className="text-[var(--accent-blue)] font-bold">{servicesDiscovered}</span>
            </div>
          </div>

          {/* Terminal Box */}
          <div className="rounded-xl border border-[var(--border-primary)] bg-[#050505] shadow-2xl overflow-hidden font-mono flex flex-col h-[560px]">
            {/* Terminal Header */}
            <div className="px-4 py-2.5 bg-[var(--bg-card)] border-b border-[var(--border-primary)] flex justify-between items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <span className="text-xs text-[var(--text-tertiary)]">bash — 80x24</span>
            </div>

            {/* Terminal Output or Provisioning screen */}
            {isProvisioning ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full border-2 border-[var(--accent-primary)] border-t-transparent animate-spin"></div>
                <div className="font-mono text-sm text-[var(--accent-primary)]">
                  SPINNING UP TARGET CONTAINER...
                </div>
                <div className="w-48 bg-[var(--bg-tertiary)] h-1.5 rounded-full overflow-hidden border border-[var(--border-secondary)]">
                  <div
                    className="bg-[var(--accent-primary)] h-full transition-all duration-300"
                    style={{ width: `${provisionProgress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-[var(--text-tertiary)] font-mono">
                  Allocating network bridge 10.50.12.0/24...
                </div>
              </div>
            ) : (
              <div className="flex-1 p-4 overflow-y-auto space-y-1 text-sm">
                {terminalHistory.map((line, idx) => (
                  <div key={idx} className="leading-relaxed text-[var(--text-secondary)] whitespace-pre-wrap">
                    {line}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>
            )}

            {/* Terminal Input Line */}
            {!isProvisioning && (
              <form
                onSubmit={handleCommand}
                className="p-3 bg-[var(--bg-card)] border-t border-[var(--border-primary)] flex items-center space-x-2"
              >
                <span className="text-[var(--accent-primary)] text-sm font-bold">
                  {ftpState !== "none" ? "ftp>" : "$"}
                </span>
                <input
                  type="text"
                  autoFocus
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  className="flex-1 bg-transparent text-white font-mono text-sm focus:outline-none placeholder:text-[var(--text-tertiary)]"
                  placeholder={ftpState !== "none" ? "type ftp command..." : "type command (try 'nmap 10.50.12.20' or 'help')..."}
                />
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Reflection / Post-Exploit Education Panel (Section 1 Step 9 in Spec) */}
      {showReflection && (
        <div className="mt-8 p-6 rounded-xl border border-[var(--border-accent)] bg-[var(--bg-card)] shadow-2xl relative overflow-hidden animate-fadeIn">
          <div className="flex items-center space-x-2 text-[var(--accent-primary)] font-mono text-xs mb-2">
            <Zap className="w-4 h-4" />
            <span>POST-EXPLOITATION REFLECTION // REAL-WORLD DEFENSE</span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-4">
            What Just Happened?
          </h2>

          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-3 text-[var(--text-secondary)]">
              <div>
                <div className="font-bold text-white mb-1">The Vulnerability:</div>
                <p>{room.reflection.whatHappened}</p>
              </div>
              <div>
                <div className="font-bold text-white mb-1">Production Relevance:</div>
                <p>{room.reflection.whyItHappens}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="font-bold text-white">How To Fix It In Production:</div>
              <p className="text-xs text-[var(--text-secondary)]">{room.reflection.howToFix}</p>
              <pre className="p-3 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-secondary)] text-xs font-mono text-[var(--accent-primary)] overflow-x-auto">
                {room.reflection.secureConfigSnippet}
              </pre>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[var(--border-primary)] flex justify-end">
            <Link href="/paths/linux-fundamentals">
              <Button variant="cyber">
                Return to Syllabus & Next Lesson <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
