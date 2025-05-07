import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { AuthProvider } from "@/context/AuthContext";
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
      <body className={`${geistSans.variable} ${geistMono.variable} d-flex flex-column min-vh-100`}>
        <AuthProvider>
          <main className="flex-grow-1">
            <div className="container">
              <Navbar />
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
        </AuthProvider>
      </body>
    </html>
  );
}
