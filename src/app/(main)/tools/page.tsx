"use client";

import React, { useState } from "react";
import { Terminal, Search, Shield, Zap, BookOpen, ExternalLink, Copy, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ToolItem {
  id: string;
  name: string;
  category: string;
  description: string;
  syntax: string;
  example: string;
  flags: { flag: string; desc: string }[];
}

const TOOLS_DATA: ToolItem[] = [
  {
    id: "nmap",
    name: "Nmap",
    category: "Reconnaissance & Scanning",
    description: "Network exploration tool and security / port scanner.",
    syntax: "nmap [Scan Type...] [Options] {target specification}",
    example: "nmap -sC -sV -p- -T4 10.10.11.23",
    flags: [
      { flag: "-sC", desc: "Performs a script scan using the default set of scripts." },
      { flag: "-sV", desc: "Probes open ports to determine service/version info." },
      { flag: "-p-", desc: "Scan all ports from 1 through 65535." },
      { flag: "-T4", desc: "Sets timing template (higher is faster, aggressive)." },
    ],
  },
  {
    id: "ffuf",
    name: "ffuf",
    category: "Web Fuzzing & Enumeration",
    description: "Fast web fuzzer written in Go for discovering hidden files and directories.",
    syntax: "ffuf -u <URL>/FUZZ -w <wordlist> [options]",
    example: "ffuf -u http://10.10.11.23/FUZZ -w /usr/share/wordlists/dirb/common.txt -mc 200,301",
    flags: [
      { flag: "-u", desc: "Target URL with the FUZZ keyword placeholder." },
      { flag: "-w", desc: "Wordlist file path." },
      { flag: "-mc", desc: "Match HTTP status codes, or 'all'." },
    ],
  },
  {
    id: "netcat",
    name: "Netcat (nc)",
    category: "Networking & Shells",
    description: "Arbitrary TCP and UDP connections and listens, commonly used for reverse shells.",
    syntax: "nc [options] [host] [port]",
    example: "nc -lvnp 4444",
    flags: [
      { flag: "-l", desc: "Listen mode, for inbound connects." },
      { flag: "-v", desc: "Verbose output mode." },
      { flag: "-n", desc: "Numeric-only IP addresses, no DNS." },
      { flag: "-p", desc: "Specify local port for connections." },
    ],
  },
  {
    id: "sqlmap",
    name: "SQLMap",
    category: "Exploitation",
    description: "Automatic SQL injection and database takeover tool.",
    syntax: "sqlmap -u <url> [options]",
    example: "sqlmap -u 'http://target/login.php?id=1' --batch --dbs",
    flags: [
      { flag: "-u", desc: "Target URL to test for injection." },
      { flag: "--dbs", desc: "Enumerate DBMS databases." },
      { flag: "--batch", desc: "Never ask for user input, use default behavior." },
    ],
  },
  {
    id: "gobuster",
    name: "Gobuster",
    category: "Web Fuzzing & Enumeration",
    description: "Directory/file, DNS, and VHost busting tool written in Go.",
    syntax: "gobuster dir -u <url> -w <wordlist> [options]",
    example: "gobuster dir -u http://target.local -w /wordlists/common.txt -x php,txt,html",
    flags: [
      { flag: "-u", desc: "Target URL." },
      { flag: "-w", desc: "Path to wordlist." },
      { flag: "-x", desc: "File extension filter list." },
    ],
  },
  {
    id: "john",
    name: "John the Ripper",
    category: "Password Cracking",
    description: "Fast password cracker for brute-forcing hashes and protected archives.",
    syntax: "john [options] [password files]",
    example: "john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt",
    flags: [
      { flag: "--wordlist", desc: "Path to dictionary / wordlist file." },
      { flag: "--format", desc: "Force specific ciphertext hash format." },
    ],
  },
];

export default function ToolsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredTools = TOOLS_DATA.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div>
        <div className="text-xs font-mono text-[var(--accent-primary)] mb-1 flex items-center">
          <BookOpen className="w-4 h-4 mr-1.5" /> ARSENAL REFERENCE
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Tools & Command Library
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Quick cheatsheets, essential syntax patterns, and parameter flags for core offensive utilities.
        </p>
      </div>

      {/* Search Filter */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[var(--text-tertiary)]" />
          <Input
            placeholder="Search tools, categories, syntax..."
            className="pl-9 bg-[var(--bg-card)] border-[var(--border-primary)]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Grid of Tools */}
      <div className="grid gap-6">
        {filteredTools.map((tool) => (
          <Card key={tool.id} className="bg-[var(--bg-card)] border-[var(--border-secondary)]">
            <CardHeader className="pb-3 border-b border-[var(--border-primary)] bg-[var(--bg-tertiary)] flex flex-row items-center justify-between">
              <div>
                <div className="flex items-center space-x-3">
                  <CardTitle className="text-xl font-mono text-white">{tool.name}</CardTitle>
                  <Badge variant="outline">{tool.category}</Badge>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-1">{tool.description}</p>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {/* Syntax / Example */}
              <div>
                <div className="text-xs font-mono text-[var(--text-tertiary)] mb-1.5">EXAMPLE USAGE</div>
                <div className="flex items-center justify-between bg-[var(--bg-primary)] p-3 rounded-lg border border-[var(--border-primary)] font-mono text-xs text-[var(--accent-primary)] overflow-x-auto">
                  <span>{tool.example}</span>
                  <button
                    onClick={() => handleCopy(tool.example, tool.id)}
                    className="ml-4 text-[var(--text-tertiary)] hover:text-white transition-colors"
                  >
                    {copiedId === tool.id ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Common Flags */}
              <div>
                <div className="text-xs font-mono text-[var(--text-tertiary)] mb-2">KEY PARAMETERS</div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {tool.flags.map((f, idx) => (
                    <div key={idx} className="flex items-start text-xs p-2 rounded bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
                      <span className="font-mono font-bold text-[var(--accent-orange)] mr-2 shrink-0">{f.flag}</span>
                      <span className="text-[var(--text-secondary)]">{f.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
