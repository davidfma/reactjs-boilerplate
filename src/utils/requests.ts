import axios, { AxiosError, AxiosResponse } from 'axios';
import to from 'await-to-js';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { store } from '../redux';
import { setAccessToken } from '../redux/auth';

type LoginProps = { email: string; password: string };
type LoginResponse = { accessToken: string };

const checkAccessToken = (token: string) => {
  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    return exp && exp * 1000 > Date.now();
  } catch (e) {
    return false;
  }
};

const baseURL = import.meta.env.VITE_AUTH_URL;

export const baseRequest = axios.create({
  baseURL,
  timeout: 1000,
  withCredentials: true,
});

baseRequest.interceptors.response.use(
  (req) => req.data,
  (err) => {
    if (err?.response) {
      return Promise.reject({
        message: err.response.data.message,
        status: err.response.status,
      });
    }
    return Promise.reject({ message: err.data.message, status: err.status });
  }
);

baseRequest.interceptors.request.use(
  async (req) => {
    if (req.url !== '/auth') {
      const { accessToken } = store.getState().auth;
      const isValidAccessToken = checkAccessToken(accessToken);

      if (isValidAccessToken) {
        req.headers.Authorization = `Bearer ${accessToken}`;
        return req;
      }

      const [error, resp] = await to<AxiosResponse, AxiosError>(
        axios.get(`${baseURL}/auth/refresh`, {
          withCredentials: true,
        })
      );

      if (error) {
        return Promise.reject(error?.response);
      }

      if (resp) {
        const newAccessToken = resp.data.accessToken;
        store.dispatch(setAccessToken({ accessToken: newAccessToken }));
        req.headers.Authorization = `Bearer ${newAccessToken}`;
        return req;
      }
    }
    return req;
  },
  (err) => {
    return Promise.reject({
      message: err.data.message,
      status: err.status,
    });
  }
);

export const loginRequest = async (params: LoginProps) => {
  return to<LoginResponse>(baseRequest.post('/auth', params));
};
