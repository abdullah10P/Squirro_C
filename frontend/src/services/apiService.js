import { ERROR_FETCHING_DATA } from "../utils/constants";
import { HIT_API } from "../config";

export const getStores = async () => {
  try {
    const response = await fetch(HIT_API);
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
