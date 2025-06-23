import { Types } from "mongoose"

export interface PostType {
  _id? : object
  owner_id: Types.ObjectId
  photos: Types.ObjectId[]
  steps: Types.ObjectId[]
  tags: string[]
  status: "private" | "public" | "draft"
  createdAt: Date
}