const API_ORIGIN = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "")
const SCHEDULE_ENDPOINT = `${API_ORIGIN}/api/schedule/`

export async function getSchedule() {
  const res = await fetch(SCHEDULE_ENDPOINT)
  if (!res.ok) {
    throw new Error("Failed to load schedule")
  }
  return await res.json()
}
