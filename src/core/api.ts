import axios from 'axios';
import { QueryClient } from 'react-query';

// const baseURL = 'https://sajidshop.netlify.app'
const baseURL = 'http://localhost:3001'

const apiClient = axios.create({
  // baseURL: 'data.json',
  baseURL: baseURL,
});

const queryClient = new QueryClient();

export { apiClient, queryClient };
