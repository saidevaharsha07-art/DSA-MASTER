import "./globals.css";
import { RoadmapProvider } from "@frontend/hooks/use-roadmap";
import { SettingsProvider } from "@/src/context/SettingsContext";
import { ToastProvider } from "@/src/context/ToastContext";
import { AuthProvider } from "@/src/lib/auth/context/AuthContext";

import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "https://dsa-magna.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DSA Magna — Learn • Practice • Track • Master",
    template: "%s | DSA Magna",
  },
  description:
    "Master Data Structures & Algorithms one pattern at a time. 4,000+ curated problems, adaptive recommendations, spaced repetition, and real-time interview simulations.",
  applicationName: "DSA Magna",
  authors: [{ name: "DSA Magna Engineering Team" }],
  keywords: [
    "Data Structures",
    "Algorithms",
    "DSA",
    "LeetCode",
    "Codeforces",
    "CodeChef",
    "GeeksForGeeks",
    "Coding Interview",
    "Spaced Repetition",
  ],
  manifest: "/manifest.json",
  icons: {
    icon: "/brand/dsa-magna-logo.png",
    apple: "/brand/icon-192.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "DSA Magna",
    title: "DSA Magna — Learn • Practice • Track • Master",
    description:
      "Master Data Structures & Algorithms one pattern at a time. Curated curriculum across LeetCode, Codeforces, CodeChef, and GeeksForGeeks.",
    images: [
      {
        url: "/brand/dsa-magna-logo.png",
        width: 512,
        height: 512,
        alt: "DSA Magna Platform Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "DSA Magna — Learn • Practice • Track • Master",
    description: "Master Data Structures & Algorithms with DSA Magna.",
    images: ["/brand/dsa-magna-logo.png"],
  },
};

const themeScript = `
  (function() {
    try {
      let theme = 'dark';
      const savedSettings = localStorage.getItem('journey-settings');
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        if (parsed && parsed.appearance && parsed.appearance.theme) {
          theme = parsed.appearance.theme === 'light' ? 'light' : 'dark';
        }
      } else {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') theme = 'light';
      }
      
      document.documentElement.setAttribute('data-theme', theme);
      if (theme === 'light') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        document.documentElement.style.setProperty('--background', '#F5F7FB');
        document.documentElement.style.setProperty('--foreground', '#0F172A');
      } else {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
        document.documentElement.style.setProperty('--background', '#0F172A');
        document.documentElement.style.setProperty('--foreground', '#F8FAFC');
      }
    } catch(e) {}
  })()
`;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <AuthProvider>
          <SettingsProvider>
            <ToastProvider>
              <RoadmapProvider>{children}</RoadmapProvider>
            </ToastProvider>
          </SettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
