import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { Button } from "./ui/button";
import { 
  LayoutDashboard, 
  Mail, 
  FileText, 
  Briefcase, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  Rocket
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { href: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { href: "/admin/leads", label: "Leads", icon: <Mail className="w-5 h-5" /> },
  { href: "/admin/blogs", label: "Blogs", icon: <FileText className="w-5 h-5" /> },
  { href: "/admin/portfolio", label: "Portfolio", icon: <Briefcase className="w-5 h-5" /> },
  { href: "/admin/team", label: "Team", icon: <Users className="w-5 h-5" /> },
  { href: "/admin/services", label: "Services", icon: <Rocket className="w-5 h-5" /> },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white dark:bg-slate-900 shadow-md"
        data-testid="button-menu"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">NeoVedic Admin</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{user?.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-500">{user?.role}</p>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <a
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    )}
                    onClick={() => setIsSidebarOpen(false)}
                    data-testid={`link-${item.label.toLowerCase()}`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={logout}
              data-testid="button-logout"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      <main className="lg:ml-64 min-h-screen">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
