import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true
  },
  lat: {
    type: Number
  },
  long: {
    type: Number
  }
}, {
  timestamps: true
})

export const Photo = mongoose.models.Photo || mongoose.model("Photo", PhotoSchema)