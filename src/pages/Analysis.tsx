
import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CandidateTable, { Candidate } from "@/components/analysis/CandidateTable";

// Mock data
const roles = [
  { id: "1", name: "Frontend Developer", count: 28 },
  { id: "2", name: "Data Scientist", count: 23 },
  { id: "3", name: "UX Designer", count: 19 },
  { id: "4", name: "Product Manager", count: 15 },
  { id: "5", name: "DevOps Engineer", count: 12 },
];

const generateCandidates = (count: number, role: string): Candidate[] => {
  const candidates: Candidate[] = [];
  
  for (let i = 1; i <= count; i++) {
    const score = Math.floor(Math.random() * 31) + 70; // Score between 70-100
    
    let skills: string[] = [];
    if (role === "Frontend Developer") {
      skills = ["React", "TypeScript", "CSS", "JavaScript", "HTML"].sort(() => 0.5 - Math.random()).slice(0, 3 + Math.floor(Math.random() * 3));
    } else if (role === "Data Scientist") {
      skills = ["Python", "Machine Learning", "SQL", "Statistics", "Pandas", "TensorFlow"].sort(() => 0.5 - Math.random()).slice(0, 3 + Math.floor(Math.random() * 3));
    } else if (role === "UX Designer") {
      skills = ["Figma", "User Research", "Wireframing", "Prototyping", "UI Design"].sort(() => 0.5 - Math.random()).slice(0, 3 + Math.floor(Math.random() * 3));
    } else if (role === "Product Manager") {
      skills = ["Product Strategy", "Agile", "User Stories", "Market Research", "Roadmapping"].sort(() => 0.5 - Math.random()).slice(0, 3 + Math.floor(Math.random() * 3));
    } else if (role === "DevOps Engineer") {
      skills = ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux", "Terraform"].sort(() => 0.5 - Math.random()).slice(0, 3 + Math.floor(Math.random() * 3));
    }
    
    candidates.push({
      id: `${role.toLowerCase().replace(/\s+/g, "-")}-${i}`,
      name: `Candidate ${i}`,
      email: `candidate${i}@example.com`,
      score,
      skills,
      experience: `${Math.floor(Math.random() * 10) + 1} years`,
      education: ["Bachelor's", "Master's", "PhD"][Math.floor(Math.random() * 3)] + " in " + ["Computer Science", "Engineering", "Design", "Business"][Math.floor(Math.random() * 4)],
      breakdown: {
        technical: Math.floor(Math.random() * 31) + 70,
        communication: Math.floor(Math.random() * 31) + 70,
        leadership: Math.floor(Math.random() * 31) + 70,
        cultural: Math.floor(Math.random() * 31) + 70,
        experience: Math.floor(Math.random() * 31) + 70,
      }
    });
  }
  
  return candidates;
};

const candidatesMap = new Map<string, Candidate[]>();
roles.forEach(role => {
  candidatesMap.set(role.id, generateCandidates(role.count, role.name));
});

const Analysis = () => {
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Candidate Analysis</CardTitle>
            <CardDescription>
              Review and compare candidates across different job roles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={roles[0].id} onValueChange={(value) => {
              const role = roles.find(r => r.id === value);
              if (role) setSelectedRole(role);
            }}>
              <TabsList className="w-full max-w-3xl mb-6 grid grid-cols-2 md:grid-cols-5">
                {roles.map((role) => (
                  <TabsTrigger key={role.id} value={role.id} className="text-xs md:text-sm">
                    {role.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {roles.map((role) => (
                <TabsContent key={role.id} value={role.id}>
                  <CandidateTable 
                    candidates={candidatesMap.get(role.id) || []} 
                    role={role.name} 
                  />
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Analysis;
