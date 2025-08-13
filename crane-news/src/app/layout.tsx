export const metadata = {
  title: "Crane.news",
  description: "Local news, events, and media for Crane, Missouri.",
  openGraph: { title: "Crane.news", images: ["/og-default.jpg"], url: "https://crane.news", type: "website" }
};


import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main className="mx-auto max-w-6xl px-4 md:px-6 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
