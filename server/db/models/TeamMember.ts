import mongoose, { Schema, Document } from 'mongoose';

export interface ITeamMember extends Document {
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  order: number;
  createdAt: Date;
}

const teamMemberSchema = new Schema<ITeamMember>({
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
  bio: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
    required: true,
  },
  linkedinUrl: {
    type: String,
    required: false,
  },
  twitterUrl: {
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

teamMemberSchema.index({ order: 1 });

export const TeamMember = mongoose.model<ITeamMember>('TeamMember', teamMemberSchema);
