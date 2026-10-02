import React from "react";
import { BookOpen, Folder, Target, Terminal, Edit3, Plus, Search } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminContentPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Content Management</h1>
          <p className="text-sm text-slate-400 mt-1">Manage learning paths, lessons, hands-on labs, and flags.</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white border border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.2)] flex items-center">
          <Plus className="w-4 h-4 mr-2" /> New Lab Room
        </Button>
      </div>

      <div className="flex items-center space-x-4 mb-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <Input
            placeholder="Search rooms..."
            className="pl-9 h-9 bg-[#0f1420] border-slate-800 text-sm focus:border-green-500 font-mono"
          />
        </div>
        <Button variant="outline" className="h-9 border-slate-700 text-slate-300">Filter Paths</Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-[#0f1420] border-slate-800 hover:border-slate-700 transition-colors">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-900/20 flex items-center justify-center border border-blue-500/20">
                <Folder className="w-5 h-5 text-blue-400" />
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-green-500/10 text-green-400 border border-green-500/20">Active</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Offensive Fundamentals</h3>
            <p className="text-xs text-slate-400 mb-4 line-clamp-2">Introductory path covering basic networking, Linux enumeration, and web protocols.</p>

            <div className="flex justify-between items-center text-xs font-mono text-slate-500 pt-4 border-t border-slate-800">
               <span>12 Lessons • 4 Labs</span>
               <button className="text-slate-300 hover:text-white flex items-center"><Edit3 className="w-3.5 h-3.5 mr-1"/> Edit</button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0f1420] border-slate-800 hover:border-slate-700 transition-colors">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-red-900/20 flex items-center justify-center border border-red-500/20">
                <Target className="w-5 h-5 text-red-500" />
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">Draft</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Advanced Web Exploitation</h3>
            <p className="text-xs text-slate-400 mb-4 line-clamp-2">Deep dive into SSRF, blind SQLi, prototype pollution, and WAF bypass techniques.</p>

            <div className="flex justify-between items-center text-xs font-mono text-slate-500 pt-4 border-t border-slate-800">
               <span>6 Lessons • 8 Labs</span>
               <button className="text-slate-300 hover:text-white flex items-center"><Edit3 className="w-3.5 h-3.5 mr-1"/> Edit</button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0f1420] border-slate-800 hover:border-slate-700 transition-colors border-dashed opacity-60">
          <CardContent className="p-5 h-full flex flex-col justify-center items-center text-center">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-3">
              <Plus className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Create New Path</h3>
            <p className="text-xs text-slate-500">Bundle modules and rooms into a structured curriculum path.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#0f1420] border-slate-800 mt-8">
        <CardHeader className="border-b border-slate-800 pb-4">
          <CardTitle className="text-sm font-bold text-white">Recent Lab Instances (Rooms)</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-[#0a0e17] border-b border-slate-800 font-mono">
                <tr>
                  <th className="px-5 py-3 font-medium">Room ID</th>
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Difficulty</th>
                  <th className="px-5 py-3 font-medium">Docker Image</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/50">
                  <td className="px-5 py-3 font-mono text-xs text-slate-400">cve-2021-3156</td>
                  <td className="px-5 py-3 text-white font-medium">Sudo Baron (PrivEsc)</td>
                  <td className="px-5 py-3"><span className="text-orange-400 font-mono text-xs">Hard</span></td>
                  <td className="px-5 py-3 font-mono text-xs text-slate-500">ghcr.io/cyberops/labs/sudo-baron:latest</td>
                  <td className="px-5 py-3 text-right">
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white h-7 px-2 text-xs">Edit</Button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-800/50">
                  <td className="px-5 py-3 font-mono text-xs text-slate-400">intro-linux-1</td>
                  <td className="px-5 py-3 text-white font-medium">Linux Basics I</td>
                  <td className="px-5 py-3"><span className="text-green-400 font-mono text-xs">Beginner</span></td>
                  <td className="px-5 py-3 font-mono text-xs text-slate-500">ghcr.io/cyberops/labs/linux-basics-1:v1.2</td>
                  <td className="px-5 py-3 text-right">
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white h-7 px-2 text-xs">Edit</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
