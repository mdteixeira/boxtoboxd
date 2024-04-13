import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.football-data.org/v4'
});

export default api;
