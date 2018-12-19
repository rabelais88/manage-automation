import { API_URL_ORIGIN } from './setting.json';
import { setGlobal } from 'reactn';
import axios from 'axios';

export const createApi = () => {
  const api = axios.create({
    baseURL: API_URL_ORIGIN,
  });
  const receptor = (res) => res.data;
  const rejector = (err) => Promise.reject(err);
  api.interceptors.response.use(receptor, rejector);
  setGlobal({ api })
};

export const getGames = (api) => api.get('/games');
export const getCountries = (api) => api.get('/countries');
export const createUser = (api, email, password) => api.post('/users', {email, password});

const puppeteer = require('puppeteer');
export const authUser = async (email, memberAmount) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://bizmeka.com');
  // await page.
}