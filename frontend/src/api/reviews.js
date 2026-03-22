const API_ORIGIN = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "")
const REVIEWS_ENDPOINT = `${API_ORIGIN}/api/reviews/`

const toAbsoluteUrl = (value) => {
  const raw = String(value || "").trim()
  if (!raw) return ""
  if (/^https?:\/\//i.test(raw)) return raw
  return `${API_ORIGIN}${raw.startsWith("/") ? "" : "/"}${raw}`
}

export const getReviews = async () => {
  const response = await fetch(REVIEWS_ENDPOINT, {
    headers: { Accept: "application/json" },
  })

  if (!response.ok) {
    throw new Error(`reviews request failed: ${response.status}`)
  }

  const payload = await response.json()
  const items = Array.isArray(payload) ? payload : payload?.results
  if (!Array.isArray(items)) return []

  return items.map((item, index) => ({
    id: item?.id ?? `review-${index}`,
    name: String(item?.name || ""),
    event_name: String(item?.event_name || ""),
    rating: Number(item?.rating || 0),
    text: String(item?.text || ""),
    date: item?.date || null,
    avatar: toAbsoluteUrl(item?.avatar),
  }))
}
