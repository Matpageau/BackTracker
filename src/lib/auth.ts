import jwt from 'jsonwebtoken'

export function verifyToken(token: string): { userId: string } | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    return decoded as { userId: string }
  } catch {
    return null
  }
}
