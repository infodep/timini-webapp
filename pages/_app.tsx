import "../styles/globals.css";
import type { AppProps } from "next/app";
import axios from "axios";
import { AuthProvider } from "../contexts/auth";

axios.defaults.baseURL = "http://localhost:8000";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AuthProvider>
      <Component {...pageProps} />;
    </AuthProvider>
  );
}
export default MyApp;
