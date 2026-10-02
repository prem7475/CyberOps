import React from "react";
import { Users, Server, AlertTriangle, ShieldCheck, Activity, Terminal } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">System Overview</h1>
        <p className="text-sm text-slate-400 mt-1">Platform analytics, active instances, and alert monitoring.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card className="bg-[#0f1420] border-slate-800 rounded-lg">
          <CardContent className="p-5 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg bg-blue-900/20 border border-blue-500/20 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white tracking-tight">12,543</div>
              <div className="text-xs text-slate-400 font-medium">TOTAL OPERATORS</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0f1420] border-slate-800 rounded-lg">
          <CardContent className="p-5 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg bg-green-900/20 border border-green-500/20 flex items-center justify-center shrink-0">
              <Server className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white tracking-tight">142</div>
              <div className="text-xs text-slate-400 font-medium">ACTIVE LAB CONTAINERS</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0f1420] border-slate-800 rounded-lg">
          <CardContent className="p-5 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg bg-red-900/20 border border-red-500/20 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white tracking-tight">8</div>
              <div className="text-xs text-slate-400 font-medium">SYSTEM ALERTS</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0f1420] border-slate-800 rounded-lg">
          <CardContent className="p-5 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg bg-purple-900/20 border border-purple-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white tracking-tight">3,492</div>
              <div className="text-xs text-slate-400 font-medium">FLAGS CAPTURED (24H)</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity Table */}
        <div className="lg:col-span-2">
          <Card className="bg-[#0f1420] border-slate-800 h-full">
            <CardHeader className="border-b border-slate-800 pb-4">
              <CardTitle className="text-sm font-bold text-white">Live Operations Stream</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 uppercase bg-[#0a0e17] border-b border-slate-800">
                    <tr>
                      <th className="px-5 py-3 font-medium">Event</th>
                      <th className="px-5 py-3 font-medium">User</th>
                      <th className="px-5 py-3 font-medium">Target/Action</th>
                      <th className="px-5 py-3 font-medium text-right">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    <tr className="hover:bg-slate-800/50">
                      <td className="px-5 py-3"><Badge variant="outline" className="text-green-400 border-green-500/30 bg-green-500/10 rounded-sm">FLAG_CAPTURE</Badge></td>
                      <td className="px-5 py-3 font-mono text-white">0xNeo</td>
                      <td className="px-5 py-3 text-slate-300">Room: Blue Team Fundamentals</td>
                      <td className="px-5 py-3 text-slate-500 text-right font-mono">14 sec ago</td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="px-5 py-3"><Badge variant="outline" className="text-blue-400 border-blue-500/30 bg-blue-500/10 rounded-sm">CONTAINER_START</Badge></td>
                      <td className="px-5 py-3 font-mono text-white">cipher_byte</td>
                      <td className="px-5 py-3 text-slate-300">Instance ID: i-0x49f2b</td>
                      <td className="px-5 py-3 text-slate-500 text-right font-mono">2 min ago</td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="px-5 py-3"><Badge variant="outline" className="text-yellow-400 border-yellow-500/30 bg-yellow-500/10 rounded-sm">HINT_USED</Badge></td>
                      <td className="px-5 py-3 font-mono text-white">sudo_rm</td>
                      <td className="px-5 py-3 text-slate-300">Web Exploitation - SQLi</td>
                      <td className="px-5 py-3 text-slate-500 text-right font-mono">5 min ago</td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="px-5 py-3"><Badge variant="outline" className="text-red-400 border-red-500/30 bg-red-500/10 rounded-sm">FAILED_LOGIN</Badge></td>
                      <td className="px-5 py-3 font-mono text-white">SYSTEM</td>
                      <td className="px-5 py-3 text-slate-300">IP: 192.168.1.45 (x3)</td>
                      <td className="px-5 py-3 text-slate-500 text-right font-mono">12 min ago</td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="px-5 py-3"><Badge variant="outline" className="text-purple-400 border-purple-500/30 bg-purple-500/10 rounded-sm">PATH_COMPLETE</Badge></td>
                      <td className="px-5 py-3 font-mono text-white">root_cause</td>
                      <td className="px-5 py-3 text-slate-300">Network Reconnaissance</td>
                      <td className="px-5 py-3 text-slate-500 text-right font-mono">18 min ago</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Infrastructure Status */}
        <div className="lg:col-span-1">
          <Card className="bg-[#0f1420] border-slate-800 h-full">
            <CardHeader className="border-b border-slate-800 pb-4">
              <CardTitle className="text-sm font-bold text-white flex items-center">
                <Activity className="w-4 h-4 mr-2 text-red-500" />
                Infrastructure Health
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-5">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Kubernetes Node Load</span>
                  <span className="text-green-400 font-mono">42%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">DB Connections</span>
                  <span className="text-yellow-400 font-mono">78%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Bandwidth Saturation</span>
                  <span className="text-blue-400 font-mono">24%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '24%' }}></div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800">
                <div className="bg-[#0a0e17] rounded p-3 border border-slate-800 font-mono text-xs text-slate-400">
                  <div className="flex items-center text-green-400 mb-1">
                    <Terminal className="w-3 h-3 mr-1" />
                    <span>systemd status</span>
                  </div>
                  <div>redis_cache: <span className="text-green-400">running</span></div>
                  <div>pg_bouncer: <span className="text-green-400">running</span></div>
                  <div>container_orchestrator: <span className="text-green-400">running</span></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
