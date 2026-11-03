import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

const title = "BalaPrep | Personalized Academic Preparation";
const description = "Personalized academic preparation designed to help students build confidence, sharpen their skills, and reach their goals.";
const siteUrl = process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);

export const metadata: Metadata = {
  title,
  description,
  ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } } : {}),
  openGraph: { title, description, siteName: "BalaPrep", type: "website", locale: "en_US", ...(siteUrl ? { url: "/" } : {}) },
  twitter: { card: "summary", title, description },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={GeistSans.variable}><body>{children}</body></html>;
}
