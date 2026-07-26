import "./globals.css";
import { RoadmapProvider } from "@/hooks/use-roadmap";
import { SettingsProvider } from "@/src/context/SettingsContext";
import { ToastProvider } from "@/src/context/ToastContext";

export const metadata = {
  title: "DSA Master Roadmap",
  description: "A structured path to DSA mastery",
  manifest: "/manifest.json",
};

const themeScript = `
  (function() {
    try {
      const saved = localStorage.getItem('journey-settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        const app = parsed.appearance || {};
        const theme = app.theme || 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        
        let bg = '#0B0E14';
        if (theme === 'midnight') bg = '#060913';
        else if (theme === 'oled') bg = '#000000';
        else if (theme === 'fantasy') bg = '#0B0914';
        document.documentElement.style.setProperty('--background', bg);

        let hex = '#7C4DFF';
        const accent = app.accentColor || 'purple';
        if (accent === 'ocean' || accent === 'blue' || accent === '#3B82F6') hex = '#3B82F6';
        else if (accent === 'emerald' || accent === '#10B981') hex = '#10B981';
        else if (accent === 'golden' || accent === 'gold' || accent === '#F59E0B') hex = '#F59E0B';
        else if (accent === 'rose' || accent === 'pink' || accent === '#EC4899') hex = '#EC4899';
        document.documentElement.style.setProperty('--primary', hex);
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
        <SettingsProvider>
          <ToastProvider>
            <RoadmapProvider>{children}</RoadmapProvider>
          </ToastProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
