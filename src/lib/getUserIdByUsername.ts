export async function getUserIdFromUsername(username: string): Promise<string | null> {
  try {
    const res = await fetch(`http://localhost:3000/api/user/by-username?username=${username}`, {
      cache: "no-store",
    })

    if (!res.ok) return null

    const { userId } = await res.json()
    return userId
  } catch (err) {
    console.error("Failed to fetch userId from username:", err)
    return null
  }
}
