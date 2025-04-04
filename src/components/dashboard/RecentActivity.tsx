
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type ActivityType = "upload" | "interview" | "hire" | "reject";

interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  time: string;
  role?: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const getActivityIcon = (type: ActivityType) => {
  switch (type) {
    case "upload":
      return "UP";
    case "interview":
      return "IN";
    case "hire":
      return "HI";
    case "reject":
      return "RE";
    default:
      return "AC";
  }
};

const getActivityColor = (type: ActivityType) => {
  switch (type) {
    case "upload":
      return "bg-blue-100 text-blue-700";
    case "interview":
      return "bg-purple-100 text-purple-700";
    case "hire":
      return "bg-green-100 text-green-700";
    case "reject":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const RecentActivity = ({ activities }: RecentActivityProps) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest hiring activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <Avatar className={cn("h-9 w-9", getActivityColor(activity.type))}>
                <AvatarFallback>{getActivityIcon(activity.type)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                {activity.role && (
                  <p className="text-xs text-muted-foreground">
                    Role: <span className="font-medium">{activity.role}</span>
                  </p>
                )}
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
