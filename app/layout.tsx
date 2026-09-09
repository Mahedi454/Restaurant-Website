import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { ToastProvider } from "@/components/ui/Toast";
import { openGraph, siteName } from "@/lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "A premium city restaurant crafting contemporary dishes with seasonal ingredients, warm hospitality, and an elegant atmosphere.";

export const metadata: Metadata = {
  title: {
    default: `${siteName} — Modern Dining`,
    template: `%s · ${siteName}`,
  },
  description,
  openGraph: openGraph(`${siteName} — Modern Dining`, description),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream text-charcoal">
        <a
          href="#main-content"
          className="sr-only z-[130] rounded-full bg-charcoal px-5 py-2.5 text-sm font-medium text-cream-light focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <ToastProvider>
          <Header />
          <main id="main-content" className="flex-1 pt-24 lg:pt-28">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </ToastProvider>
      </body>
    </html>
  );
}