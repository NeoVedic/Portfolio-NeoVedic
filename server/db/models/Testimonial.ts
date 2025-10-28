import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  photoUrl?: string;
  order: number;
  createdAt: Date;
}

const testimonialSchema = new Schema<ITestimonial>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    default: 5,
  },
  photoUrl: {
    type: String,
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

testimonialSchema.index({ order: 1 });

export const Testimonial = mongoose.model<ITestimonial>('Testimonial', testimonialSchema);
