import axiosClient from './axios';
export * as cart from './endpoints/cart';
export * as order from './endpoints/order';

export const setApiBaseUrl = (base_url: string) => {
  axiosClient.defaults.baseURL = base_url;
};
