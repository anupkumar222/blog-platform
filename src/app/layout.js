import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Blog App",
  description: "A modern blog application built with Next.js and Bootstrap",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Bootstrap CSS via CDN */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-NuUP1Jx3J6pZeWuJQkUlQJSzgk5KrNoqH2Pe/eGh5ybDbls6SxHIX66DZmzfTO8+"
          crossOrigin="anonymous"
        />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} d-flex flex-column min-vh-100`}>
        <Navbar />

        <main className="flex-grow-1">
          <div className="container">
            {children}
          </div>
        </main>

        <footer className="bg-light mt-5 py-4 border-top">
          <div className="container">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
              <div className="mb-3 mb-md-0">
                <span className="fw-bold text-primary">Blog Platform</span> © {'2025'}
              </div>
              <div className="d-flex gap-3">
                <a href="#" className="text-secondary">
                  <i className="bi bi-github"></i>
                </a>
                <a href="#" className="text-secondary">
                  <i className="bi bi-twitter-x"></i>
                </a>
                <a href="#" className="text-secondary">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
