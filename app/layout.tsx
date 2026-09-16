import "./globals.css";
import { RoadmapProvider } from "@/hooks/use-roadmap";
import { SettingsProvider } from "@/src/context/SettingsContext";
import { ToastProvider } from "@/src/context/ToastContext";
import { AuthProvider } from "@/src/lib/auth/context/AuthContext";

export const metadata = {
  title: "DSA MASTER — Learn • Practice • Track • Master",
  description: "Master Data Structures & Algorithms with DSA MASTER",
  manifest: "/manifest.json",
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
