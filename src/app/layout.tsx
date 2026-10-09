import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { portfolio } from "@/data/portfolio";
import { themeInitScript } from "@/lib/theme";
import { loaderInitScript } from "@/lib/loading";
import { NZLoadingScreen } from "@/components/NZLoadingScreen";
import "@/styles/globals.css";
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], display: "swap", variable: "--font-manrope" });
const title = "NZAYISENGA Erneste | Software Developer & Founder";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const siteUrl = configuredSiteUrl && /^https:\/\/[^\s/]+(?:\/[^\s]*)?$/i.test(configuredSiteUrl)
  ? configuredSiteUrl.replace(/\/$/, "")
  : undefined;
export const viewport: Viewport = { themeColor: "#0B3155", colorScheme: "dark light" };
export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } } : {}),
  title,
  description: portfolio.description,
  openGraph: {
    title,
    description: portfolio.description,
    type: "website",
    locale: "en_US",
    siteName: portfolio.name,
    ...(siteUrl ? { images: [{ url: portfolio.profileImage, alt: `Portrait of ${portfolio.name}` }] } : {}),
  },
  twitter: {
    card: "summary",
    title,
    description: portfolio.description,
    ...(siteUrl ? { images: [portfolio.profileImage] } : {}),
  },
  robots: { index: true, follow: true }
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const person = { "@context": "https://schema.org", "@type": "Person", name: portfolio.name, jobTitle: portfolio.title, ...(siteUrl ? { url: siteUrl } : {}), sameAs: [portfolio.github, portfolio.linkedin].filter(Boolean), email: portfolio.email, worksFor: { "@type": "Organization", name: portfolio.company.name }, nationality: { "@type": "Country", name: "Rwanda" } };
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeInitScript }}/><script dangerouslySetInnerHTML={{ __html: loaderInitScript }}/></head><body className={`${inter.variable} ${manrope.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}/><NZLoadingScreen/>{children}</body></html>;
}
