import mongoose from "mongoose";

const FollowcShema = new mongoose.Schema({
  following_user_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  },
  followed_user_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  }
})

export const Follow = mongoose.models.Follow || mongoose.model("Follow", FollowcShema)