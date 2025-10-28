import { z } from "zod";

export const insertAdminUserSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.enum(["admin", "editor"]).default("editor"),
});

export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;

export type AdminUser = {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: "admin" | "editor";
  createdAt: Date;
};

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginCredentials = z.infer<typeof loginSchema>;

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
  isRead: boolean;
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
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  isPublished: z.boolean().default(false),
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
  metaTitle: string | null;
  metaDescription: string | null;
  isPublished: boolean;
  publishedAt: Date | null;
  createdAt: Date;
};

export const insertPortfolioSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  category: z.string().min(2, "Category is required"),
  technologies: z.array(z.string()).min(1, "At least one technology is required"),
  imageUrl: z.string().url("Please provide a valid image URL"),
  projectUrl: z.string().url().optional(),
  screenshots: z.array(z.string()).optional(),
  isVisible: z.boolean().default(true),
});

export type InsertPortfolio = z.infer<typeof insertPortfolioSchema>;

export type Portfolio = {
  id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  imageUrl: string;
  projectUrl: string | null;
  screenshots: string[] | null;
  isVisible: boolean;
  createdAt: Date;
};

export const insertTeamMemberSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.string().min(2, "Role is required"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  photoUrl: z.string().url("Please provide a valid photo URL"),
  linkedinUrl: z.string().url().optional(),
  twitterUrl: z.string().url().optional(),
  order: z.number().int().default(0),
});

export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  linkedinUrl: string | null;
  twitterUrl: string | null;
  order: number;
  createdAt: Date;
};

export const insertServiceSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  shortDescription: z.string().min(10, "Short description must be at least 10 characters"),
  detailedDescription: z.string().min(50, "Detailed description must be at least 50 characters"),
  iconUrl: z.string().url("Please provide a valid icon URL"),
  features: z.array(z.string()).optional(),
  order: z.number().int().default(0),
});

export type InsertService = z.infer<typeof insertServiceSchema>;

export type Service = {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  iconUrl: string;
  features: string[] | null;
  order: number;
  createdAt: Date;
};

export const insertActivityLogSchema = z.object({
  userId: z.string(),
  action: z.string().min(3, "Action description is required"),
  entityType: z.enum(["blog", "portfolio", "team", "service", "lead", "job-application"]),
  entityId: z.string().optional(),
  details: z.string().optional(),
});

export type InsertActivityLog = z.infer<typeof insertActivityLogSchema>;

export type ActivityLog = {
  id: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string | null;
  details: string | null;
  createdAt: Date;
};
