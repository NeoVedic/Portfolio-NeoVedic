import mongoose from "mongoose";
import { type ContactSubmission as ContactSubmissionType, type InsertContactSubmission, type JobApplication as JobApplicationType, type InsertJobApplication } from "@shared/schema";
import { ContactSubmission } from "./models/ContactSubmission";
import { JobApplication } from "./models/JobApplication";
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
      createdAt: submission.createdAt,
    }));
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
}