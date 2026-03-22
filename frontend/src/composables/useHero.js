import { ref } from "vue";

const API_ORIGIN = (import.meta.env.VITE_API_URL || "").replace(
  /\/$/,
  ""
);
const HERO_ENDPOINT = `${API_ORIGIN}/api/hero/`;

const hero = ref(null);
const loadingHero = ref(false);
const heroError = ref("");

const toAbsoluteUrl = (value) => {
  const raw = String(value || "").trim();
  if (!raw) return "";
  if (/^https?:\/\//i.test(raw)) return raw;
  return `${API_ORIGIN}${raw.startsWith("/") ? "" : "/"}${raw}`;
};

export const loadHero = async () => {
  loadingHero.value = true;
  heroError.value = "";

  try {
    const response = await fetch(HERO_ENDPOINT, {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`hero request failed: ${response.status}`);
    }

    const payload = await response.json();
    hero.value = {
      id: payload?.id ?? null,
      title: String(payload?.title || ""),
      description: String(payload?.description || ""),
      background_image: toAbsoluteUrl(payload?.background_image),
      avatar: toAbsoluteUrl(payload?.avatar),
    };
  } catch (error) {
    console.error("[hero] failed to load", error);
    hero.value = null;
    heroError.value = "Не удалось загрузить Hero-данные";
  } finally {
    loadingHero.value = false;
  }
};

export const useHero = () => ({
  hero,
  loadingHero,
  heroError,
  loadHero,
});
