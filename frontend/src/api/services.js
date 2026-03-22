const API_ORIGIN = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "")
const SERVICES_ENDPOINT = `${API_ORIGIN}/api/services/`

export async function getServices() {
  const res = await fetch(SERVICES_ENDPOINT, {
    headers: { Accept: "application/json" },
  })

  if (!res.ok) {
    throw new Error(`services request failed: ${res.status}`)
  }

  return await res.json()
}
