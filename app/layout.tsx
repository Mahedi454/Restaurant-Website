import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { ToastProvider } from "@/components/ui/Toast";

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

export const metadata: Metadata = {
  title: {
    default: "iFOODS — Modern Dining",
    template: "%s · iFOODS",
  },
  description:
    "A premium city restaurant crafting contemporary dishes with seasonal ingredients, warm hospitality, and an elegant atmosphere.",
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
        <ToastProvider>
          <Header />
          <main className="flex-1 pt-24 lg:pt-28">{children}</main>
          <Footer />
          <CartDrawer />
        </ToastProvider>
      </body>
    </html>
  );
}