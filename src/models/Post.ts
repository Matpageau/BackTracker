import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  owner: {
    type : mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true
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
  tags: {
    String
  }
}, {
  timestamps: true
})

export const Post = mongoose.models.Post || mongoose.model("Post", PostSchema)