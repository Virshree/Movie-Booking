import axios from "axios";
import { AxiosInstance } from "../utils/AxiosInstance";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getAllTheatre = async () => {
  const getUrl = `${BASE_URL}/mba/api/v1/theatres`;

  try {
    const response = await AxiosInstance.get(getUrl);
    //console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const addNewTheatre = async (theatre) => {
  const postUrl = `${BASE_URL}/mba/api/v1/theatres`;
  try {
    const response = await AxiosInstance.post(postUrl, theatre);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const getTheatreById = async (theatreId) => {
  const getUrl = `${BASE_URL}/mba/api/v1/theatres/${theatreId}`;
  return await axios.get(getUrl, {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
    },
  });
};

export const updateTheatreDetails = async (theater) => {
  const URL = `/mba/api/v1/theatres/${theater._id}`;
  try {
    const response = await AxiosInstance.put(URL, theater);
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const deleteTheatreDetails = async (theater) => {
  const delURL = `/mba/api/v1/theatres/${theater._id}`;
  try {
    const response = await AxiosInstance.delete(delURL);
    //console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
