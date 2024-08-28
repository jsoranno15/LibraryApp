import { HomePage } from "@/app/components/Homepage/Homepage";
import Head from "next/head";

const Home = () => {
  return (
    <div className="">
      <Head>
        <title>Library App</title>
      </Head>
      <HomePage />
    </div>
  );
};

export default Home;
