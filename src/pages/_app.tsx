import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className}>
      <Component {...pageProps} />
    </main>
  );
}
