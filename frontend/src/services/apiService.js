import { ERROR_FETCHING_DATA } from "../utils/constants";
import { API_URL } from "../config";

export const getStores = async () => {
  try {
    const response = await fetch(API_URL);
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
