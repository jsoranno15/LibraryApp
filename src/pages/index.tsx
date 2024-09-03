import { PrimaryLayout } from "@/app/components/core/PrimaryLayout";
import { Dashboard } from "@/app/components/Dashboard/Dashboard";
import Head from "next/head";
import { auth } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import withAuth from "@/app/components/core/withAuth";

const Home = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const userSession = sessionStorage.getItem("user");

  if (!user || !userSession) {
    router.push("/signin");
  }
  return (
    <div className="">
      <Head>
        <title>Library App</title>
      </Head>
      <PrimaryLayout>
        <Dashboard />
      </PrimaryLayout>
    </div>
  );
};

export default withAuth(Home);
