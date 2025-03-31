import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import type { NextAuthOptions, User as NextAuthUser } from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { AdapterUser } from "next-auth/adapters";

// Extend the Session type to include `id`
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

// Extend the JWT type to include `id` and `provider`
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    provider?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({
          email: credentials?.email,
        }).select("+password"); // Ensure password field is selected if it's not in the default projection

        if (!user) {
          throw new Error("Incorrect Email or Password");
        }

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!passwordMatch) {
          throw new Error("Incorrect Email or Password");
        }

        return user; // Returning the user object that will be available in session/callbacks
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {


      try {
        await connectDB();

        // Check if the user already exists
        let existingUser = await User.findOne({ email: user.email });

        if (
          !existingUser &&
          (account?.provider === "google" || account?.provider === "github")
        ) {
          // Create a new user
          console.log("Creating a new user");

          // Provide a default name and a random password
          const hashedPassword = await bcrypt.hash(Date.now().toString(), 10);
          const newUser = await User.create({
            id: (user as any).sub, // Use sub as id for new users
            name: profile?.name || "Unknown", // Use profile.name if available, otherwise "Unknown"
            email: user.email,
            password: hashedPassword,
            phone: "",
            image: "",
            provider: account.provider,
          });
          console.log("New user created:", newUser);
        } else if (!existingUser && account?.provider === "credentials") {
          console.log("Cannot create a new user with credentials");
          return false;
        } else {
            if (existingUser) {
                console.log("Setting provider for existing user");
                existingUser.provider = account?.provider;
                await existingUser.save(); // Save the updated user document
            }
          console.log("User already exists");
        }

        console.log("signIn callback - END");
        return true; // Indicate success
      } catch (error) {
        console.error("signIn callback error:", error);
        return false; // Indicate failure
      }
    },
    async jwt({ token, user, account }) {
     

      if (account && user) {
        token.id = (user as NextAuthUser).id; // Use `id` for existing users
        token.provider = account.provider;
      }

      return token;
    },
    async session({ session, token }) {
      try {
         
          if (session.user) {
      
          }
  
          if (token) {
             
          }
          if (session.user) {
              session.user.id = token.id as string; // Ensure `id` is a string
          }
         
          return session;
      } catch (error) {
          console.error("Session Callback Error:", error);
          return session; // Return the session even if an error occurs
      }
  },
  },
  logger: {
    error(code, metadata) {
      console.error("NextAuth Error:", code, metadata); // Log the error
    },
  },
};