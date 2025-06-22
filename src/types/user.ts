export interface UserType {
  _id?: string
  email: string
  password: string
  userName: string
  fullName: string
  private: boolean
  profileImg?: string
  bio?: string
  createdAt: Date
}