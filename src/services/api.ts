import axios from 'axios';

const api = axios.create({
  baseURL: 'https://guarapagym.herokuapp.com',
});

export default api;
