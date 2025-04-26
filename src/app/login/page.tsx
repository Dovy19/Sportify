"use client";


import { FormEvent, useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import Loading from "./loading";

export default function Login() {
    const [error, setError] = useState("");
    const router = useRouter();
    const { status } = useSession();

    const searchParams = useSearchParams();
    const callbackMessage = searchParams.get("callbackMessage");

    useEffect(() => {
        if (callbackMessage === "auth") {
         toast.error("You must be logged in to access this page.");
        }
    }, [callbackMessage]);

    useEffect(() => {
        if (status === "authenticated") {
            router.replace("/");
        }
    }, [status, router]);

    // If authenticated or still loading, show loading state
    if (status === "loading" || status === "authenticated") {
        return <Loading />;
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const res = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        });

        console.log("SignIn Response:", res); // Debugging response

        if (res?.error) { 
            setError(res.error as string);
        }

        if (res?.ok) {
            router.push("/");
        }
    };

    const handleOAuthSignIn = async (provider: "google" | "github") => {
        setError(""); // Clear previous errors
        try {
            console.log(`Attempting to sign in with ${provider}`);
            const res = await signIn(provider, { callbackUrl: "/" });
            console.log("OAuth SignIn Response:", res); // Debugging response
        } catch (error) {
            console.error("OAuth SignIn Error:", error); // Debugging error
            setError("An error occurred during sign-in");
        }
    };

    return (
        <section className="w-full h-screen flex items-center justify-center">
            <form
                className="p-6 w-full max-w-[400px] flex flex-col justify-between items-center gap-2 border border-solid border-black bg-white rounded"
                onSubmit={handleSubmit}
            >
                {error && <div className="text-red-500">{error}</div>}
                <h1 className="mb-5 w-full text-2xl font-bold">Sign In</h1>
                
                <label className="w-full text-sm">Email</label>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full h-8 border border-solid border-black rounded p-2"
                    name="email"
                />
                
                <label className="w-full text-sm">Password</label>
                <div className="flex w-full">
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full h-8 border border-solid border-black rounded p-2"
                        name="password"
                    />
                </div>
                
                <button className="cursor-pointer w-full border border-solid border-black rounded">
                    Sign In
                </button>
                
                <Link
                    href="/register"
                    className="text-sm text-[#888] transition duration-150 ease hover:text-black"
                >
                    Don't have an account?
                </Link>

                <div className="mt-4 w-full flex flex-col gap-3">
                    <button
                        type="button"
                        onClick={() => handleOAuthSignIn("google")}
                        className="cursor-pointer w-full py-2 bg-blue-500 text-white rounded-md"
                    >
                        Sign In with Google
                    </button>
                    <button
                        type="button"
                        onClick={() => handleOAuthSignIn("github")}
                        className="cursor-pointer w-full py-2 bg-gray-800 text-white rounded-md"
                    >
                        Sign In with GitHub
                    </button>
                </div>
            </form>
        </section>
    );
}