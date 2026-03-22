const API_ORIGIN = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "")
const ARTICLES_ENDPOINT = `${API_ORIGIN}/api/articles/`

const toAbsoluteUrl = (value) => {
  const raw = String(value || "").trim()
  if (!raw) return ""
  if (/^https?:\/\//i.test(raw)) return raw
  return `${API_ORIGIN}${raw.startsWith("/") ? "" : "/"}${raw}`
}

const normalizeItem = (item) => ({
  title: String(item?.title || ""),
  slug: String(item?.slug || ""),
  preview_image: toAbsoluteUrl(item?.preview_image),
  preview_description: String(item?.preview_description || ""),
  content: String(item?.content || ""),
  content_type: String(item?.content_type || "article"),
  video_url: String(item?.video_url || ""),
  created_at: item?.created_at || null,
})

export const getArticles = async () => {
  const response = await fetch(ARTICLES_ENDPOINT, {
    headers: { Accept: "application/json" },
  })

  if (!response.ok) {
    throw new Error(`articles request failed: ${response.status}`)
  }

  const payload = await response.json()
  const items = Array.isArray(payload) ? payload : payload?.results
  if (!Array.isArray(items)) return []

  return items.map(normalizeItem)
}

export const getArticleBySlug = async (slug) => {
  const safeSlug = encodeURIComponent(String(slug || "").trim())
  if (!safeSlug) throw new Error("article slug is required")

  const response = await fetch(`${ARTICLES_ENDPOINT}${safeSlug}/`, {
    headers: { Accept: "application/json" },
  })

  if (!response.ok) {
    throw new Error(`article detail request failed: ${response.status}`)
  }

  const payload = await response.json()
  return normalizeItem(payload)
}
