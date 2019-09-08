import axios from 'axios';
import { baseUrl, timeout } from '../config/env';

axios.defaults.baseURL = baseUrl;
axios.timeout = timeout;


export default axios;
