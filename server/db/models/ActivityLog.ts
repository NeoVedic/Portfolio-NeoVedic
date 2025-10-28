import mongoose, { Schema, Document } from 'mongoose';

export interface IActivityLog extends Document {
  userId: string;
  action: string;
  entityType: 'blog' | 'portfolio' | 'team' | 'service' | 'lead' | 'job-application';
  entityId?: string;
  details?: string;
  createdAt: Date;
}

const activityLogSchema = new Schema<IActivityLog>({
  userId: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  entityType: {
    type: String,
    required: true,
    enum: ['blog', 'portfolio', 'team', 'service', 'lead', 'job-application'],
  },
  entityId: {
    type: String,
    required: false,
  },
  details: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

activityLogSchema.index({ userId: 1, createdAt: -1 });
activityLogSchema.index({ entityType: 1, entityId: 1 });
activityLogSchema.index({ createdAt: -1 });

export const ActivityLog = mongoose.model<IActivityLog>('ActivityLog', activityLogSchema);
