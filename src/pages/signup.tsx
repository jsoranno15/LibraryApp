import React, { useState, ChangeEvent, FormEvent } from "react";
import { auth, createUserWithEmailAndPassword } from "../firebase/config"; // Ensure this path is correct
import Link from "next/link";

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const validateForm = (): boolean => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      return false;
    }
    return true;
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const uid = res.user.uid;
      sessionStorage.setItem("user", "true");

      console.log("auth", auth);
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid, email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create user in database");
      }

      console.log("User created in MongoDB:", await response.json());

      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.error("Sign up error occurred", error.message);
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
    <div className="flex items-center justify-center min-h-screen bg-ds-pink-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md shadow-ds-pink-200 rounded-xl">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <form onSubmit={handleSignup}>
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
          <div className="mb-4">
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
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ds-dark-purple-400"
              value={confirmPassword}
              onChange={handleChange(setConfirmPassword)}
              placeholder="Confirm your password"
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
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
            <Link
              className="w-full text-center text-xs hover:text-ds-dark-purple-400 underline"
              href={"/signin"}
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
