const API_ORIGIN = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "")
const NEWS_ENDPOINT = `${API_ORIGIN}/api/news/`

const toAbsoluteUrl = (value) => {
  const raw = String(value || "").trim()
  if (!raw) return ""
  if (/^https?:\/\//i.test(raw)) return raw
  return `${API_ORIGIN}${raw.startsWith("/") ? "" : "/"}${raw}`
}

const normalizeNews = (item) => ({
  id: item?.id ?? null,
  title: String(item?.title || ""),
  slug: String(item?.slug || ""),
  description: String(item?.description || ""),
  image: toAbsoluteUrl(item?.image),
  published_date: item?.published_date || null,
  content: Array.isArray(item?.content) ? item.content.map((p) => String(p || "")).filter(Boolean) : [],
})

export const getNewsList = async () => {
  const response = await fetch(NEWS_ENDPOINT, {
    headers: { Accept: "application/json" },
  })

  if (!response.ok) {
    throw new Error(`news list request failed: ${response.status}`)
  }

  const payload = await response.json()
  const items = Array.isArray(payload) ? payload : payload?.results
  if (!Array.isArray(items)) return []

  return items.map(normalizeNews)
}

export const getNewsBySlug = async (slug) => {
  const safeSlug = encodeURIComponent(String(slug || "").trim())
  if (!safeSlug) throw new Error("news slug is required")

  const response = await fetch(`${NEWS_ENDPOINT}${safeSlug}/`, {
    headers: { Accept: "application/json" },
  })

  if (!response.ok) {
    throw new Error(`news detail request failed: ${response.status}`)
  }

  const payload = await response.json()
  return normalizeNews(payload)
}
