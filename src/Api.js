import { API_URL_ORIGIN, PORT_PUPPET } from './setting.json';
import { setGlobal } from 'reactn';
import axios from 'axios';
import socketIOClient from 'socket.io-client';

export const createApi = () => {
  const api = axios.create({
    baseURL: API_URL_ORIGIN,
  });
  const receptor = (res) => res.data;
  const rejector = (err) => new Error(err);
  api.interceptors.response.use(receptor, rejector);
  const socket = socketIOClient(`ws://localhost:${PORT_PUPPET}`);
  socket.on('loggedIn', () => {
    setGlobal({ loggedIn: true });
  });
  socket.on('disconnect', () => {
    setGlobal({ loggedIn: false });
  });
  socket.on('connect', () => {
    authUser(socket);
  })
  setGlobal({ api, socket, loggedIn: false })
};

export const createTempApi = (token) => {
  const api = axios.create({
    baseURL: API_URL_ORIGIN,
    Authorization: token,
  });
  const receptor = (res) => res.data;
  const rejector = (err) => new Error(err);
  api.interceptors.response.use(receptor, rejector);
  return api;
};

export const getGames = (api) => api.get('/games');
export const getCountries = (api) => api.get('/countries');
export const createUser = (api, email, password) => api.post('/users', {email, password});
export const createTeam = (api, leaderId, teamData) => api.post(`/users/${leaderId}/team`, teamData);
export const login = (api, email, password) => api.post('/users/login', { email, password }); 

export const authUser = (socket) => {
  socket.emit('loginRequest');
}
export const authMail = (socket) => {
  socket.emit('mailAuth');
}