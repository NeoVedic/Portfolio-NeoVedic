import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import { 
  insertContactSubmissionSchema, 
  insertJobApplicationSchema,
  loginSchema,
  insertBlogSchema,
  insertPortfolioSchema,
  insertTeamMemberSchema,
  insertServiceSchema,
  insertTestimonialSchema,
  insertAdminUserSchema,
  insertActivityLogSchema
} from "@shared/schema";
import { connectToMongoDB, getConnectionStatus } from "./db/mongodb";
import { JobApplication } from "./db/models/JobApplication";
import { Blog } from "./db/models/Blog";
import { config } from "./config";
import { generateToken } from "./auth/jwt";
import { authenticateToken, requireAuth } from "./auth/middleware";

export async function registerRoutes(app: Express): Promise<Server> {
  app.use(cookieParser());

  app.get("/api/health", async (_req, res) => {
    const { isConnected, attempts } = getConnectionStatus();
    const status = {
      status: "ok",
      timestamp: new Date().toISOString(),
      database: {
        type: config.enableMockData ? "mock" : "mongodb",
        connected: isConnected,
        connectionAttempts: attempts,
        mongoUri: config.mongoUri ? "configured" : "not configured"
      },
      server: {
        nodeEnv: config.nodeEnv,
        port: config.port,
        host: config.host
      }
    };
    
    res.json(status);
  });

  app.post("/api/admin/login", async (req, res) => {
    try {
      const credentials = loginSchema.parse(req.body);
      const user = await storage.getAdminUserByEmail(credentials.email);

      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const isValidPassword = await bcrypt.compare(credentials.password, user.passwordHash);

      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const token = generateToken(user);

      res.cookie("token", token, {
        httpOnly: true,
        secure: config.nodeEnv === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Login failed" });
    }
  });

  app.post("/api/admin/logout", (_req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
  });

  app.get("/api/admin/me", authenticateToken, async (req, res) => {
    try {
      const user = await storage.getAdminUserById(req.user!.userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch user" });
    }
  });

  app.get("/api/admin/dashboard/stats", authenticateToken, async (_req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch stats" });
    }
  });

  app.get("/api/admin/leads", authenticateToken, async (_req, res) => {
    try {
      const leads = await storage.getAllContactSubmissions();
      res.json(leads);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch leads" });
    }
  });

  app.patch("/api/admin/leads/:id/read", authenticateToken, async (req, res) => {
    try {
      const lead = await storage.markContactAsRead(req.params.id);

      if (!lead) {
        return res.status(404).json({ error: "Lead not found" });
      }

      await storage.createActivityLog({
        userId: req.user!.userId,
        action: "Marked lead as read",
        entityType: "lead",
        entityId: req.params.id,
      });

      res.json(lead);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to update lead" });
    }
  });

  app.delete("/api/admin/leads/:id", authenticateToken, requireAuth("admin"), async (req, res) => {
    try {
      const deleted = await storage.deleteContactSubmission(req.params.id);

      if (!deleted) {
        return res.status(404).json({ error: "Lead not found" });
      }

      await storage.createActivityLog({
        userId: req.user!.userId,
        action: "Deleted lead",
        entityType: "lead",
        entityId: req.params.id,
      });

      res.json({ message: "Lead deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to delete lead" });
    }
  });

  app.get("/api/admin/blogs", authenticateToken, async (_req, res) => {
    try {
      const blogs = await storage.getAllBlogs();
      res.json(blogs);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch blogs" });
    }
  });

  app.get("/api/admin/blogs/:id", authenticateToken, async (req, res) => {
    try {
      const blog = await storage.getBlogById(req.params.id);

      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }

      res.json(blog);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch blog" });
    }
  });

  app.post("/api/admin/blogs", authenticateToken, async (req, res) => {
    try {
      const validatedData = insertBlogSchema.parse(req.body);
      const blog = await storage.createBlog(validatedData);

      await storage.createActivityLog({
        userId: req.user!.userId,
        action: "Created blog",
        entityType: "blog",
        entityId: blog.id,
        details: blog.title,
      });

      res.json(blog);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to create blog" });
    }
  });

  app.put("/api/admin/blogs/:id", authenticateToken, async (req, res) => {
    try {
      const validatedData = insertBlogSchema.partial().parse(req.body);
      const blog = await storage.updateBlog(req.params.id, validatedData);

      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }

      await storage.createActivityLog({
        userId: req.user!.userId,
        action: "Updated blog",
        entityType: "blog",
        entityId: blog.id,
        details: blog.title,
      });

      res.json(blog);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to update blog" });
    }
  });

  app.patch("/api/admin/blogs/:id/publish", authenticateToken, async (req, res) => {
    try {
      const blog = await storage.publishBlog(req.params.id);

      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }

      await storage.createActivityLog({
        userId: req.user!.userId,
        action: "Published blog",
        entityType: "blog",
        entityId: blog.id,
        details: blog.title,
      });

      res.json(blog);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to publish blog" });
    }
  });

  app.delete("/api/admin/blogs/:id", authenticateToken, requireAuth("admin"), async (req, res) => {
    try {
      const deleted = await storage.deleteBlog(req.params.id);

      if (!deleted) {
        return res.status(404).json({ error: "Blog not found" });
      }

      await storage.createActivityLog({
        userId: req.user!.userId,
        action: "Deleted blog",
        entityType: "blog",
        entityId: req.params.id,
      });

      res.json({ message: "Blog deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to delete blog" });
    }
  });

  app.get("/api/admin/portfolio", authenticateToken, async (_req, res) => {
    try {
      const portfolio = await storage.getAllPortfolio();
      res.json(portfolio);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch portfolio" });
    }
  });

  app.post("/api/admin/portfolio", authenticateToken, async (req, res) => {
    try {
      const validatedData = insertPortfolioSchema.parse(req.body);
      const portfolio = await storage.createPortfolio(validatedData);

      await storage.createActivityLog({
        userId: req.user!.userId,
        action: "Created portfolio project",
        entityType: "portfolio",
        entityId: portfolio.id,
        details: portfolio.title,
      });

      res.json(portfolio);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to create portfolio" });
    }
  });

  app.put("/api/admin/portfolio/:id", authenticateToken, async (req, res) => {
    try {
      const validatedData = insertPortfolioSchema.partial().parse(req.body);
      const portfolio = await storage.updatePortfolio(req.params.id, validatedData);

      if (!portfolio) {
        return res.status(404).json({ error: "Portfolio not found" });
      }

      await storage.createActivityLog({
        userId: req.user!.userId,
        action: "Updated portfolio project",
        entityType: "portfolio",
        entityId: portfolio.id,
        details: portfolio.title,
      });

      res.json(portfolio);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to update portfolio" });
    }
  });

  app.delete("/api/admin/portfolio/:id", authenticateToken, requireAuth("admin"), async (req, res) => {
    try {
      const deleted = await storage.deletePortfolio(req.params.id);

      if (!deleted) {
        return res.status(404).json({ error: "Portfolio not found" });
      }

      await storage.createActivityLog({
        userId: req.user!.userId,
        action: "Deleted portfolio project",
        entityType: "portfolio",
        entityId: req.params.id,
      });

      res.json({ message: "Portfolio deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to delete portfolio" });
    }
  });

  app.get("/api/admin/team", authenticateToken, async (_req, res) => {
    try {
      const team = await storage.getAllTeamMembers();
      res.json(team);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch team members" });
    }
  });

  app.post("/api/admin/team", authenticateToken, async (req, res) => {
    try {
      const validatedData = insertTeamMemberSchema.parse(req.body);
      const member = await storage.createTeamMember(validatedData);

      await storage.createActivityLog({
        userId: req.user!.userId,
        action: "Created team member",
        entityType: "team",
        entityId: member.id,
        details: member.name,
      });

      res.json(member);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to create team member" });
    }
  });

  app.put("/api/admin/team/:id", authenticateToken, async (req, res) => {
    try {
      const validatedData = insertTeamMemberSchema.partial().parse(req.body);
      const member = await storage.updateTeamMember(req.params.id, validatedData);

      if (!member) {
        return res.status(404).json({ error: "Team member not found" });
      }

      await storage.createActivityLog({
        userId: req.user!.userId,
        action: "Updated team member",
        entityType: "team",
        entityId: member.id,
        details: member.name,
      });

      res.json(member);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to update team member" });
    }
  });

  app.delete("/api/admin/team/:id", authenticateToken, requireAuth("admin"), async (req, res) => {
    try {
      const deleted = await storage.deleteTeamMember(req.params.id);

      if (!deleted) {
        return res.status(404).json({ error: "Team member not found" });
      }

      await storage.createActivityLog({
        userId: req.user!.userId,
        action: "Deleted team member",
        entityType: "team",
        entityId: req.params.id,
      });

      res.json({ message: "Team member deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to delete team member" });
    }
  });

  app.get("/api/admin/services", authenticateToken, async (_req, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch services" });
    }
  });

  app.post("/api/admin/services", authenticateToken, async (req, res) => {
    try {
      const validatedData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(validatedData);

      await storage.createActivityLog({
        userId: req.user!.userId,
        action: "Created service",
        entityType: "service",
        entityId: service.id,
        details: service.title,
      });

      res.json(service);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to create service" });
    }
  });

  app.put("/api/admin/services/:id", authenticateToken, async (req, res) => {
    try {
      const validatedData = insertServiceSchema.partial().parse(req.body);
      const service = await storage.updateService(req.params.id, validatedData);

      if (!service) {
        return res.status(404).json({ error: "Service not found" });
      }

      await storage.createActivityLog({
        userId: req.user!.userId,
        action: "Updated service",
        entityType: "service",
        entityId: service.id,
        details: service.title,
      });

      res.json(service);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to update service" });
    }
  });

  app.delete("/api/admin/services/:id", authenticateToken, requireAuth("admin"), async (req, res) => {
    try {
      const deleted = await storage.deleteService(req.params.id);

      if (!deleted) {
        return res.status(404).json({ error: "Service not found" });
      }

      await storage.createActivityLog({
        userId: req.user!.userId,
        action: "Deleted service",
        entityType: "service",
        entityId: req.params.id,
      });

      res.json({ message: "Service deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to delete service" });
    }
  });

  app.get("/api/admin/testimonials", authenticateToken, async (_req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch testimonials" });
    }
  });

  app.post("/api/admin/testimonials", authenticateToken, async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);

      await storage.createActivityLog({
        userId: req.user!.userId,
        action: "Created testimonial",
        entityType: "testimonial",
        entityId: testimonial.id,
        details: testimonial.name,
      });

      res.json(testimonial);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to create testimonial" });
    }
  });

  app.put("/api/admin/testimonials/:id", authenticateToken, async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.partial().parse(req.body);
      const testimonial = await storage.updateTestimonial(req.params.id, validatedData);

      if (!testimonial) {
        return res.status(404).json({ error: "Testimonial not found" });
      }

      await storage.createActivityLog({
        userId: req.user!.userId,
        action: "Updated testimonial",
        entityType: "testimonial",
        entityId: testimonial.id,
        details: testimonial.name,
      });

      res.json(testimonial);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to update testimonial" });
    }
  });

  app.delete("/api/admin/testimonials/:id", authenticateToken, requireAuth("admin"), async (req, res) => {
    try {
      const deleted = await storage.deleteTestimonial(req.params.id);

      if (!deleted) {
        return res.status(404).json({ error: "Testimonial not found" });
      }

      await storage.createActivityLog({
        userId: req.user!.userId,
        action: "Deleted testimonial",
        entityType: "testimonial",
        entityId: req.params.id,
      });

      res.json({ message: "Testimonial deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to delete testimonial" });
    }
  });

  app.get("/api/testimonials", async (_req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch testimonials" });
    }
  });

  app.get("/api/admin/job-applications", authenticateToken, async (_req, res) => {
    try {
      const applications = await storage.getAllJobApplications();
      res.json(applications);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch applications" });
    }
  });

  app.delete("/api/admin/job-applications/:id", authenticateToken, requireAuth("admin"), async (req, res) => {
    try {
      const deleted = await storage.deleteJobApplication(req.params.id);

      if (!deleted) {
        return res.status(404).json({ error: "Application not found" });
      }

      await storage.createActivityLog({
        userId: req.user!.userId,
        action: "Deleted job application",
        entityType: "job-application",
        entityId: req.params.id,
      });

      res.json({ message: "Application deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to delete application" });
    }
  });

  app.get("/api/admin/activity-logs", authenticateToken, async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const logs = await storage.getActivityLogs(limit);
      res.json(logs);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch activity logs" });
    }
  });

  app.get("/api/admin/users", authenticateToken, requireAuth("admin"), async (_req, res) => {
    try {
      const users = await storage.getAllAdminUsers();
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch admin users" });
    }
  });

  app.post("/api/admin/users", authenticateToken, requireAuth("admin"), async (req, res) => {
    try {
      const validatedData = insertAdminUserSchema.parse(req.body);
      const user = await storage.createAdminUser(validatedData);

      await storage.createActivityLog({
        userId: req.user!.userId,
        action: "Created admin user",
        entityType: "admin-user",
        entityId: user.id,
        details: user.email,
      });

      res.json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to create admin user" });
    }
  });

  app.put("/api/admin/users/:id", authenticateToken, requireAuth("admin"), async (req, res) => {
    try {
      const validatedData = insertAdminUserSchema.partial().parse(req.body);
      const user = await storage.updateAdminUser(req.params.id, validatedData);

      if (!user) {
        return res.status(404).json({ error: "Admin user not found" });
      }

      await storage.createActivityLog({
        userId: req.user!.userId,
        action: "Updated admin user",
        entityType: "admin-user",
        entityId: user.id,
        details: user.email,
      });

      res.json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to update admin user" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      res.json(submission);
    } catch (error: any) {
      res.status(400).json({ 
        error: error.message || "Invalid submission data" 
      });
    }
  });

  app.get("/api/contact", async (_req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json(submissions);
    } catch (error: any) {
      res.status(500).json({ 
        error: error.message || "Failed to fetch submissions" 
      });
    }
  });

  app.post("/api/job-applications", async (req, res) => {
    try {
      const validatedData = insertJobApplicationSchema.parse(req.body);
      
      if (validatedData.resumeUrl) {
        const base64Match = validatedData.resumeUrl.match(/^data:([^;]+);base64,(.+)$/);
        if (!base64Match) {
          return res.status(400).json({ 
            error: "Invalid resume format. File must be a valid data URL" 
          });
        }
        
        const mimeType = base64Match[1];
        const base64Data = base64Match[2];
        
        const allowedTypes = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        
        if (!allowedTypes.includes(mimeType)) {
          return res.status(400).json({ 
            error: "Invalid file type. Only PDF, DOC, and DOCX files are allowed" 
          });
        }
        
        const sizeInMB = (base64Data.length * 0.75) / (1024 * 1024);
        if (sizeInMB > 5) {
          return res.status(400).json({ 
            error: "Resume file size exceeds 5MB limit" 
          });
        }
      }
      
      const application = await storage.createJobApplication(validatedData);
      
      res.json({ success: true, id: application.id });
    } catch (error: any) {
      console.error('Job application error:', error);
      
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          error: error.message || "Invalid application data" 
        });
      }
      
      res.status(500).json({ 
        error: "Failed to process application. Please try again later." 
      });
    }
  });
  
  app.get("/api/job-applications", async (_req, res) => {
    try {
      const applications = await storage.getAllJobApplications();
      res.json(applications);
    } catch (error: any) {
      console.error('Error fetching applications:', error);
      res.status(500).json({ 
        error: error.message || "Failed to fetch applications" 
      });
    }
  });

  app.get("/api/blogs", async (_req, res) => {
    try {
      const blogs = await storage.getPublishedBlogs();
      res.json(blogs);
    } catch (error: any) {
      console.error('Error fetching blogs:', error);
      res.status(500).json({ 
        error: error.message || "Failed to fetch blogs" 
      });
    }
  });

  app.get("/api/blogs/:slug", async (req, res) => {
    try {
      const blog = await storage.getBlogBySlug(req.params.slug);
      
      if (!blog) {
        return res.status(404).json({ 
          error: "Blog not found" 
        });
      }

      if (!blog.isPublished) {
        return res.status(404).json({ 
          error: "Blog not found" 
        });
      }
      
      res.json(blog);
    } catch (error: any) {
      console.error('Error fetching blog:', error);
      res.status(500).json({ 
        error: error.message || "Failed to fetch blog" 
      });
    }
  });

  app.get("/api/portfolio", async (_req, res) => {
    try {
      const portfolio = await storage.getVisiblePortfolio();
      res.json(portfolio);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch portfolio" });
    }
  });

  app.get("/api/team", async (_req, res) => {
    try {
      const team = await storage.getAllTeamMembers();
      res.json(team);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch team" });
    }
  });

  app.get("/api/services", async (_req, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch services" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
