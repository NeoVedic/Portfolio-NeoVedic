import { 
  type ContactSubmission, 
  type InsertContactSubmission, 
  type JobApplication, 
  type InsertJobApplication,
  type AdminUser,
  type InsertAdminUser,
  type Blog,
  type InsertBlog,
  type Portfolio,
  type InsertPortfolio,
  type TeamMember,
  type InsertTeamMember,
  type Service,
  type InsertService,
  type ActivityLog,
  type InsertActivityLog
} from "@shared/schema";
import { randomUUID } from "crypto";
import { config } from "./config";
import { MongoStorage } from "./db/MongoStorage";
import bcrypt from "bcryptjs";

export interface IStorage {
  createAdminUser(user: InsertAdminUser): Promise<AdminUser>;
  getAdminUserByEmail(email: string): Promise<AdminUser | null>;
  getAdminUserById(id: string): Promise<AdminUser | null>;
  getAllAdminUsers(): Promise<AdminUser[]>;
  updateAdminUser(id: string, updates: Partial<InsertAdminUser>): Promise<AdminUser | null>;
  
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  getContactSubmissionById(id: string): Promise<ContactSubmission | null>;
  markContactAsRead(id: string): Promise<ContactSubmission | null>;
  deleteContactSubmission(id: string): Promise<boolean>;
  
  createJobApplication(application: InsertJobApplication): Promise<JobApplication>;
  getAllJobApplications(): Promise<JobApplication[]>;
  getJobApplicationById(id: string): Promise<JobApplication | null>;
  deleteJobApplication(id: string): Promise<boolean>;
  
  createBlog(blog: InsertBlog): Promise<Blog>;
  getAllBlogs(): Promise<Blog[]>;
  getPublishedBlogs(): Promise<Blog[]>;
  getBlogById(id: string): Promise<Blog | null>;
  getBlogBySlug(slug: string): Promise<Blog | null>;
  updateBlog(id: string, updates: Partial<InsertBlog>): Promise<Blog | null>;
  deleteBlog(id: string): Promise<boolean>;
  publishBlog(id: string): Promise<Blog | null>;
  
  createPortfolio(portfolio: InsertPortfolio): Promise<Portfolio>;
  getAllPortfolio(): Promise<Portfolio[]>;
  getVisiblePortfolio(): Promise<Portfolio[]>;
  getPortfolioById(id: string): Promise<Portfolio | null>;
  updatePortfolio(id: string, updates: Partial<InsertPortfolio>): Promise<Portfolio | null>;
  deletePortfolio(id: string): Promise<boolean>;
  
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  getAllTeamMembers(): Promise<TeamMember[]>;
  getTeamMemberById(id: string): Promise<TeamMember | null>;
  updateTeamMember(id: string, updates: Partial<InsertTeamMember>): Promise<TeamMember | null>;
  deleteTeamMember(id: string): Promise<boolean>;
  
  createService(service: InsertService): Promise<Service>;
  getAllServices(): Promise<Service[]>;
  getServiceById(id: string): Promise<Service | null>;
  updateService(id: string, updates: Partial<InsertService>): Promise<Service | null>;
  deleteService(id: string): Promise<boolean>;
  
  createActivityLog(log: InsertActivityLog): Promise<ActivityLog>;
  getActivityLogs(limit?: number): Promise<ActivityLog[]>;
  getUserActivityLogs(userId: string, limit?: number): Promise<ActivityLog[]>;
  
  getDashboardStats(): Promise<{
    totalLeads: number;
    unreadLeads: number;
    totalBlogs: number;
    publishedBlogs: number;
    totalPortfolios: number;
    visiblePortfolios: number;
    totalTeamMembers: number;
    totalJobApplications: number;
  }>;
}

export class MemStorage implements IStorage {
  private adminUsers: Map<string, AdminUser>;
  private contactSubmissions: Map<string, ContactSubmission>;
  private jobApplications: Map<string, JobApplication>;
  private blogs: Map<string, Blog>;
  private portfolios: Map<string, Portfolio>;
  private teamMembers: Map<string, TeamMember>;
  private services: Map<string, Service>;
  private activityLogs: Map<string, ActivityLog>;

