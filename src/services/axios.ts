import axios from 'axios';
import { parseCookies } from 'nookies';

export default function getApiClient(ctx?: any) {
  const { 'guarapagym.token': token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'https://guarapagym.herokuapp.com',
  });

  api.interceptors.request.use(config => {
    const { url, method, baseURL } = config;
    console.log(`> ${method} ${url}`);

    return config;
  });

  if (token) {
    api.defaults.headers.authorization = `Bearer ${token}`;
  }

  return api;
}
