import React from "react";
import { Users, MoreVertical, ShieldCheck, Mail, ShieldAlert } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">User Management</h1>
          <p className="text-sm text-slate-400 mt-1">Manage operator accounts, roles, and ban lists.</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700 text-white border border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.2)]">
          Export DB Dump
        </Button>
      </div>

      <Card className="bg-[#0f1420] border-slate-800">
        <CardHeader className="border-b border-slate-800 pb-4 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-bold text-white flex items-center">
            <Users className="w-4 h-4 mr-2 text-blue-400" />
            Registered Operators
          </CardTitle>
          <div className="text-xs font-mono text-slate-500">Showing 1-5 of 12,543</div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-[#0a0e17] border-b border-slate-800 font-mono">
                <tr>
                  <th className="px-5 py-3 font-medium">Handle</th>
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 font-medium">Level</th>
                  <th className="px-5 py-3 font-medium">Role</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-5 py-4 font-mono font-bold text-white">0xNeo</td>
                  <td className="px-5 py-4 text-slate-400 flex items-center"><Mail className="w-3 h-3 mr-1.5" />neo@matrix.local</td>
                  <td className="px-5 py-4 text-slate-300 font-mono">42</td>
                  <td className="px-5 py-4"><span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-green-500/10 text-green-400 border border-green-500/20">Pro Member</span></td>
                  <td className="px-5 py-4"><span className="flex items-center text-green-400 text-xs"><ShieldCheck className="w-3 h-3 mr-1"/> Active</span></td>
                  <td className="px-5 py-4 text-right"><Button variant="ghost" size="sm" className="h-8 w-8 p-0"><MoreVertical className="w-4 h-4 text-slate-400"/></Button></td>
                </tr>
                <tr className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-5 py-4 font-mono font-bold text-blue-400">root_cause</td>
                  <td className="px-5 py-4 text-slate-400 flex items-center"><Mail className="w-3 h-3 mr-1.5" />root@cause.io</td>
                  <td className="px-5 py-4 text-slate-300 font-mono">38</td>
                  <td className="px-5 py-4"><span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">Standard</span></td>
                  <td className="px-5 py-4"><span className="flex items-center text-green-400 text-xs"><ShieldCheck className="w-3 h-3 mr-1"/> Active</span></td>
                  <td className="px-5 py-4 text-right"><Button variant="ghost" size="sm" className="h-8 w-8 p-0"><MoreVertical className="w-4 h-4 text-slate-400"/></Button></td>
                </tr>
                <tr className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-5 py-4 font-mono font-bold text-red-400">admin_override</td>
                  <td className="px-5 py-4 text-slate-400 flex items-center"><Mail className="w-3 h-3 mr-1.5" />admin@cyberops.io</td>
                  <td className="px-5 py-4 text-slate-300 font-mono">99</td>
                  <td className="px-5 py-4"><span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-red-500/10 text-red-500 border border-red-500/20">Admin</span></td>
                  <td className="px-5 py-4"><span className="flex items-center text-green-400 text-xs"><ShieldCheck className="w-3 h-3 mr-1"/> Active</span></td>
                  <td className="px-5 py-4 text-right"><Button variant="ghost" size="sm" className="h-8 w-8 p-0"><MoreVertical className="w-4 h-4 text-slate-400"/></Button></td>
                </tr>
                <tr className="hover:bg-slate-800/50 transition-colors bg-red-950/10">
                  <td className="px-5 py-4 font-mono font-bold text-slate-500">spammer_99</td>
                  <td className="px-5 py-4 text-slate-500 flex items-center"><Mail className="w-3 h-3 mr-1.5" />temp@mail.xyz</td>
                  <td className="px-5 py-4 text-slate-500 font-mono">1</td>
                  <td className="px-5 py-4"><span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-slate-500/10 text-slate-400 border border-slate-500/20">Standard</span></td>
                  <td className="px-5 py-4"><span className="flex items-center text-red-400 text-xs"><ShieldAlert className="w-3 h-3 mr-1"/> Suspended</span></td>
                  <td className="px-5 py-4 text-right"><Button variant="ghost" size="sm" className="h-8 w-8 p-0"><MoreVertical className="w-4 h-4 text-slate-400"/></Button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-slate-800 flex items-center justify-between">
            <Button variant="outline" size="sm" className="text-slate-400 border-slate-700 hover:text-white" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="text-slate-400 border-slate-700 hover:text-white">Next Page</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
