import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema, insertJobApplicationSchema } from "@shared/schema";
import { connectToMongoDB } from "./db/mongodb";
import { JobApplication } from "./db/models/JobApplication";
import { Blog } from "./db/models/Blog";

export async function registerRoutes(app: Express): Promise<Server> {
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
      await connectToMongoDB();
      const blogs = await Blog.find().sort({ publishedAt: -1 });
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
      await connectToMongoDB();
      const blog = await Blog.findOne({ slug: req.params.slug });
      
      if (!blog) {
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

  const httpServer = createServer(app);

  return httpServer;
}
