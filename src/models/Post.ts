import mongoose, { Model } from "mongoose";
import { PostType } from "@/types/post";

interface PostDocument extends PostType, Document {}

const PostSchema = new mongoose.Schema<PostDocument>({
  owner_id: {
    type : mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  photos: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Photo",
    required: true,
  }],
  steps: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Step",
    required: true
  }],
  tags: [{
    type: String
  }],
  status: {
    type: String,
    enum: ["private", "public", "draft"],
    default: "draft"
  }
}, {
  timestamps: true
})

export const Post: Model<PostDocument> = mongoose.models.Post || mongoose.model<PostDocument>("Post", PostSchema)