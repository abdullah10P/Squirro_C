import { ERROR_FETCHING_DATA } from "../utils/constants";
const hit_api = "http://localhost:3000/stores";

export const getStores = async () => {
  try {
    const response = await fetch(hit_api);
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(ERROR_FETCHING_DATA, error);
    throw error;
  }
};
