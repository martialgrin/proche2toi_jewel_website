import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ECLATS - PROCHE2TOI",
  description: "« Putain je casse toujours tout. J’en ris, et je sors une collection bijoux. » Bisous. <3",
  keywords: ["bijoux", "joaillerie", "ECLATS", "PROCHE2TOI", "artisanal", "créateur", "luxe"],
  authors: [{ name: "ECLATS - PROCHE2TOI" }],
  creator: "ECLATS - PROCHE2TOI",
  publisher: "ECLATS - PROCHE2TOI",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" }
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "ECLATS - PROCHE2TOI",
    description: "« Putain je casse toujours tout. J’en ris, et je sors une collection bijoux. » Bisous. <3",
    type: "website",
    locale: "fr_FR",
    siteName: "ECLATS - PROCHE2TOI",
    images: [
      {
        url: "/favicon.ico",
        width: 800,
        height: 600,
        alt: "ECLATS - PROCHE2TOI Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ECLATS - PROCHE2TOI",
    description: "« Putain je casse toujours tout. J’en ris, et je sors une collection bijoux. » Bisous. <3",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1",

};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "ECLATS - PROCHE2TOI",
              "description": "« Putain je casse toujours tout. J’en ris, et je sors une collection bijoux. » Bisous. <3",
              "url": "https://proche2toi.ch", // Replace with your actual domain
              "sameAs": [
                "https://instagram.com/proche2toi",
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
