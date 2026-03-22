import axios from "axios";

const API_ORIGIN = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

axios.defaults.baseURL = API_ORIGIN;

export async function getPage(slug) {
  const response = await axios.get(`/api/pages/${slug}/`);
  const data = response.data || {};

  return {
    ...data,
    sections: Array.isArray(data.sections) ? data.sections : [],
    gallery: Array.isArray(data.gallery) ? data.gallery.map((item) => item?.image).filter(Boolean) : [],
  };
}
