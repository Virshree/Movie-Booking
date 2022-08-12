import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getAllTheatre = async () => {
  const getUrl = `${BASE_URL}/mba/api/v1/theatres`;
  return await axios.get(getUrl);
};
export const getTheatreById = async (theatreId) => {
  const getUrl = `${BASE_URL}/mba/api/v1/theatres/${theatreId}`;
  return await axios.get(getUrl, {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
    },
  });
};

export const updateTheatre = async (theatreId, theatreData) => {
  const postUrl = `${BASE_URL}/mba/api/v1/theatres/${theatreId}`;
  return await axios.put(postUrl, theatreData, {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
    },
  });
};
