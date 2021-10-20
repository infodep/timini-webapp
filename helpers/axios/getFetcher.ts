import axiosInstance from "./axiosInstance";

export const getFetcher = <T>(url: string): Promise<T> =>
  axiosInstance()
    .get(url)
    .then((res) => res.data);
