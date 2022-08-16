import { AxiosInstance } from "../utils/AxiosInstance";

export const createBookings = async (bookings) => {
  const URL = "/mba/api/v1/bookings";
  try {
    const response = await AxiosInstance.post(URL, bookings);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const getBookings = async () => {
  const URL = "/mba/api/v1/bookings";
  try {
    const response = await AxiosInstance.get(URL);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
