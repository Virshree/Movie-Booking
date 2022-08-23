import { AxiosInstance } from "../utils/AxiosInstance";

export const createNewBookings = async (bookingData) => {
  const URL = "/mba/api/v1/bookings";
  try {
    const response = await AxiosInstance.post(URL, bookingData);
    //console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const getBookings = async () => {
  const URL = "/mba/api/v1/payments";
  try {
    const response = await AxiosInstance.get(URL);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
