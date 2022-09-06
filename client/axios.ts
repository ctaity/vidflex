import axios from 'axios';

const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const DEFAULT_ENDPOINT = `http://localhost:3000/api/`;

const axiosClient = axios.create({
  baseURL: process.env.VIDFLEX_ENDPOINT ?? DEFAULT_ENDPOINT,
  headers: DEFAULT_HEADERS,
});

export default axiosClient;
