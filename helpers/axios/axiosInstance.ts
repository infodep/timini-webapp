import Router from "next/router";
import axios, { AxiosInstance } from "axios";

const axiosInstance = (): AxiosInstance => {
  const headers = {
    xRefreshToken: "",
  };

  if (typeof window !== "undefined" && window.localStorage.refresh_token) {
    headers.xRefreshToken = window.localStorage.refresh_token;
  }

  const axiosInstance = axios.create({
    headers,
  });

  axiosInstance.interceptors.response.use(
    (response) =>
      new Promise((resolve) => {
        resolve(response);
      }),
    (error) => {
      if (!error.response) {
        return new Promise((_, reject) => {
          reject(error);
        });
      }

      if (error.response.status === 403) {
        if (typeof window !== "undefined") {
          window.localStorage.removeItem("refresh_token");
        }
        Router.push("/");
      }
    },
  );
  return axiosInstance;
};

export default axiosInstance;
