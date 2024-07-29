import axios from 'axios';
import { baseUrl } from './GlobalConstantes';

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});


export { api };
