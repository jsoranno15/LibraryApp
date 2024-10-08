import React, { useState, ChangeEvent, FormEvent } from "react";
import { auth, signInWithEmailAndPassword } from "../firebase/config"; // Adjust the path as necessary
import { useRouter } from "next/router";
import Link from "next/link";

const SigninPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const validateForm = (): boolean => {
    if (!email || !password) {
      setError("Both fields are required");
      return false;
    }
    return true;
  };

  const router = useRouter();

  const handleSignin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      // console.log(res);
      // console.log("firebase user", auth.currentUser);
      sessionStorage.setItem("user", "true");
      setEmail("");
      setPassword("");

      router.push("/");
    } catch (error: any) {
      console.error("Sign in error occurred", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) =>
      setter(e.target.value);

  return (
    <div className="flex items-center justify-center min-h-screen bg-ds-pink-100 p-2 sm:p-0">
      <div className="w-full max-w-md p-8 bg-white shadow-md shadow-ds-pink-200 rounded-xl">
        <h2 className="text-2xl font-bold mb-6">Library App</h2>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <form onSubmit={handleSignin}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ds-dark-purple-400"
              value={email}
              onChange={handleChange(setEmail)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ds-dark-purple-400"
              value={password}
              onChange={handleChange(setPassword)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex flex-col w-full gap-3">
            <button
              type="submit"
              className={`w-full py-2 px-4 bg-ds-dark-purple-400 text-white font-medium rounded-lg hover:bg-ds-dark-purple-600 focus:outline-none focus:ring-2 focus:ring-dark-purple-700 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
            <Link
              className="w-full text-center text-xs hover:text-ds-dark-purple-400 underline"
              href={"/signup"}
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SigninPage;
