import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Plus, Edit, Trash2 } from "lucide-react";
import type { TeamMember, InsertTeamMember } from "@shared/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function AdminTeam() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState<Partial<InsertTeamMember>>({});

  const { data: team, isLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/admin/team"],
  });

  const createMutation = useMutation({
    mutationFn: (data: InsertTeamMember) =>
      apiRequest("POST", "/api/admin/team", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/team"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/dashboard/stats"] });
      toast({ title: "Success", description: "Team member created successfully" });
      setIsDialogOpen(false);
      setFormData({});
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InsertTeamMember> }) =>
      apiRequest("PUT", `/api/admin/team/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/team"] });
      toast({ title: "Success", description: "Team member updated successfully" });
      setIsDialogOpen(false);
      setEditingMember(null);
      setFormData({});
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiRequest("DELETE", `/api/admin/team/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/team"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/dashboard/stats"] });
      toast({ title: "Success", description: "Team member deleted successfully" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
      updateMutation.mutate({ id: editingMember.id, data: formData });
    } else {
      createMutation.mutate(formData as InsertTeamMember);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Team</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Manage team members
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditingMember(null); setFormData({ order: 0 }); setIsDialogOpen(true); }} data-testid="button-create-member">
                <Plus className="w-4 h-4 mr-2" />
                New Member
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingMember ? "Edit Member" : "Create New Member"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Name *</Label>
                  <Input value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required data-testid="input-name" />
                </div>
                <div className="space-y-2">
                  <Label>Role *</Label>
                  <Input value={formData.role || ""} onChange={(e) => setFormData({ ...formData, role: e.target.value })} required data-testid="input-role" />
                </div>
                <div className="space-y-2">
                  <Label>Bio *</Label>
                  <Textarea value={formData.bio || ""} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} required rows={3} data-testid="input-bio" />
                </div>
                <div className="space-y-2">
                  <Label>Photo URL *</Label>
                  <Input type="url" value={formData.photoUrl || ""} onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })} required data-testid="input-photourl" />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} data-testid="button-submit-member">{editingMember ? "Update" : "Create"}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                  <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : team && team.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {team.map((member) => (
              <Card key={member.id} data-testid={`card-member-${member.id}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="space-y-1 flex-1">
                      <h3 className="font-semibold text-lg">{member.name}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{member.role}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => { 
                        setEditingMember(member); 
                        setFormData({
                          name: member.name,
                          role: member.role,
                          bio: member.bio,
                          photoUrl: member.photoUrl,
                          order: member.order,
                        }); 
                        setIsDialogOpen(true); 
                      }} data-testid={`button-edit-${member.id}`}><Edit className="w-4 h-4" /></Button>
                      <Button size="sm" variant="destructive" onClick={() => { if (confirm("Delete this member?")) deleteMutation.mutate(member.id); }} data-testid={`button-delete-${member.id}`}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-3">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-slate-600 dark:text-slate-400">No team members yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
