import { PrimaryLayout } from "@/app/components/core/PrimaryLayout";
import { MyLibraryTab } from "@/app/components/MyLibrary/MyLibraryTab";
import withAuth from "@/app/components/core/withAuth";
import Head from "next/head";

const LibraryPage = () => {
  return (
    <div className="">
      <Head>
        <title>Library App</title>
      </Head>
      <PrimaryLayout>
        <MyLibraryTab />
      </PrimaryLayout>
    </div>
  );
};

export default withAuth(LibraryPage);
