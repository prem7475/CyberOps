"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Play,
  Terminal,
  FileText,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Copy,
  Check,
  Shield,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_LESSONS } from "@/data/mock-data";

export default function LessonPage() {
  const params = useParams();
  const lessonId = params.lessonId as string;
  const lesson = MOCK_LESSONS.find((l) => l.id === lessonId) || MOCK_LESSONS[2];

  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<number | null>(0);

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between text-xs font-mono text-[var(--text-tertiary)] border-b border-[var(--border-primary)] pb-4">
        <div className="flex items-center space-x-2">
          <Link href="/paths/linux-fundamentals" className="hover:text-white transition-colors">
            LINUX FUNDAMENTALS
          </Link>
          <span>/</span>
          <span className="text-[var(--accent-primary)]">LESSON {lesson.order} OF 5</span>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/lessons/linux-2">
            <Button variant="ghost" size="sm" className="h-7 text-xs font-mono">
              <ArrowLeft className="w-3 h-3 mr-1" /> Prev
            </Button>
          </Link>
          <Link href="/lessons/linux-5">
            <Button variant="ghost" size="sm" className="h-7 text-xs font-mono">
              Next <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Lesson Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Badge variant="cyber">MODULE 3: ATTACK SURFACES</Badge>
          <span className="text-xs font-mono text-[var(--text-tertiary)] flex items-center">
            <Clock className="w-3 h-3 mr-1" /> {lesson.durationMinutes} min runtime
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          {lesson.title}
        </h1>
        <p className="text-base text-[var(--text-secondary)] mt-2">
          {lesson.summary}
        </p>
      </div>

      {/* Video Lecture Mock Component */}
      <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden shadow-2xl relative aspect-video flex flex-col items-center justify-center group">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>

        {/* Video Thumbnail Graphic */}
        <div className="absolute inset-0 opacity-20 bg-cover bg-center flex items-center justify-center font-mono text-xs text-[var(--accent-primary)]">
          <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
            <Shield className="w-20 h-20 mb-4 opacity-40 text-[var(--accent-primary)]" />
            <span>VIDEO STREAM SOURCE: MUX-STREAM-SEC-05.MP4</span>
          </div>
        </div>

        {/* Play Button */}
        <div className="relative z-10 w-20 h-20 rounded-full bg-[var(--accent-primary)] text-black flex items-center justify-center shadow-[var(--shadow-glow)] cursor-pointer group-hover:scale-110 transition-transform">
          <Play className="w-8 h-8 fill-black translate-x-0.5" />
        </div>

        {/* Bottom controls overlay mock */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-between items-center text-xs font-mono text-white">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)]"></span>
            <span>08:42 / 12:15</span>
          </div>
          <span className="text-[var(--text-tertiary)]">1080p 60fps • STREAMING</span>
        </div>
      </div>

      {/* Action Banner to Try It Now */}
      {lesson.roomId && (
        <div className="p-6 rounded-xl border border-[var(--border-accent)] bg-gradient-to-r from-[var(--bg-tertiary)] to-[var(--bg-card)] flex flex-col md:flex-row items-center justify-between gap-4 shadow-[var(--shadow-glow)]">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg bg-[var(--accent-primary-muted)] border border-[var(--border-accent)] flex items-center justify-center flex-shrink-0">
              <Terminal className="w-6 h-6 text-[var(--accent-primary)]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Hands-On Practice Lab Available</h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Launch the private sandbox container to practice finding the anonymous FTP vulnerability live.
              </p>
            </div>
          </div>
          <Link href={`/rooms/${lesson.roomId}`}>
            <Button variant="cyber" size="lg" className="whitespace-nowrap">
              Try It Now In Sandbox <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      )}

      {/* Key Commands Reference Box */}
      <Card className="border-[var(--border-primary)] bg-[var(--bg-secondary)]">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-[var(--accent-primary)]" />
            <CardTitle className="text-base font-mono">KEY COMMANDS SYNTAX</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {lesson.keyCommands.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-secondary)] font-mono text-sm gap-2"
            >
              <div className="flex items-center space-x-2 text-[var(--accent-primary)] overflow-x-auto">
                <span className="text-[var(--text-tertiary)] select-none">$</span>
                <span>{item.command}</span>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-3">
                <span className="text-xs text-[var(--text-secondary)] font-sans">{item.description}</span>
                <button
                  onClick={() => handleCopy(item.command)}
                  className="p-1.5 rounded hover:bg-[var(--bg-card-hover)] text-[var(--text-tertiary)] hover:text-white transition-colors"
                  title="Copy command"
                >
                  {copiedCmd === item.command ? (
                    <Check className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Collapsible Notes Sections */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center">
          <FileText className="w-5 h-5 mr-2 text-[var(--accent-blue)]" />
          Technical Deep-Dive Notes
        </h2>

        {lesson.notes.map((note, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden"
          >
            <button
              onClick={() => setOpenSection(openSection === idx ? null : idx)}
              className="w-full p-4 flex items-center justify-between text-left font-medium text-white hover:bg-[var(--bg-card-hover)] transition-colors"
            >
              <span>{note.title}</span>
              {openSection === idx ? (
                <ChevronUp className="w-4 h-4 text-[var(--text-tertiary)]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[var(--text-tertiary)]" />
              )}
            </button>
            {openSection === idx && (
              <div className="p-4 pt-0 text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-secondary)] bg-[var(--bg-tertiary)]">
                <p className="mt-3">{note.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
