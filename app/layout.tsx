import "./globals.css";
import { RoadmapProvider } from "@/hooks/use-roadmap";
export const metadata = {
  title: "DSA Master Roadmap",
  description: "A structured path to DSA mastery",
  manifest: "/manifest.json",
};

const themeScript = `
  (function() {
    const theme = localStorage.getItem('theme') || 'system';
    const dark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', dark);
  })()
`;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <RoadmapProvider>{children}</RoadmapProvider>
      </body>
    </html>
  );
}
