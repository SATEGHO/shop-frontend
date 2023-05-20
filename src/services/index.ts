import axios, { InternalAxiosRequestConfig } from 'axios';

const $host = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const $authhost = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

$authhost.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
  }
  return config;
});

export { $host, $authhost };
