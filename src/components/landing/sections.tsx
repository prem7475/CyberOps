"use client";

import Link from "next/link";
import { Terminal, ShieldAlert, Cpu, Network, LockKeyhole, ArrowRight, ChevronRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TerminalBlock } from "@/components/ui/terminal-block";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export function HeroSection() {
  const demoLines = [
    "$ nmap -sV 10.50.12.20",
    "Starting Nmap 7.93 ( https://nmap.org )",
    "Nmap scan report for 10.50.12.20",
    "Host is up (0.012s latency).",
    "PORT   STATE SERVICE VERSION",
    "21/tcp open  ftp     vsftpd 2.3.4",
    "80/tcp open  http    Apache httpd 2.4.41",
    "MAC Address: 02:42:0A:32:0C:14 (Unknown)",
    "Service detection performed. Please report any incorrect results.",
    "Nmap done: 1 IP address (1 host up) scanned in 12.43 seconds",
    "$ ftp 10.50.12.20",
    "Connected to 10.50.12.20.",
    "220 (vsFTPd 2.3.4)",
    "Name: anonymous",
    "331 Please specify the password.",
    "Password: ",
    "230 Login successful.",
    "> ls -la",
    "drwxr-xr-x    2 0        0            4096 Oct 02 14:22 .",
    "drwxr-xr-x    2 0        0            4096 Oct 02 14:22 ..",
    "-rw-r--r--    1 0        0              33 Oct 02 14:23 flag.txt",
    "> cat flag.txt",
    "CYBEROPS{an0nym0u5_l0g1n_d3t3ct3d}",
  ];

  return (
    <div className="relative overflow-hidden w-full pt-16 pb-24 md:pt-24 md:pb-32">
      {/* Background elements */}
      <div className="absolute inset-0 cyber-grid opacity-30 z-0"></div>
      <div className="absolute top-0 right-[10%] w-[600px] h-[600px] bg-[var(--accent-primary-glow)] rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[var(--accent-blue-glow)] rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full border border-[var(--border-accent)] bg-[var(--accent-primary-muted)] px-3 py-1 text-sm text-[var(--accent-primary)] mb-6 font-mono">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] status-dot-live mr-2"></span>
              Isolated Sandbox Environments v2.0
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
              Master Cybersecurity in <span className="text-glow-green text-[var(--accent-primary)]">Real Labs.</span> Not Multiple Choice.
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-8 leading-relaxed">
              Learn offensive techniques by breaking realistic, containerized targets. Everything you do is completely real. The targets are 100% isolated.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/signup">
                <Button size="lg" variant="cyber" className="w-full sm:w-auto">
                  Start Your First Lab <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/paths">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  View Learning Paths
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-6 text-sm text-[var(--text-tertiary)] font-mono">
              <div className="flex items-center"><Terminal className="w-4 h-4 mr-2" /> Browser-based</div>
              <div className="flex items-center"><Activity className="w-4 h-4 mr-2" /> Live Targets</div>
              <div className="flex items-center"><Cpu className="w-4 h-4 mr-2" /> Root Access</div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[550px] lg:max-w-none">
            {/* Decorative frame for terminal */}
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[var(--accent-primary-dim)] to-[var(--accent-blue-dim)] opacity-20 blur-sm"></div>
            <TerminalBlock lines={demoLines} delay={400} className="relative shadow-[var(--shadow-glow-strong)] max-h-[450px]" />

            {/* Floating stats card */}
            <div className="absolute -right-6 -bottom-6 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-lg p-4 shadow-xl hidden md:block animate-bounce" style={{ animationDuration: '4s' }}>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--accent-primary-muted)] flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5 text-[var(--accent-primary)]" />
                </div>
                <div>
                  <div className="text-xs text-[var(--text-secondary)] font-mono uppercase tracking-wider">Target Status</div>
                  <div className="font-bold text-white">Compromised</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeatureSection() {
  const features = [
    {
      title: "100% Isolated Virtual Networks",
      description: "Each lab spins up a private Docker bridge network just for you. Real networks, real IP addresses, zero risk of affecting production systems.",
      icon: Network,
      glow: "green"
    },
    {
      title: "Real Tools in the Browser",
      description: "No local VMs or VPNs required. Use Nmap, Metasploit, Burp Suite, and other industry-standard tools directly in an authenticated WebSocket terminal.",
      icon: Terminal,
      glow: "blue"
    },
    {
      title: "In-Depth Explanations",
      description: "Don't just capture the flag. Every room ends with a deep-dive on why the vulnerability existed in the real world and exactly how developers patch it.",
      icon: LockKeyhole,
      glow: "purple"
    }
  ];

  return (
    <section className="py-24 bg-[var(--bg-secondary)] border-y border-[var(--border-primary)] relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            The Illusion of Danger. <br/>The Reality of Learning.
          </h2>
          <p className="text-[var(--text-secondary)] text-lg">
            We don't teach you to hack real companies. We build realistic digital sets, configure genuine vulnerabilities into them, and give you the tools to break the set.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <Card key={idx} glow={feature.glow as any} className="bg-[var(--bg-primary)] border-[var(--border-primary)]">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-[var(--bg-elevated)] border border-[var(--border-secondary)]`}>
                  <feature.icon className={`w-6 h-6 ${
                    feature.glow === 'green' ? 'text-[var(--accent-primary)]' :
                    feature.glow === 'blue' ? 'text-[var(--accent-blue)]' :
                    'text-[var(--accent-purple)]'
                  }`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-[var(--text-secondary)] leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WorkflowSection() {
  const steps = [
    { number: "01", title: "Learn the Concept", desc: "Watch a short, high-density video explaining a specific technique or architecture flaw." },
    { number: "02", title: "Provision Target", desc: "Click a button to spin up a private, deliberately vulnerable container instance in seconds." },
    { number: "03", title: "Exploit & Capture", desc: "Use the provided browser terminal to scan, exploit the flaw, and retrieve the hidden flag." },
    { number: "04", title: "Reflect & Fix", desc: "Understand the mitigation. Learn how modern frameworks prevent this exact vulnerability." }
  ];

  return (
    <section className="py-24 bg-[var(--bg-primary)]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
              The Learning Loop That Actually Works
            </h2>
            <p className="text-[var(--text-secondary)] text-lg mb-8">
              Watching videos builds vocabulary. Passive reading builds false confidence. Only hands-on manipulation builds actual skill. Our entire platform is engineered around one tight, addictive loop.
            </p>

            <div className="space-y-6">
              {steps.map((step, idx) => (
                <div key={idx} className="flex group">
                  <div className="flex-shrink-0 w-12 text-xl font-mono font-bold text-[var(--text-tertiary)] group-hover:text-[var(--accent-primary)] transition-colors pt-1">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-[var(--text-secondary)]">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link href="/paths">
                <Button variant="outline" className="font-mono">
                  Explore curriculum syllabus <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
             {/* Decorative abstract visual showing the loop */}
             <div className="aspect-square max-w-md mx-auto rounded-full border border-[var(--border-secondary)] relative pulse-ring flex items-center justify-center p-8">
                <div className="absolute inset-0 rounded-full border border-[var(--accent-primary-muted)] m-4 border-dashed"></div>
                <div className="absolute inset-0 rounded-full border border-[var(--accent-blue-glow)] m-12"></div>

                <div className="grid grid-cols-2 gap-4 w-full h-full p-4 relative z-10">
                  <Card className="bg-[var(--bg-elevated)]/80 backdrop-blur border-[var(--accent-primary-muted)] flex flex-col items-center justify-center text-center p-4">
                    <ShieldAlert className="w-8 h-8 text-[var(--accent-primary)] mb-2" />
                    <div className="font-bold text-sm">Vulnerability</div>
                  </Card>
                  <Card className="bg-[var(--bg-elevated)]/80 backdrop-blur border-[var(--border-primary)] flex flex-col items-center justify-center text-center p-4">
                    <Terminal className="w-8 h-8 text-[var(--text-secondary)] mb-2" />
                    <div className="font-bold text-sm">Terminal</div>
                  </Card>
                  <Card className="bg-[var(--bg-elevated)]/80 backdrop-blur border-[var(--border-primary)] flex flex-col items-center justify-center text-center p-4">
                    <LockKeyhole className="w-8 h-8 text-[var(--text-secondary)] mb-2" />
                    <div className="font-bold text-sm">Target Box</div>
                  </Card>
                  <Card className="bg-[var(--bg-elevated)]/80 backdrop-blur border-[var(--accent-blue-glow)] flex flex-col items-center justify-center text-center p-4">
                    <div className="text-[var(--accent-blue)] font-mono font-bold text-xl mb-1">FLAG</div>
                    <div className="font-mono text-xs text-[var(--text-tertiary)] truncate w-full">CYBEROPS{'{...}'}</div>
                  </Card>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
