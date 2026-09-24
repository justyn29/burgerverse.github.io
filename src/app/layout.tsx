import type { Metadata, Viewport } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "BurgerVerse Premium — Luxury Gourmet Burgers",
  description: "Experience the most premium gourmet burgers. 7 signature creations, artisan ingredients, and unforgettable flavor. Order now for delivery or visit our locations.",
  keywords: ["premium burgers", "gourmet burgers", "best burgers", "burger combos", "luxury burgers", "burger delivery"],
  authors: [{ name: "BurgerVerse" }],
  creator: "BurgerVerse",
  publisher: "BurgerVerse",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://burgerverse.com",
    title: "BurgerVerse Premium — Luxury Gourmet Burgers",
    description: "Experience the most premium gourmet burgers. 7 signature creations, artisan ingredients, and unforgettable flavor.",
    siteName: "BurgerVerse",
  },
  twitter: {
    card: "summary_large_image",
    title: "BurgerVerse Premium — Luxury Gourmet Burgers",
    description: "Experience the most premium gourmet burgers. 7 signature creations, artisan ingredients, and unforgettable flavor.",
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bebas.variable} ${inter.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className="bg-background text-text font-body">
        {children}
      </body>
    </html>
  );
}