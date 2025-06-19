import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error("⚠️ MONGODB_URI is not defined in .env.local")
}

export async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI)
  } catch (error) {
    console.log("MongoDB connection error:", error)
    throw error
  }
}