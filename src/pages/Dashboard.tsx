
import { Clock, UserCheck, FileText, BarChart } from "lucide-react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import CandidateChart from "@/components/dashboard/CandidateChart";
import RecentActivity from "@/components/dashboard/RecentActivity";

// Mock data
const roleData = [
  { name: "Frontend Developer", value: 28, color: "#4051e2" },
  { name: "Data Scientist", value: 23, color: "#7e95f7" },
  { name: "UX Designer", value: 19, color: "#a5bafc" },
  { name: "Product Manager", value: 15, color: "#c7d7fe" },
  { name: "DevOps Engineer", value: 12, color: "#e0eaff" },
];

const scoreData = [
  { name: "90-100", value: 5, color: "#10B981" },
  { name: "80-89", value: 12, color: "#34D399" },
  { name: "70-79", value: 18, color: "#6EE7B7" },
  { name: "60-69", value: 14, color: "#A7F3D0" },
  { name: "Below 60", value: 8, color: "#D1FAE5" },
];

const recentActivities = [
  {
    id: "1",
    type: "upload",
    title: "Candidates Uploaded",
    description: "You uploaded 15 new candidates for screening",
    time: "2 hours ago",
    role: "Frontend Developer"
  },
  {
    id: "2",
    type: "interview",
    title: "Interview Scheduled",
    description: "Interview scheduled with top 5 candidates",
    time: "Yesterday",
    role: "Data Scientist"
  },
  {
    id: "3",
    type: "hire",
    title: "Candidate Hired",
    description: "John Doe accepted the job offer",
    time: "3 days ago",
    role: "UX Designer"
  },
  {
    id: "4",
    type: "reject",
    title: "Candidates Rejected",
    description: "3 candidates were rejected after screening",
    time: "5 days ago",
    role: "Product Manager"
  },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Time Saved" 
            value="24h" 
            description="This month" 
            icon={<Clock className="h-5 w-5" />}
            trend="up"
            trendValue="12%"
          />
          <StatCard 
            title="Candidates Interviewed" 
            value="48" 
            description="This month" 
            icon={<UserCheck className="h-5 w-5" />}
            trend="up"
            trendValue="8%"
          />
          <StatCard 
            title="Applications Received" 
            value="156" 
            description="This month" 
            icon={<FileText className="h-5 w-5" />}
            trend="up"
            trendValue="24%"
          />
          <StatCard 
            title="Average Score" 
            value="76.8" 
            description="This month" 
            icon={<BarChart className="h-5 w-5" />}
            trend="up"
            trendValue="3%"
          />
        </div>

        <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
          <CandidateChart 
            data={roleData} 
            title="Candidates by Role" 
            description="Number of candidates per job role"
          />
          <RecentActivity activities={recentActivities} />
        </div>

        <div className="grid gap-4 grid-cols-1">
          <CandidateChart 
            data={scoreData} 
            title="Candidate Score Distribution" 
            description="Distribution of candidate scores across all roles"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
