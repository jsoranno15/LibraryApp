import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import { LoadingSpinner } from "../../icons";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const Wrapper: React.FC<P> = (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    if (loading) {
      return (
        <div className="w-full min-h-screen bg-ds-pink-100 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ); // or a loading spinner
    }

    if (!user) {
      router.push("/signin"); // Redirect to sign-in page if not authenticated
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
