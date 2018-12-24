import { API_URL_ORIGIN, PORT_PUPPET } from './setting.json';
import { setGlobal } from 'reactn';
import axios from 'axios';
import socketIOClient from 'socket.io-client';

export const createApi = () => {
  const api = axios.create({
    baseURL: API_URL_ORIGIN,
  });
  const receptor = (res) => res.data;
  const rejector = (err) => Promise.reject(err);
  api.interceptors.response.use(receptor, rejector);
  const socket = socketIOClient(`ws://localhost:${PORT_PUPPET}`);
  setGlobal({ api, socket })
};

export const getGames = (api) => api.get('/games');
export const getCountries = (api) => api.get('/countries');
export const createUser = (api, email, password) => api.post('/users', {email, password});

export const authUser = (socket, teamData) => {
  socket.emit('createTeam', teamData);
}