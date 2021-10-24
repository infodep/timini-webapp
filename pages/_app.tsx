import "../styles/globals.css";
import type { AppProps } from "next/app";
import axios from "axios";
import { AuthProvider } from "../contexts/auth";
import { SWRConfig } from "swr";
import useAxios from "../helpers/hooks/useAxios";

axios.defaults.baseURL = "http://localhost:8000";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useAxios() // This will only be used inside react hook useSWR so its fine
            .get(url)
            .then((res) => res.data),
      }}
    >
      <AuthProvider>
        <Component {...pageProps} />;
      </AuthProvider>
    </SWRConfig>
  );
}
export default MyApp;
