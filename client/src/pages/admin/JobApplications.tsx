import { useQuery, useMutation } from "@tanstack/react-query";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Trash2, FileDown, Briefcase, Download } from "lucide-react";
import { format } from "date-fns";
import type { JobApplication } from "@shared/schema";

export default function AdminJobApplications() {
  const { toast } = useToast();
  const { data: applications, isLoading } = useQuery<JobApplication[]>({
    queryKey: ["/api/admin/job-applications"],
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiRequest("DELETE", `/api/admin/job-applications/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/job-applications"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/dashboard/stats"] });
      toast({
        title: "Success",
        description: "Application deleted successfully",
      });
    },
  });

  const exportToCSV = () => {
    if (!applications) return;

    const csvContent = [
      ["Name", "Email", "Phone", "Position", "Experience", "Date"].join(","),
      ...applications.map((app) =>
        [
          app.name,
          app.email,
          app.phone,
          app.position,
          app.experience,
          format(new Date(app.createdAt), "yyyy-MM-dd HH:mm"),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `job-applications-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadResume = (resumeUrl: string, applicantName: string) => {
    const a = document.createElement("a");
    a.href = resumeUrl;
    a.download = `resume-${applicantName.replace(/\s+/g, "-").toLowerCase()}.pdf`;
    a.click();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Job Applications</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Manage career form submissions and applicant resumes
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
        ) : applications && applications.length > 0 ? (
          <div className="space-y-4">
            {applications.map((app) => (
              <Card
                key={app.id}
                className="hover:shadow-lg transition-shadow"
                data-testid={`card-application-${app.id}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <Briefcase className="w-5 h-5 text-primary" />
                        <CardTitle className="text-lg">{app.name}</CardTitle>
                        <Badge variant="secondary">{app.position}</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <div>
                          <span className="font-medium">Email:</span> {app.email}
                        </div>
                        <div>
                          <span className="font-medium">Phone:</span> {app.phone}
                        </div>
                        <div>
                          <span className="font-medium">Experience:</span> {app.experience}
                        </div>
                        <div>
                          <span className="font-medium">Applied:</span>{" "}
                          {format(new Date(app.createdAt), "PPp")}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {app.resumeUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadResume(app.resumeUrl, app.name)}
                          data-testid={`button-download-resume-${app.id}`}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Resume
                        </Button>
                      )}
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteMutation.mutate(app.id)}
                        disabled={deleteMutation.isPending}
                        data-testid={`button-delete-${app.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {app.coverLetter && (
                  <CardContent>
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                      <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                        Cover Letter:
                      </p>
                      <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                        {app.coverLetter}
                      </p>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <Briefcase className="w-12 h-12 mx-auto text-slate-400 mb-4" />
              <p className="text-slate-600 dark:text-slate-400">
                No job applications yet
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
