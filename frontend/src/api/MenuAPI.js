import axios from "axios";

const API_URL = "http://localhost:5000/api/menu";

// Function to handle HTTP requests
const apiRequest = async (method, url, data = null) => {
  try {
    const config = { method, url, data };
    const response = await axios(config);
    return response.data;
  } catch (err) {
    console.error(
      `API Error (${method} ${url}):`,
      err.response ? err.response.data : err.message
    );
    throw new Error(
      err.response ? err.response.data.message : "An error occurred"
    );
  }
};

// ======================
// MENU ITEMS API
// ======================

// Fetch all menu items
export const fetchMenuItems = async () => {
  return apiRequest("GET", API_URL);
};

// Create a new menu item
export const createMenuItem = async (menuItem) => {
  const data = {
    name: menuItem.name,
    category: menuItem.category === "None" ? null : menuItem.category,
    price: parseFloat(menuItem.price),
    description: menuItem.description || null,
    group: menuItem.group,
  };

  return apiRequest("POST", API_URL, data);
};

// Update an existing menu item
export const updateMenuItem = async (id, updatedData) => {
  const data = {
    name: updatedData.name,
    category: updatedData.category === "None" ? null : updatedData.category,
    price: updatedData.price,
    description: updatedData.description,
    group: updatedData.group,
  };

  return apiRequest("PUT", `${API_URL}/${id}`, data);
};
