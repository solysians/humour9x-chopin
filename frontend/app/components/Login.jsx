"use client";
import { useEffect } from "react";
import { useAddress } from "@chopinframework/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const { address, isLoading, isLoginError, login, logout, revalidate } = useAddress();
  const router = useRouter(); // Get Next.js router

  useEffect(() => {
    if (address && !isLoading) {
      router.push("/");
    }
  }, [address, isLoading, router]);
  

  if (isLoading) return <div>Loading...</div>;
  if (isLoginError) return <div>Error logging in</div>;

  return (
    <div>
      {address ? (
        <>
          <p>Logged in as {address}</p>
          <button onClick={logout}>Logout</button>
          <button onClick={revalidate}>Refresh</button>
        </>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
}
