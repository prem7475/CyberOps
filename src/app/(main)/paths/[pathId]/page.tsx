"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Terminal, Clock, BookOpen, Target, CheckCircle2, Circle, ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MOCK_PATHS, MOCK_LESSONS } from "@/data/mock-data";

export default function PathDetailPage() {
  const params = useParams();
  const path = MOCK_PATHS.find((p) => p.id === params.pathId) || MOCK_PATHS[0];

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      <Link
        href="/paths"
        className="text-xs font-mono text-[var(--text-tertiary)] hover:text-white flex items-center mb-4 transition-colors w-max"
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to Curriculum
      </Link>

      {/* Hero Header */}
      <div className="p-8 rounded-xl border border-[var(--border-accent)] bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-secondary)] relative overflow-hidden">
        <div className="absolute -right-16 -top-16 opacity-5 pointer-events-none">
          <Terminal className="w-96 h-96 text-[var(--accent-primary)]" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-4">
            <Badge variant="cyber">{path.level.toUpperCase()}</Badge>
            <span className="text-xs font-mono text-[var(--accent-primary)] flex items-center">
              Target completion: {path.estimatedHours}h
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            {path.title}
          </h1>
          <p className="text-base text-[var(--text-secondary)] max-w-2xl mb-8 leading-relaxed">
            {path.description}
          </p>

          <div className="flex flex-col md:flex-row gap-4 items-center">
            {path.progressPercent === 0 ? (
              <Button variant="cyber" size="lg">Enlist in Path</Button>
            ) : (
              <div className="flex-1 w-full flex items-center space-x-4">
                <Button variant="cyber" size="lg">Resume Syllabus</Button>
                <div className="flex-1 max-w-sm">
                  <div className="flex justify-between text-xs font-mono mb-1 text-[var(--text-tertiary)]">
                    <span>PATH COMPLETION</span>
                    <span className="text-[var(--accent-primary)]">{path.progressPercent}%</span>
                  </div>
                  <div className="h-2 w-full bg-[var(--bg-tertiary)] rounded-full overflow-hidden border border-[var(--border-secondary)]">
                    <div
                      className="h-full bg-[var(--accent-primary)] rounded-full"
                      style={{ width: `${path.progressPercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Syllabus Modules */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6 font-mono flex items-center border-b border-[var(--border-primary)] pb-2">
          &lt;SYLLABUS_MODULES&gt;
        </h2>

        <div className="space-y-6">
          {/* Module 1 Mock */}
          <Card className="border-[var(--border-primary)] shadow-sm">
            <CardHeader className="bg-[var(--bg-tertiary)] border-b border-[var(--border-primary)] pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs font-mono text-[var(--accent-primary)] mb-1">MODULE 1</div>
                  <CardTitle className="text-lg">Core Architecture & Access</CardTitle>
                </div>
                <Badge variant="outline" className="text-green-500 border-green-500/30 bg-green-500/10">COMPLETED</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4 p-0">
              <div className="divide-y divide-[var(--border-primary)]">
                {MOCK_LESSONS.slice(0, 2).map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/lessons/${lesson.id}`}
                    className="flex items-center p-4 hover:bg-[var(--bg-card-hover)] transition-colors group"
                  >
                    <div className="mr-4">
                      {lesson.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-[var(--accent-primary)]" />
                      ) : (
                        <Circle className="w-5 h-5 text-[var(--text-tertiary)]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white group-hover:text-[var(--accent-primary)] transition-colors">
                        {lesson.title}
                      </div>
                      <div className="text-xs text-[var(--text-tertiary)] font-mono mt-1 flex items-center">
                        <BookOpen className="w-3 h-3 mr-1" /> Lecture • <Clock className="w-3 h-3 mx-1" /> {lesson.durationMinutes}m
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Module 2 Mock */}
          <Card className="border-[var(--border-primary)] shadow-sm">
            <CardHeader className="bg-[var(--bg-tertiary)] border-b border-[var(--border-primary)] pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs font-mono text-[var(--accent-blue)] mb-1">MODULE 3</div>
                  <CardTitle className="text-lg">Attack Surfaces & Exploitation</CardTitle>
                </div>
                <Badge variant="blue">IN PROGRESS</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4 p-0">
              <div className="divide-y divide-[var(--border-primary)]">
                {MOCK_LESSONS.slice(2).map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/lessons/${lesson.id}`}
                    className="flex justify-between items-center p-4 hover:bg-[var(--bg-card-hover)] transition-colors group"
                  >
                    <div className="flex items-center">
                      <div className="mr-4">
                        <Circle className="w-5 h-5 text-[var(--text-tertiary)] group-hover:text-[var(--accent-primary)] transition-colors" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white group-hover:text-[var(--accent-primary)] transition-colors">
                          {lesson.title}
                        </div>
                        <div className="text-xs text-[var(--text-tertiary)] font-mono mt-1 flex items-center">
                           <BookOpen className="w-3 h-3 mr-1" /> Lecture •
                           <Clock className="w-3 h-3 mx-1" /> {lesson.durationMinutes}m
                        </div>
                      </div>
                    </div>

                    {lesson.roomId && (
                      <Badge variant="cyber" className="ml-4 gap-1">
                        <Target className="w-3.5 h-3.5" /> Room Embedded
                      </Badge>
                    )}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Locked Module */}
          <Card className="border-[var(--border-primary)] opacity-60">
            <CardHeader className="bg-[var(--bg-secondary)] pb-4">
              <div className="flex items-center space-x-3">
                <Lock className="w-5 h-5 text-[var(--text-tertiary)]" />
                <div>
                  <div className="text-xs font-mono text-[var(--text-tertiary)] mb-1">MODULE 4</div>
                  <CardTitle className="text-base text-[var(--text-secondary)]">Advanced Shell Techniques & Post-Exploitation</CardTitle>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
