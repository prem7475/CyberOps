import React from "react";
import { User, Mail, Shield, Zap, Activity, Clock, LogOut, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BadgeShowcase } from "@/components/gamification/badge-showcase";
import { CertificatePreview } from "@/components/gamification/certificate-preview";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header / Main Profile Card */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <Card className="bg-[var(--bg-card)] border-[var(--border-secondary)] flex-1 w-full">
          <CardContent className="p-8">
            <div className="flex items-start justify-between sm:items-center flex-col sm:flex-row gap-6">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--bg-secondary)] border border-[var(--border-primary)] flex items-center justify-center p-1">
                  <div className="w-full h-full bg-[var(--bg-card)] rounded-lg flex items-center justify-center">
                    <User className="w-8 h-8 text-[var(--accent-primary)]" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight flex items-center">
                    0xNeo
                    <Badge variant="cyber" className="ml-3 h-5 px-1.5 text-[10px]">PRO</Badge>
                  </h1>
                  <p className="text-sm text-[var(--text-secondary)] mt-1 flex items-center font-mono">
                    <Mail className="w-3.5 h-3.5 mr-1.5" /> neo@matrix.local
                  </p>
                  <div className="text-xs font-mono text-[var(--text-tertiary)] mt-2">
                    Joined: 2026-08-15
                  </div>
                </div>
              </div>
              <div className="flex w-full sm:w-auto space-x-3">
                <Link href="/settings" className="flex-1 sm:flex-none">
                  <Button variant="outline" className="w-full">
                    <Settings className="w-4 h-4 mr-2" /> Settings
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-[var(--border-primary)]">
              <div>
                <div className="text-xs font-mono text-[var(--text-tertiary)] mb-1">GLOBAL RANK</div>
                <div className="text-xl font-bold font-mono text-white">#1,248</div>
              </div>
              <div>
                <div className="text-xs font-mono text-[var(--text-tertiary)] mb-1">POINTS</div>
                <div className="text-xl font-bold font-mono text-white flex items-center">
                  15,400 <Zap className="w-4 h-4 ml-1.5 text-yellow-500" />
                </div>
              </div>
              <div>
                <div className="text-xs font-mono text-[var(--text-tertiary)] mb-1">ROOMS PWNED</div>
                <div className="text-xl font-bold font-mono text-white">42</div>
              </div>
              <div>
                <div className="text-xs font-mono text-[var(--text-tertiary)] mb-1">BEST STREAK</div>
                <div className="text-xl font-bold font-mono text-white">12 DAYS</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Heatmap Mock */}
      <Card className="bg-[var(--bg-card)] border-[var(--border-primary)]">
        <CardHeader className="pb-3 border-b border-[var(--border-primary)]">
          <CardTitle className="text-sm font-mono text-white flex items-center">
            <Activity className="w-4 h-4 mr-2 text-[var(--accent-primary)]" />
            ACTIVITY HEATMAP
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="flex items-end space-x-1.5 h-24 mb-2">
              {Array.from({ length: 90 }).map((_, i) => {
                const activityVal = Math.random();
                let height = "20%";
                let bgName = "bg-[var(--bg-tertiary)]";

                if (activityVal > 0.8) {
                  height = "100%";
                  bgName = "bg-[var(--accent-primary)] shadow-[0_0_8px_rgba(0,255,136,0.3)]";
                } else if (activityVal > 0.6) {
                  height = "70%";
                  bgName = "bg-[var(--accent-primary-muted)] mix-blend-screen";
                } else if (activityVal > 0.4) {
                  height = "40%";
                  bgName = "bg-[var(--accent-primary-muted)] opacity-50";
                }

                return (
                  <div key={i} className="flex-1 rounded-sm w-1.5 self-end flex flex-col justify-end group relative">
                    <div className={`w-full rounded-sm transition-all duration-300 ${bgName}`} style={{ height }}></div>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between text-[10px] font-mono text-[var(--text-tertiary)]">
              <span>90 Days Ago</span>
              <span>Today</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badges Section */}
      <BadgeShowcase />

      {/* Certificates Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white font-mono flex items-center">
            <Shield className="w-4 h-4 mr-2 text-[var(--accent-blue)]" />
            CERTIFICATIONS
          </h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <CertificatePreview
            id="CYBER-OP-7X92-AL41"
            name="0xNeo"
            pathName="Offensive Security Fundamentals"
            issueDate="2026-09-30"
            verifyUrl="/verify/CYBER-OP-7X92-AL41"
          />

          <Card className="border-[var(--border-primary)] border-dashed bg-transparent flex flex-col items-center justify-center p-8 min-h-[200px]">
            <Shield className="w-8 h-8 text-[var(--text-tertiary)] mb-3" />
            <p className="text-sm font-mono text-[var(--text-secondary)] mb-1">In Progress</p>
            <p className="text-sm font-bold text-white text-center">Advanced Web Exploitation</p>
            <p className="text-xs text-[var(--accent-primary)] mt-2 font-mono">68% Complete</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
