const API_ORIGIN = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "")
const SERVICE_REQUESTS_ENDPOINT = `${API_ORIGIN}/api/service-requests/`

export async function createServiceRequest(payload) {
  const response = await fetch(SERVICE_REQUESTS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    let message = "Не удалось отправить заявку. Попробуйте снова."
    try {
      const errorData = await response.json()
      if (errorData && typeof errorData === "object") {
        const firstError = Object.values(errorData).find((value) => Array.isArray(value) && value.length > 0)
        if (Array.isArray(firstError)) {
          message = String(firstError[0])
        }
      }
    } catch (parseError) {
      // Keep default message if backend did not return JSON.
    }
    throw new Error(message)
  }

  return await response.json()
}
