import mongoose, { Schema, Document } from 'mongoose';

export interface IPortfolio extends Document {
  title: string;
  description: string;
  category: string;
  technologies: string[];
  imageUrl: string;
  projectUrl?: string;
  screenshots?: string[];
  isVisible: boolean;
  createdAt: Date;
}

const portfolioSchema = new Schema<IPortfolio>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  technologies: {
    type: [String],
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  projectUrl: {
    type: String,
    required: false,
  },
  screenshots: {
    type: [String],
    required: false,
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

portfolioSchema.index({ isVisible: 1, createdAt: -1 });
portfolioSchema.index({ category: 1 });

export const Portfolio = mongoose.model<IPortfolio>('Portfolio', portfolioSchema);
