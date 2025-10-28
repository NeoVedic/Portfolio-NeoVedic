import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Testimonial, InsertTestimonial } from "@shared/schema";
import { Plus, Pencil, Trash2, Quote, Star } from "lucide-react";

export default function AdminTestimonials() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState<Partial<InsertTestimonial>>({});

  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/admin/testimonials"],
  });

  const createMutation = useMutation({
    mutationFn: (data: InsertTestimonial) =>
      apiRequest("POST", "/api/admin/testimonials", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
      toast({ title: "Success", description: "Testimonial created successfully" });
      setIsDialogOpen(false);
      setFormData({});
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create testimonial. Please check your input and try again.",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InsertTestimonial> }) =>
      apiRequest("PUT", `/api/admin/testimonials/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
      toast({ title: "Success", description: "Testimonial updated successfully" });
      setIsDialogOpen(false);
      setEditingTestimonial(null);
      setFormData({});
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update testimonial. Please check your input and try again.",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiRequest("DELETE", `/api/admin/testimonials/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      toast({ title: "Success", description: "Testimonial deleted successfully" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTestimonial) {
      updateMutation.mutate({ id: editingTestimonial.id, data: formData });
    } else {
      createMutation.mutate(formData as InsertTestimonial);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company,
      content: testimonial.content,
      rating: testimonial.rating,
      photoUrl: testimonial.photoUrl || undefined,
      order: testimonial.order,
    });
    setIsDialogOpen(true);
  };

  const handleNew = () => {
    setEditingTestimonial(null);
    setFormData({
      rating: 5,
      order: 0,
    });
    setIsDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Testimonials</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Manage client testimonials and reviews</p>
          </div>
          <Dialog 
            open={isDialogOpen} 
            onOpenChange={(open) => {
              if (!createMutation.isPending && !updateMutation.isPending) {
                setIsDialogOpen(open);
                if (!open) {
                  setFormData({});
                  setEditingTestimonial(null);
                }
              }
            }}
          >
            <DialogTrigger asChild>
              <Button onClick={handleNew} data-testid="button-create-testimonial">
                <Plus className="w-4 h-4 mr-2" />
                New Testimonial
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingTestimonial ? "Edit Testimonial" : "Create New Testimonial"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Client Name *</Label>
                  <Input
                    id="name"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    required
                    data-testid="input-name"
                  />
                </div>

                <div>
                  <Label htmlFor="role">Role *</Label>
                  <Input
                    id="role"
                    value={formData.role || ""}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="CEO"
                    required
                    data-testid="input-role"
                  />
                </div>

                <div>
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    value={formData.company || ""}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Corp"
                    required
                    data-testid="input-company"
                  />
                </div>

                <div>
                  <Label htmlFor="content">Testimonial Content *</Label>
                  <Textarea
                    id="content"
                    value={formData.content || ""}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Share your experience..."
                    rows={4}
                    required
                    data-testid="input-content"
                  />
                </div>

                <div>
                  <Label htmlFor="rating">Rating (1-5) *</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    value={formData.rating || 5}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                    required
                    data-testid="input-rating"
                  />
                </div>

                <div>
                  <Label htmlFor="photoUrl">Photo URL (Optional)</Label>
                  <Input
                    id="photoUrl"
                    type="url"
                    value={formData.photoUrl || ""}
                    onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                    placeholder="https://example.com/photo.jpg"
                    data-testid="input-photoUrl"
                  />
                </div>

                <div>
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order || 0}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    data-testid="input-order"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    data-testid="button-cancel"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    data-testid="button-save"
                  >
                    {createMutation.isPending || updateMutation.isPending
                      ? "Saving..."
                      : editingTestimonial
                      ? "Update"
                      : "Create"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : testimonials && testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} data-testid={`card-testimonial-${testimonial.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      {testimonial.photoUrl ? (
                        <img
                          src={testimonial.photoUrl}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Quote className="w-6 h-6 text-primary" />
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-lg" data-testid={`text-name-${testimonial.id}`}>
                          {testimonial.name}
                        </CardTitle>
                        <CardDescription data-testid={`text-role-${testimonial.id}`}>
                          {testimonial.role} at {testimonial.company}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(testimonial)}
                        data-testid={`button-edit-${testimonial.id}`}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteMutation.mutate(testimonial.id)}
                        data-testid={`button-delete-${testimonial.id}`}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-slate-300 dark:text-slate-600"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 italic" data-testid={`text-content-${testimonial.id}`}>
                    "{testimonial.content}"
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
                    <span>Order: {testimonial.order}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <Quote className="w-12 h-12 mx-auto text-slate-400 mb-4" />
              <p className="text-slate-600 dark:text-slate-400">No testimonials yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
