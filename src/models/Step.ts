import { StepType } from "@/types/step";
import mongoose, { Model } from "mongoose";

interface StepDocument extends StepType, Document {}

const StepSchema = new mongoose.Schema<StepDocument>({
  post_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Post"
  },
  lng: {
    type: Number,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  medias: [{
    type: String,
    default: []
  }],
  description: {
    type: String
  },
  date_from: {
    type: Date
  },
  date_to: {
    type: Date
  }
}, {
  timestamps: true
})

export const Step: Model<StepDocument> = mongoose.models.Step || mongoose.model<StepDocument>("Step", StepSchema)