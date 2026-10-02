"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Terminal,
  Play,
  ArrowRight,
  Shield,
  Clock,
  Zap,
  Target,
  Flame,
  CheckCircle2,
  Lock,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressRing } from "@/components/dashboard/progress-ring";
import { OnboardingQuiz } from "@/components/onboarding/quiz";
import { MOCK_PATHS, MOCK_LESSONS, MOCK_ROOM } from "@/data/mock-data";

export default function DashboardPage() {
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <div className="space-y-8">
      {/* Quiz modal if requested */}
      {showQuiz && <OnboardingQuiz onComplete={() => setShowQuiz(false)} />}

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-primary)] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[var(--accent-primary)] mb-1">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] status-dot-live"></span>
            <span>SYSTEM READY // SANDBOX ACTIVE</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Operator Console
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Active session: <span className="text-[var(--text-primary)] font-mono">linux-fundamentals-01</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowQuiz(true)}
            className="text-xs font-mono"
          >
            Re-evaluate Skills
          </Button>
          <Link href="/rooms/room-ftp-anon">
            <Button variant="cyber" size="sm">
              <Play className="w-3.5 h-3.5 mr-2" /> Launch Target Lab
            </Button>
          </Link>
        </div>
      </div>

      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Continue Where Left Off */}
        <Card className="md:col-span-2 border-[var(--border-accent)] bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-secondary)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Terminal className="w-32 h-32 text-[var(--accent-primary)]" />
          </div>
          <CardHeader>
            <div className="flex justify-between items-start">
              <Badge variant="cyber">CONTINUE LEARNING</Badge>
              <span className="text-xs font-mono text-[var(--text-tertiary)] flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1" /> 15m remaining
              </span>
            </div>
            <CardTitle className="text-2xl mt-2 text-white">
              The Shell as an Attack Surface: Anonymous FTP
            </CardTitle>
            <CardDescription className="text-sm text-[var(--text-secondary)]">
              Path: Linux Fundamentals for Hackers • Module 3, Lesson 5
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="p-4 bg-[var(--bg-tertiary)] rounded-lg border border-[var(--border-secondary)] mb-6">
              <div className="text-xs font-mono text-[var(--text-secondary)] mb-1">UPCOMING OBJECTIVE:</div>
              <div className="text-sm text-white font-medium">
                Enumerate port 21 and exploit unauthenticated file read misconfiguration on the staging container.
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-[var(--text-tertiary)] font-mono">
                <span>PROGRESS:</span>
                <span className="text-[var(--accent-primary)] font-bold">4/5 Lessons (80%)</span>
              </div>
              <Link href="/lessons/linux-5">
                <Button variant="cyber">
                  Resume Lesson <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Global Progress & Stats */}
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-lg">Overall Mastery</CardTitle>
            <CardDescription>Linux Fundamentals syllabus</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-2">
            <ProgressRing radius={55} stroke={8} progress={75} />
            <div className="grid grid-cols-2 gap-4 w-full mt-6 pt-4 border-t border-[var(--border-primary)] text-center">
              <div>
                <div className="text-xs text-[var(--text-tertiary)] font-mono">FLAGS CAPTURED</div>
                <div className="text-xl font-bold font-mono text-white mt-0.5">8 / 12</div>
              </div>
              <div>
                <div className="text-xs text-[var(--text-tertiary)] font-mono">LAB TIME</div>
                <div className="text-xl font-bold font-mono text-white mt-0.5">3.4 hrs</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Suggested Rooms & Drills */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-white">Recommended Practice Labs</h2>
            <p className="text-xs text-[var(--text-secondary)]">Calibrated to your current skill level</p>
          </div>
          <Link href="/paths" className="text-xs font-mono text-[var(--accent-primary)] hover:underline flex items-center">
            View full catalog <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card glow="green" className="card-hover">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <Badge variant="cyber">Linux</Badge>
                <span className="text-xs font-mono text-[var(--accent-primary)]">+100 PTS</span>
              </div>
              <CardTitle className="text-lg mt-2">Anonymous FTP Recon</CardTitle>
              <CardDescription className="text-xs">
                Inspect open daemons and extract unauthorized flags.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)] font-mono mb-4">
                <span>DIFFICULTY: EASY</span>
                <span>~20 MIN</span>
              </div>
              <Link href="/rooms/room-ftp-anon">
                <Button variant="secondary" className="w-full text-xs">
                  Launch Room
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card glow="blue" className="card-hover">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <Badge variant="blue">Web App</Badge>
                <span className="text-xs font-mono text-[var(--accent-blue)]">+150 PTS</span>
              </div>
              <CardTitle className="text-lg mt-2">SQLi Auth Bypass</CardTitle>
              <CardDescription className="text-xs">
                Manipulate SQL WHERE clauses to gain administrator session cookies.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)] font-mono mb-4">
                <span>DIFFICULTY: EASY</span>
                <span>~30 MIN</span>
              </div>
              <Link href="/rooms/room-ftp-anon">
                <Button variant="secondary" className="w-full text-xs">
                  Launch Room
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card glow="purple" className="card-hover">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <Badge variant="outline">PrivEsc</Badge>
                <span className="text-xs font-mono text-[var(--accent-purple)]">+250 PTS</span>
              </div>
              <CardTitle className="text-lg mt-2">SUID Binary Abuse</CardTitle>
              <CardDescription className="text-xs">
                Leverage misconfigured GTFOBins binaries to elevate to root.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)] font-mono mb-4">
                <span>DIFFICULTY: MEDIUM</span>
                <span>~45 MIN</span>
              </div>
              <Link href="/rooms/room-ftp-anon">
                <Button variant="secondary" className="w-full text-xs">
                  Launch Room
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
