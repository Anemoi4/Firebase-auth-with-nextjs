import Head from "next/head";
import Dashboard from "../components/Dashboard";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Form Practice</title>
        <meta name="description" content="Css Prac" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard />
    </>
  );
}
