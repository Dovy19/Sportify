import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google"; // Correct imports for valid fonts
import "./globals.css";
import { Provider } from "./provider";
import Header from "@/components/Navbar";

// Inter font for sans-serif and Roboto Mono for monospace
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        <div className="container mx-auto px-4 max-w-screen-2xl ">
          <Provider>
            <Header />
            {children}
          </Provider>
        </div>
      </body>
    </html>
  );
}
