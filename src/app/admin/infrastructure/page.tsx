import React from "react";
import { Server, Cpu, HardDrive, Network, RefreshCw, Power } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminInfrastructurePage() {
  const nodes = [
    { id: "node-k8s-us-east-1", ip: "10.0.1.42", cpu: "28%", ram: "18.4 / 64 GB", pods: 18, status: "Healthy" },
    { id: "node-k8s-us-east-2", ip: "10.0.1.43", cpu: "64%", ram: "44.1 / 64 GB", pods: 32, status: "Healthy" },
    { id: "node-k8s-eu-west-1", ip: "10.0.2.11", cpu: "12%", ram: "8.2 / 32 GB", pods: 8, status: "Healthy" },
    { id: "node-k8s-ap-south-1", ip: "10.0.3.89", cpu: "89%", ram: "30.1 / 32 GB", pods: 29, status: "High Load" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Infrastructure & Sandboxes</h1>
          <p className="text-sm text-slate-400 mt-1">Docker container pools, node distribution, and orchestration status.</p>
        </div>
        <Button className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 flex items-center">
          <RefreshCw className="w-4 h-4 mr-2" /> Refresh Pool
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
         <Card className="bg-[#0f1420] border-slate-800">
           <CardContent className="p-4 flex items-center space-x-3">
             <Cpu className="w-5 h-5 text-green-400" />
             <div>
               <div className="text-xs text-slate-400 font-medium">CLUSTER CPU</div>
               <div className="text-lg font-bold font-mono text-white">48.3%</div>
             </div>
           </CardContent>
         </Card>
         <Card className="bg-[#0f1420] border-slate-800">
           <CardContent className="p-4 flex items-center space-x-3">
             <HardDrive className="w-5 h-5 text-blue-400" />
             <div>
               <div className="text-xs text-slate-400 font-medium">MEMORY USAGE</div>
               <div className="text-lg font-bold font-mono text-white">100.8 / 192 GB</div>
             </div>
           </CardContent>
         </Card>
         <Card className="bg-[#0f1420] border-slate-800">
           <CardContent className="p-4 flex items-center space-x-3">
             <Server className="w-5 h-5 text-purple-400" />
             <div>
               <div className="text-xs text-slate-400 font-medium">RUNNING LAB CONTAINERS</div>
               <div className="text-lg font-bold font-mono text-white">87 Inst.</div>
             </div>
           </CardContent>
         </Card>
         <Card className="bg-[#0f1420] border-slate-800">
           <CardContent className="p-4 flex items-center space-x-3">
             <Network className="w-5 h-5 text-yellow-400" />
             <div>
               <div className="text-xs text-slate-400 font-medium">NETWORK ISOLATION</div>
               <div className="text-lg font-bold font-mono text-green-400">ENFORCED</div>
             </div>
           </CardContent>
         </Card>
      </div>

      <Card className="bg-[#0f1420] border-slate-800">
        <CardHeader className="border-b border-slate-800 pb-4">
          <CardTitle className="text-sm font-bold text-white">Kubernetes Compute Nodes</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left font-mono">
              <thead className="text-xs text-slate-500 uppercase bg-[#0a0e17] border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3 font-medium">Node ID</th>
                  <th className="px-5 py-3 font-medium">Internal IP</th>
                  <th className="px-5 py-3 font-medium">CPU Load</th>
                  <th className="px-5 py-3 font-medium">Memory</th>
                  <th className="px-5 py-3 font-medium">Active Pods</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {nodes.map((n) => (
                  <tr key={n.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-5 py-3 text-white font-bold">{n.id}</td>
                    <td className="px-5 py-3 text-slate-400">{n.ip}</td>
                    <td className="px-5 py-3 text-slate-300">{n.cpu}</td>
                    <td className="px-5 py-3 text-slate-300">{n.ram}</td>
                    <td className="px-5 py-3 text-slate-300">{n.pods}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        n.status === "Healthy" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                      }`}>
                        {n.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Button variant="ghost" size="sm" className="text-red-400 hover:bg-red-950/30 text-xs">
                        <Power className="w-3.5 h-3.5 mr-1" /> Drain
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
