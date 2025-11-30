
import axios from "axios";

const API_URL = "http://localhost:5000/analytics";

export const fetchRevenueTrend = async () => {
  const res = await axios.get(`${API_URL}/revenue-trend`);
  return res.data;
};

export const fetchSalesByCategory = async () => {
  const res = await axios.get(`${API_URL}/sales-by-category`);
  return res.data;
};

export const fetchTopItems = async () => {
  const res = await axios.get(`${API_URL}/top-items`);
  return res.data;
};

export const fetchKeyMetrics = async () => {
  const res = await axios.get(`${API_URL}/key-metrics`);
  return res.data;
};
