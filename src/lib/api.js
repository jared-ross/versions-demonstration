import axios from 'axios';

axios.defaults.timeout = 3000;
axios.defaults.baseURL = 'https://www.meercat.com.au/wp-json/mobileapptest';

const api = {
  getVersions: async () => axios.get('/info'),
};

export default api;
