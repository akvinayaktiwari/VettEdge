
import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Upload, 
  BarChart3, 
  User, 
  ChevronRight, 
  ChevronLeft,
  LogOut,
  LifeBuoy
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NavItemProps = {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
  collapsed?: boolean;
};

const NavItem = ({ icon: Icon, label, href, active, collapsed }: NavItemProps) => (
  <Link
    to={href}
    className={cn(
      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
      active 
        ? "bg-vettedge-100 text-vettedge-900 font-medium" 
        : "text-gray-500 hover:bg-vettedge-50 hover:text-vettedge-900"
    )}
  >
    <Icon className="h-4 w-4" />
    {!collapsed && <span>{label}</span>}
  </Link>
);

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Upload, label: "Upload", href: "/upload" },
    { icon: BarChart3, label: "Analysis", href: "/analysis" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div 
        className={cn(
          "bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-100">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-vettedge-900 flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className="font-semibold text-vettedge-900">VettEdge</span>
            </div>
          )}
          {collapsed && (
            <div className="mx-auto h-8 w-8 rounded bg-vettedge-900 flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        
        <div className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={pathname === item.href}
              collapsed={collapsed}
            />
          ))}
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-gray-200 bg-white flex items-center px-6 justify-between">
          <h1 className="text-xl font-semibold text-gray-800">
            {pathname === "/dashboard" && "Dashboard"}
            {pathname === "/upload" && "Upload Candidates"}
            {pathname === "/analysis" && "Candidate Analysis"}
          </h1>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-vettedge-100 text-vettedge-900">HR</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <LifeBuoy className="h-4 w-4" />
                <span>Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2" asChild>
                <Link to="/login">
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
