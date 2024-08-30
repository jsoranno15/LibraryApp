import { PrimaryLayout } from "@/app/components/core/PrimaryLayout";
import { MyLibrary } from "@/app/components/MyLibrary/MyLibrary";
import withAuth from "@/app/components/withAuth";
import Head from "next/head";

const LibraryPage = () => {
  return (
    <div className="">
      <Head>
        <title>Library App</title>
      </Head>
      <PrimaryLayout>
        <MyLibrary />
      </PrimaryLayout>
    </div>
  );
};

export default withAuth(LibraryPage);
