const API_ORIGIN = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "")
const DAY_SCENARIOS_ENDPOINT = `${API_ORIGIN}/api/day-scenarios/`

export async function createDayScenario(payload) {
  const response = await fetch(DAY_SCENARIOS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    let message = "Не удалось отправить сценарий. Попробуйте снова."
    try {
      const errorData = await response.json()
      if (errorData && typeof errorData === "object") {
        const firstError = Object.values(errorData).find((value) => Array.isArray(value) && value.length > 0)
        if (Array.isArray(firstError)) {
          message = String(firstError[0])
        }
      }
    } catch (parseError) {
      // Keep default message when error body is not JSON.
    }
    throw new Error(message)
  }

  return await response.json()
}
