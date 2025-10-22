import { z } from "zod";

export const insertContactSubmissionSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  service: z.enum(["web-development", "devops", "cloud", "marketing", "other"]),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  createdAt: Date;
};

export const insertJobApplicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  position: z.string().min(2, "Please select a position"),
  experience: z.string().min(1, "Please select your experience level"),
  resumeUrl: z.string().min(1, "Resume is required"),
  coverLetter: z.string().optional(),
});

export type InsertJobApplication = z.infer<typeof insertJobApplicationSchema>;

export type JobApplication = {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  resumeUrl: string;
  coverLetter: string | null;
  createdAt: Date;
};

export const insertBlogSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  excerpt: z.string().min(20, "Excerpt must be at least 20 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  author: z.string().min(2, "Author name must be at least 2 characters"),
  imageUrl: z.string().url("Please provide a valid image URL"),
  category: z.string().min(2, "Category is required"),
  tags: z.array(z.string()).optional(),
});

export type InsertBlog = z.infer<typeof insertBlogSchema>;

export type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  imageUrl: string;
  category: string;
  tags: string[] | null;
  publishedAt: Date;
  createdAt: Date;
};
