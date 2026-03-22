import axios from "axios";

const API_ORIGIN = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

axios.defaults.baseURL = API_ORIGIN;

export async function getPage(slug) {
  const response = await axios.get(`/api/pages/${slug}/`);
  const data = response.data || {};

  const sections = Array.isArray(data.sections)
    ? data.sections.map((section, index) => ({
        ...section,
        order: Number.isFinite(Number(section?.order)) ? Number(section.order) : index,
      }))
    : [];

  const gallery = Array.isArray(data.gallery)
    ? data.gallery
        .map((item, index) => ({
          id: item?.id ?? `gallery-${index}`,
          image: String(item?.image || "").trim(),
          order: Number.isFinite(Number(item?.order)) ? Number(item.order) : index,
        }))
        .filter((item) => item.image)
        .sort((a, b) => a.order - b.order)
    : [];

  return {
    ...data,
    sections,
    gallery,
  };
}
