import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

//fetching movies data from server -get method .

export const getAllMovies = async () => {
  const getUrl = `${BASE_URL}/mba/api/v1/movies`;
  return await axios.get(getUrl);
};

export const getMovieDetail = async (movieId) => {
  const getUrl = `${BASE_URL}/mba/api/v1/movies/${movieId}`;
  return await axios.get(getUrl);
};

export const updateMovie = async (movieId) => {
  const url = `${BASE_URL}/mba/api/v1/movies/${movieId}`;
  return await axios.put(url, {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
    },
  });
};
