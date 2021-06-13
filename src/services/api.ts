import getApiClient from './axios';

const api = getApiClient();

api.interceptors.request.use(config => {
  const { url, method, baseURL } = config;
  console.log(`> ${method} ${url} at ${baseURL}`);

  return config;
});

export default api;
