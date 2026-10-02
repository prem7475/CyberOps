import Link from "next/link";
import { Terminal, Globe, Network, ShieldAlert, Clock, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_PATHS } from "@/data/mock-data";

export default function PathsPage() {
  const getIcon = (name: string) => {
    switch (name) {
      case "Terminal":
        return <Terminal className="w-6 h-6 text-[var(--accent-primary)]" />;
      case "Globe":
        return <Globe className="w-6 h-6 text-[var(--accent-blue)]" />;
      case "Network":
        return <Network className="w-6 h-6 text-[var(--accent-purple)]" />;
      default:
        return <ShieldAlert className="w-6 h-6 text-[var(--accent-red)]" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="text-xs font-mono text-[var(--accent-primary)] mb-1">
          CURRICULUM MATRIX
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Learning Paths
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Structured, outcome-driven training tracks designed for rapid practical competency.
        </p>
      </div>

      {/* Paths Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {MOCK_PATHS.map((path) => (
          <Card key={path.id} className="card-hover flex flex-col justify-between">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <div className="w-12 h-12 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-secondary)] flex items-center justify-center">
                  {getIcon(path.iconName)}
                </div>
                <Badge
                  variant={
                    path.level === "Beginner"
                      ? "cyber"
                      : path.level === "Intermediate"
                      ? "blue"
                      : "outline"
                  }
                >
                  {path.level}
                </Badge>
              </div>

              <CardTitle className="text-xl mt-2">{path.title}</CardTitle>
              <CardDescription className="text-sm leading-relaxed mt-2">
                {path.description}
              </CardDescription>
            </CardHeader>

            <CardContent>
              {/* Progress Bar */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[var(--text-tertiary)]">PATH PROGRESS</span>
                  <span className="text-[var(--accent-primary)] font-bold">{path.progressPercent}%</span>
                </div>
                <div className="h-2 w-full bg-[var(--bg-tertiary)] rounded-full overflow-hidden border border-[var(--border-secondary)]">
                  <div
                    className="h-full bg-[var(--accent-primary)] rounded-full"
                    style={{ width: `${path.progressPercent}%` }}
                  ></div>
                </div>
              </div>

              {/* Meta information */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-[var(--text-secondary)] mb-6 py-3 border-y border-[var(--border-primary)]">
                <div className="flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1.5 text-[var(--text-tertiary)]" />
                  <span>~{path.estimatedHours} Hours</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-3.5 h-3.5 mr-1.5 text-[var(--text-tertiary)]" />
                  <span>{path.totalLessons} Lessons</span>
                </div>
              </div>

              <Link href={`/paths/${path.id}`}>
                <Button variant="secondary" className="w-full">
                  Explore Syllabus <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
