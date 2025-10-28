import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  title: string;
  shortDescription: string;
  detailedDescription: string;
  iconUrl: string;
  features?: string[];
  order: number;
  createdAt: Date;
}

const serviceSchema = new Schema<IService>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  detailedDescription: {
    type: String,
    required: true,
  },
  iconUrl: {
    type: String,
    required: true,
  },
  features: {
    type: [String],
    required: false,
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

serviceSchema.index({ order: 1 });

export const Service = mongoose.model<IService>('Service', serviceSchema);
