import axios from "axios";

const API_URL = "http://localhost:5000/api/announcements";

// Generic API request handler
const apiRequest = async (method, url, data = null) => {
  try {
    const config = { method, url, data };
    const response = await axios(config);
    return response.data;
  } catch (err) {
    console.error(`API Error (${method} ${url}):`, err.response?.data || err.message);
    throw new Error(err.response?.data?.message || "An error occurred");
  }
};

// Fetch all announcements
export const fetchAnnouncements = async () => apiRequest("GET", API_URL);

// Fetch announcement by ID
export const fetchAnnouncementById = async (id) => {
  if (!id) throw new Error("Announcement ID is required");
  return apiRequest("GET", `${API_URL}/${id}`);
};

// Create new announcement
export const createAnnouncement = async (title, type, content, date) => {
  if (!title || !type || !content || !date) throw new Error("All fields are required");
  const data = { title, type, content, date };
  return apiRequest("POST", API_URL, data);
};

// Update existing announcement
export const updateAnnouncement = async (id, title, type, content, date) => {
  if (!id) throw new Error("Announcement ID is required");
  if (!title || !type || !content || !date) throw new Error("All fields are required");
  const data = { title, type, content, date };
  return apiRequest("PUT", `${API_URL}/${id}`, data);
};

// Delete announcement by ID
export const deleteAnnouncement = async (id) => {
  if (!id) throw new Error("Announcement ID is required");
  return apiRequest("DELETE", `${API_URL}/${id}`);
};
