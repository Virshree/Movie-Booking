import { AxiosInstance } from "../utils/AxiosInstance";

export const getAllUsers = async () => {
  const getURL = "/mba/api/v1/users/";
  try {
    const response = await AxiosInstance.get(getURL);
    //console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const updateUserInfo = async (user) => {
  const putURL = `/mba/api/v1/users/${user.userId}`;
  try {
    const response = await AxiosInstance.put(putURL, user);
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
