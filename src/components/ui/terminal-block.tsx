"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// This is a decorative terminal for landing pages/UI elements
// Not the actual xterm.js functional terminal
interface TerminalBlockProps {
  lines: string[];
  typingEffect?: boolean;
  className?: string;
  delay?: number;
}

export function TerminalBlock({
  lines,
  typingEffect = true,
  className,
  delay = 500
}: TerminalBlockProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!typingEffect) {
      setVisibleLines(lines);
      return;
    }

    if (currentIndex < lines.length) {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => [...prev, lines[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, lines, typingEffect, delay]);

  return (
    <div className={cn(
      "rounded-lg overflow-hidden border border-[var(--border-primary)] bg-[#050505] shadow-2xl font-mono text-sm",
      className
    )}>
      <div className="flex items-center px-4 py-2 bg-[var(--bg-card)] border-b border-[var(--border-primary)]">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="mx-auto text-xs text-[var(--text-tertiary)] flex items-center">
          <span className="mr-2">bash</span>
          <span>- 80x24</span>
        </div>
      </div>
      <div className="p-4 h-full overflow-y-auto min-h-[200px]">
        {visibleLines.map((line, idx) => (
          <div key={idx} className="mb-1 leading-relaxed">
            {line.startsWith(">") ? (
              <span className="text-[var(--accent-primary)]">{line}</span>
            ) : line.startsWith("$") ? (
              <div className="flex">
                <span className="text-[var(--accent-blue)] mr-2">$</span>
                <span className="text-white">{line.substring(2)}</span>
              </div>
            ) : line.startsWith("!") ? (
              <span className="text-[var(--accent-red)]">{line.substring(1)}</span>
            ) : line.startsWith("#") ? (
              <span className="text-[var(--text-tertiary)]">{line}</span>
            ) : (
              <span className="text-[var(--text-secondary)]">{line}</span>
            )}
          </div>
        ))}
        {typingEffect && currentIndex === lines.length && (
          <div className="flex mt-1">
            <span className="text-[var(--accent-blue)] mr-2">$</span>
            <span className="w-2 h-4 bg-[var(--text-primary)] terminal-cursor inline-block"></span>
          </div>
        )}
      </div>
    </div>
  );
}
