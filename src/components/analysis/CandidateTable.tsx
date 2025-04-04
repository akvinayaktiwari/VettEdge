
import { useState } from "react";
import { ChevronDown, ChevronUp, Search, Filter, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export interface Candidate {
  id: string;
  name: string;
  email: string;
  score: number;
  skills: string[];
  experience: string;
  education: string;
  breakdown: {
    technical: number;
    communication: number;
    leadership: number;
    cultural: number;
    experience: number;
  };
}

interface CandidateTableProps {
  candidates: Candidate[];
  role: string;
}

const CandidateTable = ({ candidates, role }: CandidateTableProps) => {
  const [sortBy, setSortBy] = useState<"name" | "score">("score");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [search, setSearch] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const handleSort = (field: "name" | "score") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const sortedCandidates = [...candidates]
    .filter(candidate => 
      candidate.name.toLowerCase().includes(search.toLowerCase()) ||
      candidate.email.toLowerCase().includes(search.toLowerCase()) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc" 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else {
        return sortOrder === "asc" ? a.score - b.score : b.score - a.score;
      }
    });

  const getSortIcon = (field: "name" | "score") => {
    if (sortBy !== field) return null;
    return sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success-500";
    if (score >= 70) return "text-orange-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {sortedCandidates.length} candidates for {role}
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search candidates..."
                className="pl-9 w-full sm:w-60"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="rounded-md border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">
                  <div 
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    Candidate
                    {getSortIcon("name")}
                  </div>
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">
                  Skills
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">
                  <div 
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={() => handleSort("score")}
                  >
                    Score
                    {getSortIcon("score")}
                  </div>
                </th>
                <th className="py-3 px-4 text-sm font-medium text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody className="divide-y bg-white">
              {sortedCandidates.map((candidate) => (
                <tr 
                  key={candidate.id} 
                  className="hover:bg-muted/20 cursor-pointer"
                  onClick={() => setSelectedCandidate(candidate)}
                >
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium">{candidate.name}</div>
                      <div className="text-sm text-muted-foreground">{candidate.email}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {candidate.skills.slice(0, 3).map((skill, i) => (
                        <span 
                          key={i}
                          className="inline-flex items-center bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {candidate.skills.length > 3 && (
                        <span className="inline-flex items-center text-gray-500 text-xs font-medium">
                          +{candidate.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className={`text-lg font-semibold ${getScoreColor(candidate.score)}`}>
                      {candidate.score}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[200px]">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Schedule Interview</DropdownMenuItem>
                        <DropdownMenuItem>Download Resume</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Remove Candidate
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={!!selectedCandidate} onOpenChange={(open) => !open && setSelectedCandidate(null)}>
        {selectedCandidate && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Candidate Details</DialogTitle>
              <DialogDescription>
                AI assessment for {selectedCandidate.name}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Card className="col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Name</div>
                    <div>{selectedCandidate.name}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Email</div>
                    <div>{selectedCandidate.email}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Experience</div>
                    <div>{selectedCandidate.experience}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Education</div>
                    <div>{selectedCandidate.education}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Skills</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedCandidate.skills.map((skill, i) => (
                        <span 
                          key={i}
                          className="inline-flex items-center bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-1 md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">AI Assessment</CardTitle>
                  <CardDescription>
                    Overall Score: <span className={`font-bold ${getScoreColor(selectedCandidate.score)}`}>{selectedCandidate.score}</span>/100
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">Technical Skills</div>
                      <div className={`text-sm ${getScoreColor(selectedCandidate.breakdown.technical)}`}>
                        {selectedCandidate.breakdown.technical}/100
                      </div>
                    </div>
                    <Progress value={selectedCandidate.breakdown.technical} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">Communication</div>
                      <div className={`text-sm ${getScoreColor(selectedCandidate.breakdown.communication)}`}>
                        {selectedCandidate.breakdown.communication}/100
                      </div>
                    </div>
                    <Progress value={selectedCandidate.breakdown.communication} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">Leadership</div>
                      <div className={`text-sm ${getScoreColor(selectedCandidate.breakdown.leadership)}`}>
                        {selectedCandidate.breakdown.leadership}/100
                      </div>
                    </div>
                    <Progress value={selectedCandidate.breakdown.leadership} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">Cultural Fit</div>
                      <div className={`text-sm ${getScoreColor(selectedCandidate.breakdown.cultural)}`}>
                        {selectedCandidate.breakdown.cultural}/100
                      </div>
                    </div>
                    <Progress value={selectedCandidate.breakdown.cultural} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">Experience Relevance</div>
                      <div className={`text-sm ${getScoreColor(selectedCandidate.breakdown.experience)}`}>
                        {selectedCandidate.breakdown.experience}/100
                      </div>
                    </div>
                    <Progress value={selectedCandidate.breakdown.experience} className="h-2" />
                  </div>

                  <div className="pt-4">
                    <h4 className="text-sm font-medium mb-2">AI Recommendations</h4>
                    <p className="text-sm text-muted-foreground">
                      This candidate shows strong technical skills and relevant experience for the {role} position.
                      Their communication skills are above average, making them suitable for team collaborations.
                      We recommend proceeding with a technical interview to validate their practical knowledge.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default CandidateTable;
