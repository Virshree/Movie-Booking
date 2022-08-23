import { AxiosInstance } from "../utils/AxiosInstance";

export const makePaymentForBookings = async (paymentData) => {
  const URL = "/mba/api/v1/payments";
  try {
    const response = await AxiosInstance.post(URL, paymentData);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
