import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/sections/header";
import WhatsappButton from "@/components/components/shared/whatsapp-button";
import Footer from "@/components/sections/footer";
import FloatingActions from "@/components/components/shared/fam";
import LocalBusinessJsonLd from "@/components/seo/local-business-jsonld";
import { BUSINESS, DEFAULT_KEYWORDS, SITE_NAME, SITE_URL } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Dealer Resmi BYD Tangerang`,
    template: `%s — ${SITE_NAME}`,
  },
  description: BUSINESS.description,
  keywords: DEFAULT_KEYWORDS,
  authors: [{ name: SITE_NAME }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Dealer Resmi BYD Tangerang`,
    description: BUSINESS.description,
    images: [{ url: BUSINESS.ogImage, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Dealer Resmi BYD Tangerang`,
    description: BUSINESS.description,
    images: [BUSINESS.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} antialiased scroll-smooth`}>
      <body className="flex flex-col">
        <LocalBusinessJsonLd />
        <main>
          <Header />
          {children}
          <WhatsappButton />
          <Footer />
          <FloatingActions />
        </main>
      </body>
    </html>
  );
}
