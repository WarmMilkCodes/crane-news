export const metadata = {
  title: "Crane.news",
  description: "Local news, events, and media for Crane, Missouri.",
};

import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to main content</a>
        <Navbar />
        <main id="main" className="mx-auto max-w-6xl px-4 md:px-6 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