  constructor() {
    this.adminUsers = new Map();
    this.contactSubmissions = new Map();
    this.jobApplications = new Map();
    this.blogs = new Map();
    this.portfolios = new Map();
    this.teamMembers = new Map();
    this.services = new Map();
    this.activityLogs = new Map();
    
    this.seedDefaultAdmin();
    this.seedMockData();
  }

  private async seedDefaultAdmin() {
    const defaultAdmin: AdminUser = {
      id: randomUUID(),
      email: "admin@neovedic.com",
      passwordHash: await bcrypt.hash("admin123", 10),
      name: "Admin User",
      role: "admin",
      createdAt: new Date(),
    };
    this.adminUsers.set(defaultAdmin.id, defaultAdmin);
  }

  private seedMockData() {
    const sampleContact: ContactSubmission = {
      id: randomUUID(),
      name: "John Doe",
      email: "john@example.com",
      service: "web-development",
      message: "I need help with my website project. Looking for a full-stack solution.",
      isRead: false,
      createdAt: new Date(Date.now() - 86400000),
    };
    this.contactSubmissions.set(sampleContact.id, sampleContact);

    const sampleBlog: Blog = {
      id: randomUUID(),
      title: "The Future of AI in Software Development",
      slug: "future-of-ai-in-software-development",
      excerpt: "Discover how AI is revolutionizing the software development landscape.",
      content: "<p>Artificial Intelligence is transforming how we build software...</p>",
      author: "NeoVedic Team",
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
      category: "AI & Technology",
      tags: ["AI", "Software Development", "Innovation"],
      metaTitle: "The Future of AI in Software Development | NeoVedic",
      metaDescription: "Explore how AI is revolutionizing software development",
      isPublished: true,
      publishedAt: new Date(),
      createdAt: new Date(),
    };
    this.blogs.set(sampleBlog.id, sampleBlog);
  }

  async createAdminUser(user: InsertAdminUser): Promise<AdminUser> {
    const id = randomUUID();
    const passwordHash = await bcrypt.hash(user.password, 10);
    const adminUser: AdminUser = {
      id,
      email: user.email,
      passwordHash,
      name: user.name,
      role: user.role,
      createdAt: new Date(),
    };
    this.adminUsers.set(id, adminUser);
    return adminUser;
  }

  async getAdminUserByEmail(email: string): Promise<AdminUser | null> {
    return Array.from(this.adminUsers.values()).find(u => u.email === email) || null;
  }

  async getAdminUserById(id: string): Promise<AdminUser | null> {
    return this.adminUsers.get(id) || null;
  }

  async getAllAdminUsers(): Promise<AdminUser[]> {
    return Array.from(this.adminUsers.values());
  }

