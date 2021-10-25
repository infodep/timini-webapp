import axios, { AxiosError } from "axios";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";
import Router from "next/router";
import { useContext } from "react";
import useSWR, { SWRConfiguration, SWRResponse } from "swr";
import AuthContext from "../../contexts/auth";
import { Token } from "../../interfaces/Token";

type Return<Data, Error> = SWRResponse<Data, AxiosError<Error>>;

/**
 *  Wrapper function for useSWR while still maintaining token auth
 */
const useGet = <Data = unknown, Error = unknown>(url: string, config?: SWRConfiguration): Return<Data, Error> => {
  const { authTokens, setAuthTokens, setUser } = useContext(AuthContext);
  const { refresh_token, access_token } = authTokens;

  const headers = {
    xRefreshToken: refresh_token,
    xAccessToken: access_token,
  };

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

  return useSWR<Data, AxiosError<Error>>(url, (url) => axiosInstance.get(url).then((res) => res.data), config);
};

export default useGet;
