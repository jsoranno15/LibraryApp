import { Footer } from "./Footer";
import Navbar from "./Navbar";

export const PrimaryLayout = ({ children }: { children: any }) => {
  return (
    <main className="flex flex-col">
      <section className=" min-h-[100vh] min-w-[100vw] p-4">
        <div className="bg-light-grey shadow-md shadow-ds-pink-200 flex flex-row  rounded-xl ">
          <Navbar />
          {children}
        </div>
      </section>
      <Footer />
    </main>
  );
};
