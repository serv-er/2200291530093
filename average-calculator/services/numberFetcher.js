import axios from "axios";

const BASE_URL = "http://20.244.56.144/evaluation-service";

export const fetchNumbers = async (endpoint) => {
  const url = `${BASE_URL}/${endpoint}`;
  const response = await axios.get(url, { timeout: 500 }); // 500ms max
  return response.data.numbers || [];
};
