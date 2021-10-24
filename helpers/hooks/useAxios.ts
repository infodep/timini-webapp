import Router from "next/router";
import axios, { AxiosInstance } from "axios";
import { useContext } from "react";
import AuthContext from "../../contexts/auth";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";
import { Token } from "../../interfaces/Token";

const useAxios = (): AxiosInstance => {
  const { authTokens, setAuthTokens, setUser } = useContext(AuthContext);
  const { refresh_token, access_token } = authTokens;

  const headers = {
    xRefreshToken: refresh_token,
    xAccessToken: access_token,
  };

  if (typeof window !== "undefined" && window.localStorage.refresh_token) {
    headers.xRefreshToken = window.localStorage.refresh_token;
  }

  const axiosInstance = axios.create({
    headers,
    timeout: 1000,
  });

  axiosInstance.interceptors.request.use(async (req) => {
    // if they are logged out, do request with no interception
    if (!refresh_token) {
      return req;
    }

    // if we have a refresh token but not an access token or the access token is expired, we refresh it. Refresh 5s before expiry
    if (access_token == null || dayjs(jwtDecode<Token>(access_token).exp).diff() < 5 * 1000) {
      await axios
        .post("/v1/token")
        .then((res) => res.data)
        .then((data) => {
          setAuthTokens({ refresh_token: authTokens.refresh_token, access_token: data["access_token"] });
          setUser(jwtDecode<Token>(refresh_token).id);
        });
    }

    req.headers.xAccessToken = authTokens.access_token;

    return req;
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

export default useAxios;
