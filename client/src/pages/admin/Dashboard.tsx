import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, FileText, Briefcase, Users, MessageSquare, MailOpen } from "lucide-react";

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/admin/dashboard/stats"],
  });

  const statCards = [
    {
      title: "Total Leads",
      value: stats?.totalLeads || 0,
      icon: <Mail className="w-6 h-6" />,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: "Unread Leads",
      value: stats?.unreadLeads || 0,
      icon: <MailOpen className="w-6 h-6" />,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
    },
    {
      title: "Published Blogs",
      value: stats?.publishedBlogs || 0,
      icon: <FileText className="w-6 h-6" />,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      title: "Total Blogs",
      value: stats?.totalBlogs || 0,
      icon: <FileText className="w-6 h-6" />,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
    {
      title: "Visible Projects",
      value: stats?.visiblePortfolios || 0,
      icon: <Briefcase className="w-6 h-6" />,
      color: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-100 dark:bg-indigo-900/20",
    },
    {
      title: "Team Members",
      value: stats?.totalTeamMembers || 0,
      icon: <Users className="w-6 h-6" />,
      color: "text-pink-600 dark:text-pink-400",
      bgColor: "bg-pink-100 dark:bg-pink-900/20",
    },
    {
      title: "Job Applications",
      value: stats?.totalJobApplications || 0,
      icon: <MessageSquare className="w-6 h-6" />,
      color: "text-cyan-600 dark:text-cyan-400",
      bgColor: "bg-cyan-100 dark:bg-cyan-900/20",
    },
    {
      title: "Total Portfolios",
      value: stats?.totalPortfolios || 0,
      icon: <Briefcase className="w-6 h-6" />,
      color: "text-teal-600 dark:text-teal-400",
      bgColor: "bg-teal-100 dark:bg-teal-900/20",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Overview of your website's content and activity
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
                  <div className="h-10 w-10 bg-slate-200 dark:bg-slate-700 rounded-full" />
                </CardHeader>
                <CardContent>
                  <div className="h-8 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((card, index) => (
              <Card key={index} data-testid={`card-stat-${card.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {card.title}
                  </CardTitle>
                  <div className={`${card.bgColor} p-2 rounded-full`}>
                    <div className={card.color}>{card.icon}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">
                    {card.value}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <a
                href="/admin/leads"
                className="block px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                data-testid="link-quick-leads"
              >
                <p className="font-medium text-slate-900 dark:text-white">View Leads</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {stats?.unreadLeads || 0} unread messages
                </p>
              </a>
              <a
                href="/admin/blogs"
                className="block px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                data-testid="link-quick-blogs"
              >
                <p className="font-medium text-slate-900 dark:text-white">Manage Blogs</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {stats?.totalBlogs || 0} total articles
                </p>
              </a>
              <a
                href="/admin/portfolio"
                className="block px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                data-testid="link-quick-portfolio"
              >
                <p className="font-medium text-slate-900 dark:text-white">Update Portfolio</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {stats?.totalPortfolios || 0} projects
                </p>
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Activity logs and recent changes will appear here.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
