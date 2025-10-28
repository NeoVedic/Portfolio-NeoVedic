import mongoose, { Schema, Document } from 'mongoose';

export interface IContactSubmission extends Document {
  name: string;
  email: string;
  service: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

const contactSubmissionSchema = new Schema<IContactSubmission>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  service: {
    type: String,
    required: true,
    enum: ['web-development', 'devops', 'cloud', 'marketing', 'other'],
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

contactSubmissionSchema.index({ email: 1 });
contactSubmissionSchema.index({ createdAt: -1 });

export const ContactSubmission = mongoose.model<IContactSubmission>('ContactSubmission', contactSubmissionSchema);