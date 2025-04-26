"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function LoginButton() {
  const { status } = useSession();

  if (status === "loading") {
    return <span className="text-white text-lg font-medium">Loading...</span>;
  }

  if (status === "authenticated") {
    return (
      <button
        className="text-white text-lg font-medium hover:text-teal-300 transition duration-300 cursor-pointer"
        onClick={() => {
          signOut({ callbackUrl: "/" });
        }}
      >
        Sign Out
      </button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link 
        href="/login" 
        className="text-lg font-medium text-white hover:text-teal-300 transition duration-300"
      >
        Sign In
      </Link>
      <Link 
        href="/register" 
        className="bg-teal-300 hover:bg-teal-400 text-gray-900 font-medium py-1 px-4 rounded-full transition duration-300"
      >
        Register
      </Link>
    </div>
  );
}