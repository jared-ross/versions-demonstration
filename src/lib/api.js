import axios from 'axios';

axios.defaults.timeout = 3000;
axios.defaults.baseURL = 'https://www.meercat.com.au/wp-json/mobileapptest';

const api = {
  getVersions: async () => {
    const resp = await axios.get('/info');

    // Lets clean the data up here
    // { [version]: { from, to } } -> [{ version, from, to }]
    return Object.entries(resp.data)
      .map(([version, { from, to }]) => ({ version, from, to }));
  },
};

export default api;
