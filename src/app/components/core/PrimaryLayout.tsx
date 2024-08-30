import { Footer } from "./Footer";
import Navbar from "./Navbar";

export const PrimaryLayout = ({ children }: { children: any }) => {
  return (
    <main className="flex flex-col">
      <section className="min-h-[100vh] min-w-[100vw] flex flex-row p-4">
        <Navbar />
        {children}
      </section>
      <Footer />
    </main>
  );
};
