"use client";

import React, { useState } from "react";
import { User, Bell, Palette, Shield, Terminal, Key, Smartphone, HardDrive, CheckCircle2, Save } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");

  const tabs = [
    { id: "account", label: "Account Profile", icon: User },
    { id: "preferences", label: "Preferences & UI", icon: Palette },
    { id: "terminal", label: "Terminal Settings", icon: Terminal },
    { id: "security", label: "Security & API", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  const InputField = ({ label, defaultValue, type = "text", hint }: any) => (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-[var(--text-secondary)]">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-md px-3 py-2 text-white focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all font-mono text-sm"
      />
      {hint && <p className="text-[10px] text-[var(--text-tertiary)] font-mono">{hint}</p>}
    </div>
  );

  const ToggleItem = ({ label, description, defaultChecked }: any) => (
    <div className="flex items-center justify-between py-4 border-b border-[var(--border-primary)] last:border-0 last:pb-0">
      <div className="pr-8">
        <div className="text-sm font-medium text-white">{label}</div>
        <div className="text-xs text-[var(--text-secondary)] mt-1">{description}</div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
        <div className="w-9 h-5 bg-[var(--bg-tertiary)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[var(--text-secondary)] peer-checked:after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[var(--accent-primary)] border border-[var(--border-primary)]"></div>
      </label>
    </div>
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Settings</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Manage your account preferences, operator handle, and terminal configurations.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Tabs */}
        <Card className="bg-[var(--bg-card)] border-[var(--border-secondary)] md:w-64 h-max md:sticky md:top-24">
          <CardContent className="p-2 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[var(--accent-primary-muted)] text-[var(--accent-primary)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </CardContent>
        </Card>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          {activeTab === "account" && (
            <Card className="bg-[var(--bg-card)] border-[var(--border-primary)]">
              <CardContent className="p-6 md:p-8 space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Operator Profile</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <InputField label="Operator Handle (Username)" defaultValue="0xNeo" />
                    <InputField label="Email Address" defaultValue="neo@matrix.local" type="email" hint="Contact support to change email address." />
                  </div>
                </div>

                <div className="pt-6 border-t border-[var(--border-primary)]">
                  <h3 className="text-lg font-bold text-white mb-4">Public Profile URL</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-md px-3 py-2 text-[var(--text-secondary)] font-mono text-sm max-w-sm overflow-hidden text-ellipsis">
                      cyberops.io/u/0xNeo
                    </div>
                    <Button variant="outline" size="sm">Copy</Button>
                  </div>
                  <div className="mt-4">
                    <ToggleItem
                      label="Public Profile"
                      description="Allow others to see your badges, rank, and completed certificates."
                      defaultChecked={true}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "terminal" && (
            <Card className="bg-[var(--bg-card)] border-[var(--border-primary)]">
              <CardContent className="p-6 md:p-8 space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Terminal Environment</h3>
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[var(--text-secondary)]">Default Shell</label>
                      <select className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-md px-3 py-2 text-white outline-none focus:border-[var(--accent-primary)] font-mono text-sm">
                        <option value="bash">/bin/bash (Default)</option>
                        <option value="zsh">/bin/zsh</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[var(--text-secondary)]">Font Size</label>
                      <select className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-md px-3 py-2 text-white outline-none focus:border-[var(--accent-primary)] font-mono text-sm">
                        <option value="12">12px</option>
                        <option value="14" selected>14px (Default)</option>
                        <option value="16">16px</option>
                        <option value="18">18px</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <ToggleItem
                      label="Scanline Animation"
                      description="Enable CRT screen scanline effects in the lab console."
                      defaultChecked={true}
                    />
                    <ToggleItem
                      label="Visual Bell"
                      description="Flash terminal instead of playing an audio beep."
                      defaultChecked={true}
                    />
                    <ToggleItem
                      label="Auto-copy on Select"
                      description="Automatically copy text to clipboard when selected in the terminal."
                      defaultChecked={false}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "security" && (
            <Card className="bg-[var(--bg-card)] border-[var(--border-primary)]">
              <CardContent className="p-6 md:p-8 space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center mb-4">
                    <Key className="w-5 h-5 mr-2 text-[var(--accent-orange)]" />
                    Authentication
                  </h3>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full sm:w-auto">Change Password</Button>
                    <ToggleItem
                      label="Two-Factor Authentication (2FA)"
                      description="Protect your account with an additional security step."
                      defaultChecked={false}
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-[var(--border-primary)]">
                  <h3 className="text-lg font-bold text-white flex items-center mb-4">
                    <Terminal className="w-5 h-5 mr-2 text-[var(--accent-primary)]" />
                    API Tokens
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-4">
                    Personal API tokens allow external scripts to interact with your CyberOps machines.
                  </p>

                  <div className="bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-lg p-4 mb-4 flex justify-between items-center">
                    <div>
                      <div className="text-sm font-bold text-white">CLI-Access-Token-1</div>
                      <div className="text-xs text-[var(--text-tertiary)] font-mono mt-1">Created: 2026-09-20 • Last used: 2 days ago</div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-400/10">Revoke</Button>
                  </div>

                  <Button variant="cyber" size="sm">Generate New Token</Button>
                </div>
              </CardContent>
            </Card>
          )}

           {activeTab === "notifications" && (
            <Card className="bg-[var(--bg-card)] border-[var(--border-primary)]">
              <CardContent className="p-6 md:p-8">
                  <h3 className="text-lg font-bold text-white mb-6">Notification Preferences</h3>
                  <div className="space-y-2">
                    <ToggleItem
                      label="Streak Reminders"
                      description="Email me when my streak is about to expire."
                      defaultChecked={true}
                    />
                    <ToggleItem
                      label="New Content Alerts"
                      description="Notify me when new paths, modules, or rooms are added."
                      defaultChecked={true}
                    />
                    <ToggleItem
                      label="Weekly Progress Report"
                      description="Receive a weekly summary of your rank, points, and activity."
                      defaultChecked={false}
                    />
                  </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "preferences" && (
            <Card className="bg-[var(--bg-card)] border-[var(--border-primary)]">
              <CardContent className="p-6 md:p-8">
                  <h3 className="text-lg font-bold text-white mb-6">Theme Engine</h3>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {/* Theme selector mocks */}
                    <div className="cursor-pointer border-2 border-[var(--accent-primary)] bg-[var(--bg-tertiary)] rounded-lg p-4 flex flex-col items-center">
                      <div className="w-full h-8 rounded bg-[#00ff88] mb-3"></div>
                      <div className="text-xs font-mono font-bold text-white">Matrix Green</div>
                    </div>

                    <div className="cursor-pointer border-2 border-transparent hover:border-[var(--border-primary)] bg-[var(--bg-tertiary)] rounded-lg p-4 flex flex-col items-center opacity-60">
                      <div className="w-full h-8 rounded bg-[#00d4ff] mb-3"></div>
                      <div className="text-xs font-mono font-bold text-white">Cyber Blue</div>
                    </div>

                    <div className="cursor-pointer border-2 border-transparent hover:border-[var(--border-primary)] bg-[var(--bg-tertiary)] rounded-lg p-4 flex flex-col items-center opacity-60">
                      <div className="w-full h-8 rounded bg-[#ff3366] mb-3"></div>
                      <div className="text-xs font-mono font-bold text-white">Neon Pink</div>
                    </div>
                  </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end pt-4">
            <Button variant="cyber" className="w-full sm:w-auto">
              <Save className="w-4 h-4 mr-2" /> Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
