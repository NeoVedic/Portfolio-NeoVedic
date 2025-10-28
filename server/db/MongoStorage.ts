import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { 
  type ContactSubmission as ContactSubmissionType, 
  type InsertContactSubmission, 
  type JobApplication as JobApplicationType, 
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
  type Testimonial,
  type InsertTestimonial,
  type ActivityLog,
  type InsertActivityLog
} from "@shared/schema";
import { ContactSubmission } from "./models/ContactSubmission";
import { JobApplication } from "./models/JobApplication";
import { AdminUser as AdminUserModel } from "./models/AdminUser";
import { Blog as BlogModel } from "./models/Blog";
import { Portfolio as PortfolioModel } from "./models/Portfolio";
import { TeamMember as TeamMemberModel } from "./models/TeamMember";
import { Service as ServiceModel } from "./models/Service";
import { Testimonial as TestimonialModel } from "./models/Testimonial";
import { ActivityLog as ActivityLogModel } from "./models/ActivityLog";
import { connectToMongoDB } from "./mongodb";
import type { IStorage } from "../storage";

export class MongoStorage implements IStorage {
  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmissionType> {
    await connectToMongoDB();
    
    const submission = new ContactSubmission({
      name: insertSubmission.name,
      email: insertSubmission.email,
      service: insertSubmission.service,
      message: insertSubmission.message,
    });
    
    const savedSubmission = await submission.save();
    
    return {
      id: (savedSubmission._id as mongoose.Types.ObjectId).toString(),
      name: savedSubmission.name,
      email: savedSubmission.email,
      service: savedSubmission.service,
      message: savedSubmission.message,
      isRead: savedSubmission.isRead || false,
      createdAt: savedSubmission.createdAt,
    };
  }

  async getAllContactSubmissions(): Promise<ContactSubmissionType[]> {
    await connectToMongoDB();
    
    const submissions = await ContactSubmission.find().sort({ createdAt: -1 });
    
    return submissions.map(submission => ({
      id: (submission._id as mongoose.Types.ObjectId).toString(),
      name: submission.name,
      email: submission.email,
      service: submission.service,
      message: submission.message,
      isRead: submission.isRead,
      createdAt: submission.createdAt,
    }));
  }

  async getContactSubmissionById(id: string): Promise<ContactSubmissionType | null> {
    await connectToMongoDB();
    
    const submission = await ContactSubmission.findById(id);
    if (!submission) return null;
    
    return {
      id: (submission._id as mongoose.Types.ObjectId).toString(),
      name: submission.name,
      email: submission.email,
      service: submission.service,
      message: submission.message,
      isRead: submission.isRead,
      createdAt: submission.createdAt,
    };
  }

  async markContactAsRead(id: string): Promise<ContactSubmissionType | null> {
    await connectToMongoDB();
    
    const submission = await ContactSubmission.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );
    
    if (!submission) return null;
    
