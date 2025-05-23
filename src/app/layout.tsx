import type { Metadata } from "next";
import { Inter, Roboto_Mono, Bebas_Neue } from "next/font/google"; // Correct imports for valid fonts
import "./globals.css";
import { Provider } from "./provider";
import Header from "@/components/Navbar";
import { Toaster } from "sonner";
import Footer from "@/components/footer";

// Inter font for sans-serif and Roboto Mono for monospace
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue", 
  subsets: ["latin"], 
  weight: "400"
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
      <body className={`${inter.variable} ${robotoMono.variable} ${bebasNeue.variable} antialiased`}>
        <div className="container mx-auto px-4 max-w-screen-2xl ">
          <Provider>
            <Toaster richColors />
            <Header />
            {children}
          </Provider>
        </div>
        <Footer />
      </body>
    </html>
  );
}
