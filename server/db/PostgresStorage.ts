import { type ContactSubmission, type InsertContactSubmission, type JobApplication, type InsertJobApplication, contactSubmissions, jobApplications } from "@shared/schema";
import { db } from "./db";
import { desc } from "drizzle-orm";

export class PostgresStorage {
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [result] = await db.insert(contactSubmissions).values(submission).returning();
    return result;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  async createJobApplication(application: InsertJobApplication): Promise<JobApplication> {
    const [result] = await db.insert(jobApplications).values(application).returning();
    return result;
  }

  async getAllJobApplications(): Promise<JobApplication[]> {
    return await db.select().from(jobApplications).orderBy(desc(jobApplications.createdAt));
  }
}