    return {
      id: (submission._id as mongoose.Types.ObjectId).toString(),
      name: submission.name,
      email: submission.email,
      service: submission.service,
      message: submission.message,
      isRead: submission.isRead,
      createdAt: submission.createdAt,
    };
  }

  async deleteContactSubmission(id: string): Promise<boolean> {
    await connectToMongoDB();
    
    const result = await ContactSubmission.findByIdAndDelete(id);
    return result !== null;
  }

  async createJobApplication(insertApplication: InsertJobApplication): Promise<JobApplicationType> {
    await connectToMongoDB();
    
    const application = new JobApplication({
      name: insertApplication.name,
      email: insertApplication.email,
      phone: insertApplication.phone,
      position: insertApplication.position,
      experience: insertApplication.experience,
      resumeUrl: insertApplication.resumeUrl,
      coverLetter: insertApplication.coverLetter,
    });
    
    const savedApplication = await application.save();
    
    return {
      id: (savedApplication._id as mongoose.Types.ObjectId).toString(),
      name: savedApplication.name,
      email: savedApplication.email,
      phone: savedApplication.phone,
      position: savedApplication.position,
      experience: savedApplication.experience,
      resumeUrl: savedApplication.resumeUrl,
      coverLetter: savedApplication.coverLetter || null,
      createdAt: savedApplication.createdAt,
    };
  }

  async getAllJobApplications(): Promise<JobApplicationType[]> {
    await connectToMongoDB();
    
    const applications = await JobApplication.find().sort({ createdAt: -1 });
    
    return applications.map(application => ({
      id: (application._id as mongoose.Types.ObjectId).toString(),
      name: application.name,
      email: application.email,
      phone: application.phone,
      position: application.position,
      experience: application.experience,
      resumeUrl: application.resumeUrl,
      coverLetter: application.coverLetter || null,
      createdAt: application.createdAt,
    }));
  }

  async getJobApplicationById(id: string): Promise<JobApplicationType | null> {
    await connectToMongoDB();
    
    const application = await JobApplication.findById(id);
    if (!application) return null;
    
    return {
      id: (application._id as mongoose.Types.ObjectId).toString(),
      name: application.name,
      email: application.email,
      phone: application.phone,
      position: application.position,
      experience: application.experience,
      resumeUrl: application.resumeUrl,
      coverLetter: application.coverLetter || null,
      createdAt: application.createdAt,
    };
  }

  async deleteJobApplication(id: string): Promise<boolean> {
    await connectToMongoDB();
    
    const result = await JobApplication.findByIdAndDelete(id);
    return result !== null;
  }

  async createAdminUser(user: InsertAdminUser): Promise<AdminUser> {
    await connectToMongoDB();
    
    const passwordHash = await bcrypt.hash(user.password, 10);
    
    const adminUser = new AdminUserModel({
      email: user.email,
      passwordHash,
      name: user.name,
      role: user.role,
    });
    
    const savedUser = await adminUser.save();
    
    return {
      id: (savedUser._id as mongoose.Types.ObjectId).toString(),
      email: savedUser.email,
      passwordHash: savedUser.passwordHash,
      name: savedUser.name,
      role: savedUser.role,
      createdAt: savedUser.createdAt,
    };
  }

  async getAdminUserByEmail(email: string): Promise<AdminUser | null> {
    await connectToMongoDB();
    
    const user = await AdminUserModel.findOne({ email });
    if (!user) return null;
    
    return {
      id: (user._id as mongoose.Types.ObjectId).toString(),
      email: user.email,
      passwordHash: user.passwordHash,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  async getAdminUserById(id: string): Promise<AdminUser | null> {
    await connectToMongoDB();
    
    const user = await AdminUserModel.findById(id);
    if (!user) return null;
    
    return {
      id: (user._id as mongoose.Types.ObjectId).toString(),
      email: user.email,
      passwordHash: user.passwordHash,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  async getAllAdminUsers(): Promise<AdminUser[]> {
    await connectToMongoDB();
    
    const users = await AdminUserModel.find().sort({ createdAt: -1 });
    
    return users.map(user => ({
      id: (user._id as mongoose.Types.ObjectId).toString(),
      email: user.email,
      passwordHash: user.passwordHash,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
    }));
  }

  async updateAdminUser(id: string, updates: Partial<InsertAdminUser>): Promise<AdminUser | null> {
    await connectToMongoDB();
    
    const updateData: any = { ...updates };
    if (updates.password) {
      updateData.passwordHash = await bcrypt.hash(updates.password, 10);
      delete updateData.password;
    }
    
    const user = await AdminUserModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    
    if (!user) return null;
    
    return {
      id: (user._id as mongoose.Types.ObjectId).toString(),
      email: user.email,
      passwordHash: user.passwordHash,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  async createBlog(blog: InsertBlog): Promise<Blog> {
    await connectToMongoDB();
    
    const newBlog = new BlogModel({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      imageUrl: blog.imageUrl,
      category: blog.category,
      tags: blog.tags,
      metaTitle: blog.metaTitle,
      metaDescription: blog.metaDescription,
      isPublished: blog.isPublished || false,
      publishedAt: blog.isPublished ? new Date() : undefined,
    });
    
    const savedBlog = await newBlog.save();
    
    return {
      id: (savedBlog._id as mongoose.Types.ObjectId).toString(),
      title: savedBlog.title,
      slug: savedBlog.slug,
      excerpt: savedBlog.excerpt,
      content: savedBlog.content,
      author: savedBlog.author,
      imageUrl: savedBlog.imageUrl,
      category: savedBlog.category,
      tags: savedBlog.tags || null,
      metaTitle: savedBlog.metaTitle || null,
      metaDescription: savedBlog.metaDescription || null,
      isPublished: savedBlog.isPublished,
      publishedAt: savedBlog.publishedAt || null,
      createdAt: savedBlog.createdAt,
    };
  }

  async getAllBlogs(): Promise<Blog[]> {
    await connectToMongoDB();
    
    const blogs = await BlogModel.find().sort({ createdAt: -1 });
    
    return blogs.map(blog => ({
      id: (blog._id as mongoose.Types.ObjectId).toString(),
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      imageUrl: blog.imageUrl,
      category: blog.category,
      tags: blog.tags || null,
      metaTitle: blog.metaTitle || null,
      metaDescription: blog.metaDescription || null,
      isPublished: blog.isPublished,
      publishedAt: blog.publishedAt || null,
      createdAt: blog.createdAt,
    }));
  }

  async getPublishedBlogs(): Promise<Blog[]> {
    await connectToMongoDB();
    
    const blogs = await BlogModel.find({ isPublished: true }).sort({ publishedAt: -1 });
    
    return blogs.map(blog => ({
      id: (blog._id as mongoose.Types.ObjectId).toString(),
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      imageUrl: blog.imageUrl,
      category: blog.category,
      tags: blog.tags || null,
      metaTitle: blog.metaTitle || null,
      metaDescription: blog.metaDescription || null,
      isPublished: blog.isPublished,
      publishedAt: blog.publishedAt || null,
      createdAt: blog.createdAt,
    }));
  }

  async getBlogById(id: string): Promise<Blog | null> {
    await connectToMongoDB();
    
    const blog = await BlogModel.findById(id);
    if (!blog) return null;
    
    return {
      id: (blog._id as mongoose.Types.ObjectId).toString(),
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      imageUrl: blog.imageUrl,
      category: blog.category,
      tags: blog.tags || null,
      metaTitle: blog.metaTitle || null,
      metaDescription: blog.metaDescription || null,
      isPublished: blog.isPublished,
      publishedAt: blog.publishedAt || null,
      createdAt: blog.createdAt,
    };
  }

  async getBlogBySlug(slug: string): Promise<Blog | null> {
    await connectToMongoDB();
    
    const blog = await BlogModel.findOne({ slug });
    if (!blog) return null;
    
    return {
      id: (blog._id as mongoose.Types.ObjectId).toString(),
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      imageUrl: blog.imageUrl,
      category: blog.category,
      tags: blog.tags || null,
      metaTitle: blog.metaTitle || null,
      metaDescription: blog.metaDescription || null,
      isPublished: blog.isPublished,
      publishedAt: blog.publishedAt || null,
      createdAt: blog.createdAt,
    };
  }

  async updateBlog(id: string, updates: Partial<InsertBlog>): Promise<Blog | null> {
    await connectToMongoDB();
    
    const blog = await BlogModel.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );
    
    if (!blog) return null;
    
    return {
      id: (blog._id as mongoose.Types.ObjectId).toString(),
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      imageUrl: blog.imageUrl,
      category: blog.category,
      tags: blog.tags || null,
      metaTitle: blog.metaTitle || null,
      metaDescription: blog.metaDescription || null,
      isPublished: blog.isPublished,
      publishedAt: blog.publishedAt || null,
      createdAt: blog.createdAt,
    };
  }

  async deleteBlog(id: string): Promise<boolean> {
    await connectToMongoDB();
    
    const result = await BlogModel.findByIdAndDelete(id);
    return result !== null;
  }

  async publishBlog(id: string): Promise<Blog | null> {
    await connectToMongoDB();
    
    const blog = await BlogModel.findByIdAndUpdate(
      id,
      { isPublished: true, publishedAt: new Date() },
      { new: true }
    );
    
    if (!blog) return null;
    
    return {
      id: (blog._id as mongoose.Types.ObjectId).toString(),
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      imageUrl: blog.imageUrl,
      category: blog.category,
      tags: blog.tags || null,
      metaTitle: blog.metaTitle || null,
      metaDescription: blog.metaDescription || null,
      isPublished: blog.isPublished,
      publishedAt: blog.publishedAt || null,
      createdAt: blog.createdAt,
    };
  }

  async createPortfolio(portfolio: InsertPortfolio): Promise<Portfolio> {
    await connectToMongoDB();
    
    const newPortfolio = new PortfolioModel({
      title: portfolio.title,
      description: portfolio.description,
      category: portfolio.category,
      technologies: portfolio.technologies,
      imageUrl: portfolio.imageUrl,
      projectUrl: portfolio.projectUrl,
      screenshots: portfolio.screenshots,
      isVisible: portfolio.isVisible !== false,
    });
    
    const savedPortfolio = await newPortfolio.save();
    
    return {
      id: (savedPortfolio._id as mongoose.Types.ObjectId).toString(),
      title: savedPortfolio.title,
      description: savedPortfolio.description,
      category: savedPortfolio.category,
      technologies: savedPortfolio.technologies,
      imageUrl: savedPortfolio.imageUrl,
      projectUrl: savedPortfolio.projectUrl || null,
      screenshots: savedPortfolio.screenshots || null,
      isVisible: savedPortfolio.isVisible,
      createdAt: savedPortfolio.createdAt,
    };
  }

  async getAllPortfolio(): Promise<Portfolio[]> {
    await connectToMongoDB();
    
    const portfolios = await PortfolioModel.find().sort({ createdAt: -1 });
    
    return portfolios.map(portfolio => ({
      id: (portfolio._id as mongoose.Types.ObjectId).toString(),
      title: portfolio.title,
      description: portfolio.description,
      category: portfolio.category,
      technologies: portfolio.technologies,
      imageUrl: portfolio.imageUrl,
      projectUrl: portfolio.projectUrl || null,
      screenshots: portfolio.screenshots || null,
      isVisible: portfolio.isVisible,
      createdAt: portfolio.createdAt,
    }));
  }

  async getVisiblePortfolio(): Promise<Portfolio[]> {
    await connectToMongoDB();
    
    const portfolios = await PortfolioModel.find({ isVisible: true }).sort({ createdAt: -1 });
    
    return portfolios.map(portfolio => ({
      id: (portfolio._id as mongoose.Types.ObjectId).toString(),
      title: portfolio.title,
      description: portfolio.description,
      category: portfolio.category,
      technologies: portfolio.technologies,
      imageUrl: portfolio.imageUrl,
      projectUrl: portfolio.projectUrl || null,
      screenshots: portfolio.screenshots || null,
      isVisible: portfolio.isVisible,
      createdAt: portfolio.createdAt,
    }));
  }

  async getPortfolioById(id: string): Promise<Portfolio | null> {
    await connectToMongoDB();
    
    const portfolio = await PortfolioModel.findById(id);
    if (!portfolio) return null;
    
    return {
      id: (portfolio._id as mongoose.Types.ObjectId).toString(),
      title: portfolio.title,
      description: portfolio.description,
      category: portfolio.category,
      technologies: portfolio.technologies,
      imageUrl: portfolio.imageUrl,
      projectUrl: portfolio.projectUrl || null,
      screenshots: portfolio.screenshots || null,
      isVisible: portfolio.isVisible,
      createdAt: portfolio.createdAt,
    };
  }

  async updatePortfolio(id: string, updates: Partial<InsertPortfolio>): Promise<Portfolio | null> {
    await connectToMongoDB();
    
    const portfolio = await PortfolioModel.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );
    
    if (!portfolio) return null;
    
    return {
      id: (portfolio._id as mongoose.Types.ObjectId).toString(),
      title: portfolio.title,
      description: portfolio.description,
      category: portfolio.category,
      technologies: portfolio.technologies,
      imageUrl: portfolio.imageUrl,
      projectUrl: portfolio.projectUrl || null,
      screenshots: portfolio.screenshots || null,
      isVisible: portfolio.isVisible,
      createdAt: portfolio.createdAt,
    };
  }

  async deletePortfolio(id: string): Promise<boolean> {
    await connectToMongoDB();
    
    const result = await PortfolioModel.findByIdAndDelete(id);
    return result !== null;
  }

  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    await connectToMongoDB();
    
    const newMember = new TeamMemberModel({
      name: member.name,
      role: member.role,
      bio: member.bio,
      photoUrl: member.photoUrl,
      linkedinUrl: member.linkedinUrl,
      twitterUrl: member.twitterUrl,
      order: member.order || 0,
    });
    
    const savedMember = await newMember.save();
    
    return {
      id: (savedMember._id as mongoose.Types.ObjectId).toString(),
      name: savedMember.name,
      role: savedMember.role,
      bio: savedMember.bio,
      photoUrl: savedMember.photoUrl,
      linkedinUrl: savedMember.linkedinUrl || null,
      twitterUrl: savedMember.twitterUrl || null,
      order: savedMember.order,
      createdAt: savedMember.createdAt,
    };
  }

  async getAllTeamMembers(): Promise<TeamMember[]> {
    await connectToMongoDB();
    
    const members = await TeamMemberModel.find().sort({ order: 1 });
    
    return members.map(member => ({
      id: (member._id as mongoose.Types.ObjectId).toString(),
      name: member.name,
      role: member.role,
      bio: member.bio,
      photoUrl: member.photoUrl,
      linkedinUrl: member.linkedinUrl || null,
      twitterUrl: member.twitterUrl || null,
      order: member.order,
      createdAt: member.createdAt,
    }));
  }

  async getTeamMemberById(id: string): Promise<TeamMember | null> {
    await connectToMongoDB();
    
    const member = await TeamMemberModel.findById(id);
    if (!member) return null;
    
    return {
      id: (member._id as mongoose.Types.ObjectId).toString(),
      name: member.name,
      role: member.role,
      bio: member.bio,
      photoUrl: member.photoUrl,
      linkedinUrl: member.linkedinUrl || null,
      twitterUrl: member.twitterUrl || null,
      order: member.order,
      createdAt: member.createdAt,
    };
  }

  async updateTeamMember(id: string, updates: Partial<InsertTeamMember>): Promise<TeamMember | null> {
    await connectToMongoDB();
    
    const member = await TeamMemberModel.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );
    
    if (!member) return null;
    
    return {
      id: (member._id as mongoose.Types.ObjectId).toString(),
      name: member.name,
      role: member.role,
      bio: member.bio,
      photoUrl: member.photoUrl,
      linkedinUrl: member.linkedinUrl || null,
      twitterUrl: member.twitterUrl || null,
      order: member.order,
      createdAt: member.createdAt,
    };
  }

  async deleteTeamMember(id: string): Promise<boolean> {
    await connectToMongoDB();
    
    const result = await TeamMemberModel.findByIdAndDelete(id);
    return result !== null;
  }

  async createService(service: InsertService): Promise<Service> {
    await connectToMongoDB();
    
    const newService = new ServiceModel({
      title: service.title,
      shortDescription: service.shortDescription,
      detailedDescription: service.detailedDescription,
      iconUrl: service.iconUrl,
      features: service.features,
      order: service.order || 0,
    });
    
    const savedService = await newService.save();
    
    return {
      id: (savedService._id as mongoose.Types.ObjectId).toString(),
      title: savedService.title,
      shortDescription: savedService.shortDescription,
      detailedDescription: savedService.detailedDescription,
      iconUrl: savedService.iconUrl,
      features: savedService.features || null,
      order: savedService.order,
      createdAt: savedService.createdAt,
    };
  }

  async getAllServices(): Promise<Service[]> {
    await connectToMongoDB();
    
    const services = await ServiceModel.find().sort({ order: 1 });
    
    return services.map(service => ({
      id: (service._id as mongoose.Types.ObjectId).toString(),
      title: service.title,
      shortDescription: service.shortDescription,
      detailedDescription: service.detailedDescription,
      iconUrl: service.iconUrl,
      features: service.features || null,
      order: service.order,
      createdAt: service.createdAt,
    }));
  }

  async getServiceById(id: string): Promise<Service | null> {
    await connectToMongoDB();
    
    const service = await ServiceModel.findById(id);
    if (!service) return null;
    
    return {
      id: (service._id as mongoose.Types.ObjectId).toString(),
      title: service.title,
      shortDescription: service.shortDescription,
      detailedDescription: service.detailedDescription,
      iconUrl: service.iconUrl,
      features: service.features || null,
      order: service.order,
      createdAt: service.createdAt,
    };
  }

  async updateService(id: string, updates: Partial<InsertService>): Promise<Service | null> {
    await connectToMongoDB();
    
    const service = await ServiceModel.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );
    
    if (!service) return null;
    
    return {
      id: (service._id as mongoose.Types.ObjectId).toString(),
      title: service.title,
      shortDescription: service.shortDescription,
      detailedDescription: service.detailedDescription,
      iconUrl: service.iconUrl,
      features: service.features || null,
      order: service.order,
      createdAt: service.createdAt,
    };
  }

  async deleteService(id: string): Promise<boolean> {
    await connectToMongoDB();
    
    const result = await ServiceModel.findByIdAndDelete(id);
    return result !== null;
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    await connectToMongoDB();
    
    const newTestimonial = new TestimonialModel({
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company,
      content: testimonial.content,
      rating: testimonial.rating,
      photoUrl: testimonial.photoUrl,
      order: testimonial.order,
    });
    
    const savedTestimonial = await newTestimonial.save();
    
    return {
      id: (savedTestimonial._id as mongoose.Types.ObjectId).toString(),
      name: savedTestimonial.name,
      role: savedTestimonial.role,
      company: savedTestimonial.company,
      content: savedTestimonial.content,
      rating: savedTestimonial.rating,
      photoUrl: savedTestimonial.photoUrl || null,
      order: savedTestimonial.order,
      createdAt: savedTestimonial.createdAt,
    };
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    await connectToMongoDB();
    
    const testimonials = await TestimonialModel.find().sort({ order: 1 });
    
    return testimonials.map(testimonial => ({
      id: (testimonial._id as mongoose.Types.ObjectId).toString(),
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company,
      content: testimonial.content,
      rating: testimonial.rating,
      photoUrl: testimonial.photoUrl || null,
      order: testimonial.order,
      createdAt: testimonial.createdAt,
    }));
  }

  async getTestimonialById(id: string): Promise<Testimonial | null> {
    await connectToMongoDB();
    
    const testimonial = await TestimonialModel.findById(id);
    if (!testimonial) return null;
    
    return {
      id: (testimonial._id as mongoose.Types.ObjectId).toString(),
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company,
      content: testimonial.content,
      rating: testimonial.rating,
      photoUrl: testimonial.photoUrl || null,
      order: testimonial.order,
      createdAt: testimonial.createdAt,
    };
  }

  async updateTestimonial(id: string, updates: Partial<InsertTestimonial>): Promise<Testimonial | null> {
    await connectToMongoDB();
    
    const testimonial = await TestimonialModel.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );
    
    if (!testimonial) return null;
    
    return {
      id: (testimonial._id as mongoose.Types.ObjectId).toString(),
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company,
      content: testimonial.content,
      rating: testimonial.rating,
      photoUrl: testimonial.photoUrl || null,
      order: testimonial.order,
      createdAt: testimonial.createdAt,
    };
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    await connectToMongoDB();
    
    const result = await TestimonialModel.findByIdAndDelete(id);
    return result !== null;
  }

  async createActivityLog(log: InsertActivityLog): Promise<ActivityLog> {
    await connectToMongoDB();
    
    const newLog = new ActivityLogModel({
      userId: log.userId,
      action: log.action,
      entityType: log.entityType,
      entityId: log.entityId,
      details: log.details,
    });
    
    const savedLog = await newLog.save();
    
    return {
      id: (savedLog._id as mongoose.Types.ObjectId).toString(),
      userId: savedLog.userId,
      action: savedLog.action,
      entityType: savedLog.entityType,
      entityId: savedLog.entityId || null,
      details: savedLog.details || null,
      createdAt: savedLog.createdAt,
    };
  }

  async getActivityLogs(limit = 50): Promise<ActivityLog[]> {
    await connectToMongoDB();
    
    const logs = await ActivityLogModel.find()
      .sort({ createdAt: -1 })
      .limit(limit);
    
    return logs.map(log => ({
      id: (log._id as mongoose.Types.ObjectId).toString(),
      userId: log.userId,
      action: log.action,
      entityType: log.entityType,
      entityId: log.entityId || null,
      details: log.details || null,
      createdAt: log.createdAt,
    }));
  }

  async getUserActivityLogs(userId: string, limit = 50): Promise<ActivityLog[]> {
    await connectToMongoDB();
    
    const logs = await ActivityLogModel.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit);
    
    return logs.map(log => ({
      id: (log._id as mongoose.Types.ObjectId).toString(),
      userId: log.userId,
      action: log.action,
      entityType: log.entityType,
      entityId: log.entityId || null,
      details: log.details || null,
      createdAt: log.createdAt,
    }));
  }

  async getDashboardStats(): Promise<{
    totalLeads: number;
    unreadLeads: number;
    totalBlogs: number;
    publishedBlogs: number;
    totalPortfolios: number;
    visiblePortfolios: number;
    totalTeamMembers: number;
    totalJobApplications: number;
  }> {
    await connectToMongoDB();
    
    const [
      totalLeads,
      unreadLeads,
      totalBlogs,
      publishedBlogs,
      totalPortfolios,
      visiblePortfolios,
      totalTeamMembers,
      totalJobApplications,
    ] = await Promise.all([
      ContactSubmission.countDocuments(),
      ContactSubmission.countDocuments({ isRead: false }),
      BlogModel.countDocuments(),
      BlogModel.countDocuments({ isPublished: true }),
      PortfolioModel.countDocuments(),
      PortfolioModel.countDocuments({ isVisible: true }),
      TeamMemberModel.countDocuments(),
      JobApplication.countDocuments(),
    ]);
    
    return {
      totalLeads,
      unreadLeads,
      totalBlogs,
      publishedBlogs,
      totalPortfolios,
      visiblePortfolios,
      totalTeamMembers,
      totalJobApplications,
    };
  }
}
