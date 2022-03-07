import "../styles/globals.css";
import { AppProps } from "next/app";
import Layout from "../components/Layout";
import { AppContextProvider } from "../contexts/AppContext";
import Head from "next/head";

type UserProfile = {
  email: string;
  familyName: string;
  givenName: string;
  googleId: string;
  imageUrl: string;
  name: string;
};

type User = {
  token: string;
  result: UserProfile;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="google-signin-client_id"
          content="788264538920-lvv0shh0se9sdoiehmbbh320mtfph833.apps.googleusercontent.com"
        />
        <meta name="google-signin-cookiepolicy" content="single_host_origin" />
        <meta name="google-signin-scope" content="profile email" />
      </Head>
      <AppContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppContextProvider>
    </>
  );
}

export default MyApp;
