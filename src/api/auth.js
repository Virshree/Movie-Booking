import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// login -post method-create a data in db.
export async function userSignin(data) {
  const postUrl = `${BASE_URL}/mba/api/v1/auth/signin`;
  return await axios.post(postUrl, data);
}

//signup -post method-create a data in db.
export async function userSignup(data) {
  const postUrl = `${BASE_URL}/mba/api/v1/auth/signup`;
  return await axios.post(postUrl, data);
}
