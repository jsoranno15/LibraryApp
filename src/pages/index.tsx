import { PrimaryLayout } from "@/app/components/core/PrimaryLayout";
import { HomePage } from "@/app/components/Dashboard/Homepage";
import Head from "next/head";
import { auth } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import withAuth from "@/app/components/withAuth";

const Home = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const userSession = sessionStorage.getItem("user");

  if (!user || !userSession) {
    router.push("/signup");
  }
  return (
    <div className="">
      <Head>
        <title>Library App</title>
      </Head>
      <PrimaryLayout>
        <HomePage />
      </PrimaryLayout>
    </div>
  );
};

export default withAuth(Home);
