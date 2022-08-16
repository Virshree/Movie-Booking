const API_BASE_URL = process.env.REACT_APP_BASE_URL;

if (!API_BASE_URL) {
  throw new Error(".env is missing ");
}

export { API_BASE_URL };
