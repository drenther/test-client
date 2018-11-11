import axios from 'axios';

export const tokenUtils = {
  persist(token) {
    try {
      localStorage.setItem('csrftoken', token);
    } catch (err) {
      console.error(err);
    }
  },
  retrieve() {
    try {
      return localStorage.getItem('csrftoken') || '';
    } catch (err) {
      console.error(err);
      return '';
    }
  },
  clear() {
    try {
      localStorage.clear();
    } catch (err) {
      console.error(err);
    }
  },
};

const instance = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});

export const apiUtils = {
  instance,
  endpoints: {
    signup: '/auth/signup',
    login: '/auth/login',
    logout: '/auth/logout',
    private: '/secure',
    public: '/',
  },
  getHeaders() {
    return {
      'Content-Type': 'application/json; charset=utf-8',
      'X-XSRF-TOKEN': tokenUtils.retrieve(),
    };
  },
  async request(endpoint, method, headers, bodyObj) {
    const url = this.endpoints[endpoint];
    let res;
    try {
      if (method !== 'POST') {
        res = headers ? await instance({ url, headers: this.getHeaders() }) : await instance({ url });
      } else {
        const data = JSON.stringify(bodyObj);
        res = await instance({
          url,
          method,
          headers: this.getHeaders(),
          data,
        });
      }
      return res.data;
    } catch (err) {
      console.error(err);
      return { err };
    }
  },
};
