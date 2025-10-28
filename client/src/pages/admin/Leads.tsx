import { useQuery, useMutation } from "@tanstack/react-query";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { MailOpen, Mail, Trash2, FileDown } from "lucide-react";
import { format } from "date-fns";
import type { ContactSubmission } from "@shared/schema";

export default function AdminLeads() {
  const { toast } = useToast();
  const { data: leads, isLoading } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/admin/leads"],
  });

  const markAsReadMutation = useMutation({
    mutationFn: (id: string) =>
      apiRequest("PATCH", `/api/admin/leads/${id}/read`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/leads"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/dashboard/stats"] });
      toast({
        title: "Success",
        description: "Lead marked as read",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiRequest("DELETE", `/api/admin/leads/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/leads"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/dashboard/stats"] });
      toast({
        title: "Success",
        description: "Lead deleted successfully",
      });
    },
  });

  const exportToCSV = () => {
    if (!leads) return;

    const csvContent = [
      ["Name", "Email", "Service", "Message", "Status", "Date"].join(","),
      ...leads.map((lead) =>
        [
          lead.name,
          lead.email,
          lead.service,
          `"${lead.message.replace(/"/g, '""')}"`,
          lead.isRead ? "Read" : "Unread",
          format(new Date(lead.createdAt), "yyyy-MM-dd HH:mm"),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Leads</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Manage contact form submissions and inquiries
            </p>
          </div>
          <Button
            onClick={exportToCSV}
            variant="outline"
            data-testid="button-export-csv"
          >
            <FileDown className="w-4 h-4 mr-2" />
            Export to CSV
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 w-48 bg-slate-200 dark:bg-slate-700 rounded" />
                </CardHeader>
                <CardContent>
                  <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : leads && leads.length > 0 ? (
          <div className="space-y-4">
            {leads.map((lead) => (
              <Card
                key={lead.id}
                className={!lead.isRead ? "border-primary" : ""}
                data-testid={`card-lead-${lead.id}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{lead.name}</CardTitle>
                      <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <span>{lead.email}</span>
                        <Badge variant="secondary">{lead.service}</Badge>
                        {!lead.isRead && (
                          <Badge variant="default">Unread</Badge>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">
                        {format(new Date(lead.createdAt), "PPpp")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {!lead.isRead && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => markAsReadMutation.mutate(lead.id)}
                          disabled={markAsReadMutation.isPending}
                          data-testid={`button-mark-read-${lead.id}`}
                        >
                          <MailOpen className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this lead?")) {
                            deleteMutation.mutate(lead.id);
                          }
                        }}
                        disabled={deleteMutation.isPending}
                        data-testid={`button-delete-${lead.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                    {lead.message}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <Mail className="w-12 h-12 mx-auto text-slate-400 mb-4" />
              <p className="text-slate-600 dark:text-slate-400">No leads yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
