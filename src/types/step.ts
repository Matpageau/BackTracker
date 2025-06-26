import { Types } from "mongoose"

export interface StepType {
  _id? : object
  post_id: Types.ObjectId
  lng: number
  lat: number
  medias: Types.ObjectId[]
  description: string
  date_from: Date
  date_to: Date
  createdAt: Date
}