  async updateAdminUser(id: string, updates: Partial<InsertAdminUser>): Promise<AdminUser | null> {
    const user = this.adminUsers.get(id);
    if (!user) return null;

    const updatedUser: AdminUser = {
      ...user,
      ...updates,
      passwordHash: updates.password ? await bcrypt.hash(updates.password, 10) : user.passwordHash,
    };
    this.adminUsers.set(id, updatedUser);
    return updatedUser;
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = randomUUID();
    const submission: ContactSubmission = {
      ...insertSubmission,
      id,
      isRead: false,
      createdAt: new Date(),
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getContactSubmissionById(id: string): Promise<ContactSubmission | null> {
    return this.contactSubmissions.get(id) || null;
  }

  async markContactAsRead(id: string): Promise<ContactSubmission | null> {
    const submission = this.contactSubmissions.get(id);
    if (!submission) return null;

    const updated = { ...submission, isRead: true };
    this.contactSubmissions.set(id, updated);
    return updated;
  }

  async deleteContactSubmission(id: string): Promise<boolean> {
    return this.contactSubmissions.delete(id);
  }

  async createJobApplication(insertApplication: InsertJobApplication): Promise<JobApplication> {
    const id = randomUUID();
    const application: JobApplication = {
      ...insertApplication,
      id,
      coverLetter: insertApplication.coverLetter ?? null,
      createdAt: new Date(),
    };
    this.jobApplications.set(id, application);
    return application;
  }

  async getAllJobApplications(): Promise<JobApplication[]> {
    return Array.from(this.jobApplications.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getJobApplicationById(id: string): Promise<JobApplication | null> {
    return this.jobApplications.get(id) || null;
  }

  async deleteJobApplication(id: string): Promise<boolean> {
    return this.jobApplications.delete(id);
  }

  async createBlog(blog: InsertBlog): Promise<Blog> {
    const id = randomUUID();
    const newBlog: Blog = {
      ...blog,
      id,
      tags: blog.tags || null,
      metaTitle: blog.metaTitle || null,
      metaDescription: blog.metaDescription || null,
      isPublished: blog.isPublished || false,
      publishedAt: blog.isPublished ? new Date() : null,
      createdAt: new Date(),
    };
    this.blogs.set(id, newBlog);
    return newBlog;
  }

  async getAllBlogs(): Promise<Blog[]> {
    return Array.from(this.blogs.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getPublishedBlogs(): Promise<Blog[]> {
    return Array.from(this.blogs.values())
      .filter(b => b.isPublished)
      .sort((a, b) => (b.publishedAt?.getTime() || 0) - (a.publishedAt?.getTime() || 0));
  }

  async getBlogById(id: string): Promise<Blog | null> {
    return this.blogs.get(id) || null;
  }

  async getBlogBySlug(slug: string): Promise<Blog | null> {
    return Array.from(this.blogs.values()).find(b => b.slug === slug) || null;
  }

  async updateBlog(id: string, updates: Partial<InsertBlog>): Promise<Blog | null> {
    const blog = this.blogs.get(id);
    if (!blog) return null;

    const updatedBlog: Blog = {
      ...blog,
      ...updates,
      tags: updates.tags !== undefined ? updates.tags : blog.tags,
      metaTitle: updates.metaTitle !== undefined ? updates.metaTitle : blog.metaTitle,
      metaDescription: updates.metaDescription !== undefined ? updates.metaDescription : blog.metaDescription,
      isPublished: updates.isPublished !== undefined ? updates.isPublished : blog.isPublished,
    };
    this.blogs.set(id, updatedBlog);
    return updatedBlog;
  }

  async deleteBlog(id: string): Promise<boolean> {
    return this.blogs.delete(id);
  }

  async publishBlog(id: string): Promise<Blog | null> {
    const blog = this.blogs.get(id);
    if (!blog) return null;

    const published = { ...blog, isPublished: true, publishedAt: new Date() };
    this.blogs.set(id, published);
    return published;
  }

  async createPortfolio(portfolio: InsertPortfolio): Promise<Portfolio> {
    const id = randomUUID();
    const newPortfolio: Portfolio = {
      ...portfolio,
      id,
      projectUrl: portfolio.projectUrl || null,
      screenshots: portfolio.screenshots || null,
      isVisible: portfolio.isVisible !== false,
      createdAt: new Date(),
    };
    this.portfolios.set(id, newPortfolio);
    return newPortfolio;
  }

  async getAllPortfolio(): Promise<Portfolio[]> {
    return Array.from(this.portfolios.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getVisiblePortfolio(): Promise<Portfolio[]> {
    return Array.from(this.portfolios.values())
      .filter(p => p.isVisible)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getPortfolioById(id: string): Promise<Portfolio | null> {
    return this.portfolios.get(id) || null;
  }

  async updatePortfolio(id: string, updates: Partial<InsertPortfolio>): Promise<Portfolio | null> {
    const portfolio = this.portfolios.get(id);
    if (!portfolio) return null;

    const updatedPortfolio: Portfolio = {
      ...portfolio,
      ...updates,
      technologies: updates.technologies || portfolio.technologies,
      projectUrl: updates.projectUrl !== undefined ? updates.projectUrl : portfolio.projectUrl,
      screenshots: updates.screenshots !== undefined ? updates.screenshots : portfolio.screenshots,
      isVisible: updates.isVisible !== undefined ? updates.isVisible : portfolio.isVisible,
    };
    this.portfolios.set(id, updatedPortfolio);
    return updatedPortfolio;
  }

  async deletePortfolio(id: string): Promise<boolean> {
    return this.portfolios.delete(id);
  }

  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const id = randomUUID();
    const newMember: TeamMember = {
      ...member,
      id,
      linkedinUrl: member.linkedinUrl || null,
      twitterUrl: member.twitterUrl || null,
      order: member.order || 0,
      createdAt: new Date(),
    };
    this.teamMembers.set(id, newMember);
    return newMember;
  }

  async getAllTeamMembers(): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values()).sort((a, b) => a.order - b.order);
  }

  async getTeamMemberById(id: string): Promise<TeamMember | null> {
    return this.teamMembers.get(id) || null;
  }

  async updateTeamMember(id: string, updates: Partial<InsertTeamMember>): Promise<TeamMember | null> {
    const member = this.teamMembers.get(id);
    if (!member) return null;

    const updatedMember: TeamMember = {
      ...member,
      ...updates,
      linkedinUrl: updates.linkedinUrl !== undefined ? updates.linkedinUrl : member.linkedinUrl,
      twitterUrl: updates.twitterUrl !== undefined ? updates.twitterUrl : member.twitterUrl,
      order: updates.order !== undefined ? updates.order : member.order,
    };
    this.teamMembers.set(id, updatedMember);
    return updatedMember;
  }

  async deleteTeamMember(id: string): Promise<boolean> {
    return this.teamMembers.delete(id);
  }

  async createService(service: InsertService): Promise<Service> {
    const id = randomUUID();
    const newService: Service = {
      ...service,
      id,
      features: service.features || null,
      order: service.order || 0,
      createdAt: new Date(),
    };
    this.services.set(id, newService);
    return newService;
  }

  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values()).sort((a, b) => a.order - b.order);
  }

  async getServiceById(id: string): Promise<Service | null> {
    return this.services.get(id) || null;
  }

  async updateService(id: string, updates: Partial<InsertService>): Promise<Service | null> {
    const service = this.services.get(id);
    if (!service) return null;

    const updatedService: Service = {
      ...service,
      ...updates,
      features: updates.features !== undefined ? updates.features : service.features,
      order: updates.order !== undefined ? updates.order : service.order,
    };
    this.services.set(id, updatedService);
    return updatedService;
  }

  async deleteService(id: string): Promise<boolean> {
    return this.services.delete(id);
  }

  async createActivityLog(log: InsertActivityLog): Promise<ActivityLog> {
    const id = randomUUID();
    const newLog: ActivityLog = {
      ...log,
      id,
      entityId: log.entityId || null,
      details: log.details || null,
      createdAt: new Date(),
    };
    this.activityLogs.set(id, newLog);
    return newLog;
  }

  async getActivityLogs(limit = 50): Promise<ActivityLog[]> {
    return Array.from(this.activityLogs.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async getUserActivityLogs(userId: string, limit = 50): Promise<ActivityLog[]> {
    return Array.from(this.activityLogs.values())
      .filter(log => log.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async getDashboardStats() {
    return {
      totalLeads: this.contactSubmissions.size,
      unreadLeads: Array.from(this.contactSubmissions.values()).filter(c => !c.isRead).length,
      totalBlogs: this.blogs.size,
      publishedBlogs: Array.from(this.blogs.values()).filter(b => b.isPublished).length,
      totalPortfolios: this.portfolios.size,
      visiblePortfolios: Array.from(this.portfolios.values()).filter(p => p.isVisible).length,
      totalTeamMembers: this.teamMembers.size,
      totalJobApplications: this.jobApplications.size,
    };
  }
}

function createStorage(): IStorage {
  if (config.enableMockData) {
    console.log('📝 Using in-memory storage (mock data mode)');
    return new MemStorage();
  } else {
    console.log('🗄️  Using MongoDB storage');
    return new MongoStorage();
  }
}

export const storage = createStorage();
