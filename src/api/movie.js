import { AxiosInstance } from "../utils/AxiosInstance";
const BASE_URL = process.env.REACT_APP_BASE_URL;

//fetching movies data from server -get method .

export const getAllMovies = async () => {
  const getUrl = `${BASE_URL}/mba/api/v1/movies`;

  try {
    const response = await AxiosInstance.get(getUrl);
    return response;
  } catch (error) {
    //console.log(error);
    return error.response;
  }
};

export const getMovieById = async (movieId) => {
  const getUrl = `${BASE_URL}/mba/api/v1/movies/${movieId}`;

  try {
    const response = await AxiosInstance.get(getUrl);
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const updateMovieDetails = async (movies) => {
  const URL = `/mba/api/v1/movies/${movies._id}`;
  try {
    const response = await AxiosInstance.put(URL, movies);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const addNewMovies = async (movie) => {
  const postURL = "/mba/api/v1/movies";
  try {
    const response = await AxiosInstance.post(postURL, movie);
    console.log(response);
    return response;
  } catch (error) {
    //console.log(error);
    return error.response;
  }
};
export const removeMovies = async (movie) => {
  const delURL = `/mba/api/v1/movies/${movie._id}`;
  try {
    const response = await AxiosInstance.delete(delURL);
    //console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
