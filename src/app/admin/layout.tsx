import React from "react";
import Link from "next/link";
import { Server, Users, BookOpen, Activity, LayoutDashboard, Shield, LogOut, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0e17] flex font-sans text-slate-300">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-[#0f1420] flex flex-col hidden lg:flex">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
           <Link href="/admin/dashboard" className="flex items-center space-x-2">
             <Shield className="w-6 h-6 text-red-500" />
             <span className="font-bold text-white font-mono tracking-tight">CYBEROPS<span className="text-red-500">_ADMIN</span></span>
           </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <Link href="/admin/dashboard" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 text-white">
            <LayoutDashboard className="w-4 h-4 mr-3 text-slate-400" />
            Dashboard
          </Link>
          <Link href="/admin/users" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <Users className="w-4 h-4 mr-3" />
            User Management
          </Link>
          <Link href="/admin/content" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <BookOpen className="w-4 h-4 mr-3" />
            Content / Labs
          </Link>
          <Link href="/admin/infrastructure" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <Server className="w-4 h-4 mr-3" />
            Infrastructure
          </Link>
          <Link href="/admin/analytics" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <Activity className="w-4 h-4 mr-3" />
            Analytics
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center space-x-3 mb-4">
             <div className="w-8 h-8 rounded bg-red-900/30 flex items-center justify-center border border-red-500/20">
               <Shield className="w-4 h-4 text-red-400" />
             </div>
             <div>
               <div className="text-xs font-bold text-white">Super Admin</div>
               <div className="text-[10px] text-slate-500 font-mono">root@system</div>
             </div>
          </div>
          <Link href="/dashboard" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-400 hover:bg-slate-800 hover:text-white transition-colors w-full">
            <LogOut className="w-4 h-4 mr-3" /> Exit Terminal
          </Link>
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 border-b border-slate-800 bg-[#0a0e17]/80 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center flex-1">
            <div className="relative w-full max-w-md hidden md:flex">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <Input
                placeholder="Search users, instances, or IP logs..."
                className="pl-9 h-9 bg-slate-900 border-slate-800 text-sm focus:border-red-500 focus:ring-red-500/20"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
             <div className="flex items-center space-x-2 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span>DB: CONNECTED</span>
             </div>
             <div className="flex items-center space-x-2 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span>K8S: HEALTHY</span>
             </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
