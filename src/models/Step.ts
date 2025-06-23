import mongoose from "mongoose";

const StepSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Post"
  },
  photos: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Photo"
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

export const Step = mongoose.models.Step || mongoose.model("Step", StepSchema)