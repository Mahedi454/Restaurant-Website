import type { Metadata } from "next";

export const siteName = "iFOODS";

export function openGraph(
  title: string,
  description: string,
): Metadata["openGraph"] {
  return {
    title: `${title} · ${siteName}`,
    description,
    siteName,
    type: "website",
    locale: "en_US",
  };
}