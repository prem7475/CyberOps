"use client";

import { useState } from "react";
import { Terminal, Shield, ArrowRight, CheckCircle2, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Question {
  id: number;
  question: string;
  options: { label: string; levelScore: number }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Have you ever interacted with a Linux/POSIX terminal?",
    options: [
      { label: "Never, completely new to the command line", levelScore: 0 },
      { label: "I know basic navigation (cd, ls, cat, grep)", levelScore: 1 },
      { label: "Comfortable with scripting, piping, permissions & network tools", levelScore: 2 }
    ]
  },
  {
    id: 2,
    question: "What happens during a TCP port scan (like Nmap)?",
    options: [
      { label: "I'm not sure what a port or TCP handshake is", levelScore: 0 },
      { label: "It sends SYN packets to discover open listening services", levelScore: 1 },
      { label: "I frequently script custom Scapy probes and bypass IDS/IPS filters", levelScore: 2 }
    ]
  },
  {
    id: 3,
    question: "Have you ever audited or exploited web application flaws (SQLi, XSS)?",
    options: [
      { label: "No, I want to learn web security from scratch", levelScore: 0 },
      { label: "I understand basic SQL injection and Burp Suite request tampering", levelScore: 1 },
      { label: "Regularly participate in CTFs or bug bounty programs", levelScore: 2 }
    ]
  },
  {
    id: 4,
    question: "What is your primary training goal?",
    options: [
      { label: "Transitioning into IT/Cybersecurity from scratch", levelScore: 0 },
      { label: "Junior analyst wanting practical offensive skills", levelScore: 1 },
      { label: "Senior developer or pentester looking for advanced simulated targets", levelScore: 2 }
    ]
  }
];

export function OnboardingQuiz({ onComplete }: { onComplete: (pathId: string) => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [resultPath, setResultPath] = useState<string | null>(null);

  const handleSelectOption = (levelScore: number) => {
    const nextScore = score + levelScore;
    setScore(nextScore);

    if (currentStep + 1 < QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate recommended path
      let recommended = "linux-fundamentals";
      if (nextScore >= 5) {
        recommended = "pentesting-methodology";
      } else if (nextScore >= 2) {
        recommended = "web-app-security";
      }
      setResultPath(recommended);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <Card className="w-full max-w-xl bg-[var(--bg-card)] border-[var(--border-accent)] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-blue)]"></div>

        {!resultPath ? (
          <div>
            <CardHeader className="border-b border-[var(--border-primary)] pb-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2 text-[var(--accent-primary)] font-mono text-xs">
                  <Terminal className="w-4 h-4" />
                  <span>INITIAL SKILL EVALUATION</span>
                </div>
                <span className="text-xs text-[var(--text-tertiary)] font-mono">
                  STEP {currentStep + 1} OF {QUESTIONS.length}
                </span>
              </div>
              <CardTitle className="text-xl mt-3 text-white">
                {QUESTIONS[currentStep].question}
              </CardTitle>
            </CardHeader>

            <CardContent className="pt-6 space-y-3">
              {QUESTIONS[currentStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.levelScore)}
                  className="w-full text-left p-4 rounded-lg border border-[var(--border-secondary)] bg-[var(--bg-tertiary)] hover:bg-[var(--bg-card-hover)] hover:border-[var(--accent-primary)] transition-all flex items-center justify-between group"
                >
                  <span className="text-sm text-[var(--text-primary)] group-hover:text-white">
                    {opt.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[var(--text-tertiary)] group-hover:text-[var(--accent-primary)] group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </CardContent>
          </div>
        ) : (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-[var(--accent-primary-muted)] border border-[var(--accent-primary)] rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-[var(--accent-primary)]" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">Evaluation Complete</h3>
            <p className="text-sm text-[var(--text-secondary)] mb-6">
              Based on your answers, we have calibrated your customized syllabus.
            </p>

            <div className="p-4 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-lg text-left mb-6">
              <div className="text-xs font-mono text-[var(--accent-primary)] mb-1">RECOMMENDED STARTING PATH</div>
              <div className="text-lg font-bold text-white">
                {resultPath === "linux-fundamentals" && "Linux Fundamentals for Hackers"}
                {resultPath === "web-app-security" && "Web Application Security Basics"}
                {resultPath === "pentesting-methodology" && "Intro to Pentesting Methodology"}
              </div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">
                Foundational hands-on labs with guided targets and live browser terminals.
              </div>
            </div>

            <Button
              variant="cyber"
              className="w-full"
              onClick={() => onComplete(resultPath)}
            >
              Launch Recommended Syllabus <CheckCircle2 className="ml-2 w-4 h-4" />
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
