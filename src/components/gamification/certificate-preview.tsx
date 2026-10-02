import React from "react";
import { ShieldCheck, Download, Share2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CertificatePreviewProps {
  id: string;
  name: string;
  pathName: string;
  issueDate: string;
  verifyUrl: string;
}

export function CertificatePreview({ id, name, pathName, issueDate, verifyUrl }: CertificatePreviewProps) {
  return (
    <Card className="bg-[var(--bg-card)] border-[var(--border-secondary)] overflow-hidden">
      <CardContent className="p-0">
        <div className="md:flex">
          {/* Certificate Thumbnail graphic */}
          <div className="bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--bg-secondary)] p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[var(--border-primary)] md:w-1/3 min-h-[160px] relative">
             <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
                  style={{ backgroundImage: 'linear-gradient(var(--accent-primary) 1px, transparent 1px), linear-gradient(90deg, var(--accent-primary) 1px, transparent 1px)', backgroundSize: '1rem 1rem' }}
             />
             <ShieldCheck className="w-12 h-12 text-[var(--accent-primary)] mb-2 relative z-10 drop-shadow-[0_0_8px_rgba(0,255,136,0.3)]" />
             <div className="text-[10px] font-mono text-center text-[var(--text-secondary)] relative z-10 w-full px-4 break-words">
               {id}
             </div>
          </div>

          {/* Info & Actions */}
          <div className="p-6 md:w-2/3 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-[var(--accent-primary)] mb-1">
                PROFESSIONAL CERTIFICATION
              </div>
              <h4 className="text-lg font-bold text-white mb-1">{pathName}</h4>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                Issued to: <span className="font-mono font-bold text-white">{name}</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-auto gap-4">
              <div className="text-xs font-mono text-[var(--text-tertiary)]">
                Issued: {issueDate}
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="h-8">
                  <Download className="w-3.5 h-3.5 mr-1.5" /> PDF
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  <Share2 className="w-3.5 h-3.5 mr-1.5" /> Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
